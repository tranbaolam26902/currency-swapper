import { useCallback, useEffect, useRef, useState } from 'react';

import { icons } from '@/assets';

import { Loading } from '@components/shared';

import { Currency } from '@/types';

interface Props {
    currencies: Array<Currency>;
    currency?: Currency;
    handleSelect: (currency: Currency) => void;
    isLoading: boolean;
}

export default function CurrencySelector({ currencies, currency, handleSelect, isLoading }: Props) {
    //// STATES ////
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('');

    //// REFS ////
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLUListElement | null>(null);

    //// METHODS ////
    const closeSelector = () => {
        setIsOpen(false);
    };

    //// EVENT HANDLERS ////
    const handleOpenSelector = () => {
        setIsOpen(!isOpen);
    };
    const handleCloseDropdownOnMouseDown = useCallback((e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('button') === buttonRef.current) return;
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) closeSelector();
    }, []);
    const handleSelectCurrency = (currency: Currency) => {
        handleSelect(currency);
        closeSelector();
    };

    //// SIDE EFFECTS ////
    // Close dropdown if user click outside
    useEffect(() => {
        document.addEventListener('mousedown', handleCloseDropdownOnMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleCloseDropdownOnMouseDown);
        };
    }, [handleCloseDropdownOnMouseDown]);
    // Sync selected currency
    useEffect(() => {
        if (currency?.currency) setSelectedCurrency(currency.currency);
    }, [currency?.currency]);

    return (
        <div className='px-2 py-1 relative w-full bg-white border border-[#d7d7d7] rounded-full'>
            {isLoading ? (
                <Loading width={32} />
            ) : (
                <>
                    <button
                        ref={buttonRef}
                        type='button'
                        className='flex items-center gap-x-2 w-full text-left text-xl sm:text-2xl bg-transparent drop-shadow-md'
                        onClick={handleOpenSelector}
                    >
                        <img src={currency?.icon} alt='currency-icon' className='hidden sm:inline w-6' />
                        <span className='pl-1 sm:pl-0 flex-1 truncate'>{currency?.currency}</span>
                        <img src={icons.arrowDown} className='w-8' />
                    </button>
                    {isOpen && (
                        <ul
                            ref={dropdownRef}
                            className='absolute z-10 top-full left-0 right-0 translate-y-2 overflow-y-auto w-full h-64 bg-white rounded-md'
                        >
                            {currencies.map((currency, index) => (
                                <li
                                    key={index}
                                    className={[
                                        'px-4 py-1 text-xl hover:bg-gray-200 rounded cursor-pointer',
                                        selectedCurrency === currency.currency
                                            ? 'text-white bg-gray-400 hover:bg-gray-400'
                                            : ''
                                    ].join(' ')}
                                    onClick={() => handleSelectCurrency(currency)}
                                >
                                    {currency.currency}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}
