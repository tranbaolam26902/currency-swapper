import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentDstCurrency, setCurrentSrcCurrency } from '@redux/feature/currency-swap';

import { getAllCurrencies, getAllCurrencyIcons } from '@services/currencySerivces';

import { Currency, CurrencyIcon } from '@/types';

import { removeDuplicate } from '@/utils';

export default function useCurrencies() {
    //// STATES ////
    const [currencies, setCurrencies] = useState<Array<Currency>>([]);
    const [isFetchingCurrency, setIsFetchingCurrency] = useState<boolean>(true);

    //// HOOKS ////
    const dispatch = useDispatch();

    //// METHODS ////
    /**
     * Get lastest price for duplicated currencies
     * @param {Array<Currency>} currencies - Currencies need to be filtered
     */
    const filterLatestCurrencies = (currencies: Array<Currency>) => {
        const result: Array<Currency> = [];

        currencies.forEach((currency) => {
            const existedCurrency = result.find((c) => c.currency === currency.currency && c.date !== currency.date);

            if (!existedCurrency) {
                result.push(currency);
                return;
            }

            if (new Date(currency.date) > new Date(existedCurrency.date)) {
                result[result.findIndex((c) => c.currency === existedCurrency.currency)] = currency;
            }
        });

        return result;
    };
    const filterCurrencies = useCallback(
        (currencies: Array<Currency>) => filterLatestCurrencies(removeDuplicate<Currency>(currencies)),
        []
    );
    const calculateExchangeRate = (srcCurrency: Currency, dstCurrency: Currency) => {
        if (!srcCurrency.price || !dstCurrency.price) return 0;

        return srcCurrency.price / dstCurrency.price;
    };
    const convertSrcToDst = (srcCurrency: Currency, dstCurrency: Currency, value: number) => {
        if (!srcCurrency.price || !dstCurrency.price) return 0;

        return value * calculateExchangeRate(srcCurrency, dstCurrency);
    };

    //// SIDE EFFECTS ////
    useEffect(() => {
        /**
         * Add icon for each currency
         */
        const mapCurrencyIcons = () => {
            setIsFetchingCurrency(true);

            const currencies = getAllCurrencies();
            const currencyIcons = getAllCurrencyIcons();

            Promise.all([currencies, currencyIcons])
                .then(([currencies, currencyIcons]) => {
                    currencies = filterCurrencies(currencies).map((currency: Currency) => {
                        const icon = currencyIcons.find(
                            (icon: CurrencyIcon) =>
                                icon.name.toLowerCase().split('.')[0] === currency.currency.toLowerCase()
                        );

                        if (icon) currency.icon = icon.download_url;

                        return currency;
                    });
                    setCurrencies(currencies);
                    dispatch(setCurrentSrcCurrency(currencies[Math.floor(Math.random() * currencies.length)])); // Get the most popular source currency mock API
                    dispatch(setCurrentDstCurrency(currencies[Math.floor(Math.random() * currencies.length)])); // Get the most popular destination currency mock APi
                })
                .finally(() => {
                    setIsFetchingCurrency(false);
                });
        };

        mapCurrencyIcons();
    }, [dispatch, filterCurrencies]);

    return { currencies, setCurrencies, isFetchingCurrency, calculateExchangeRate, convertSrcToDst };
}
