import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { icons } from '@/assets';

import { Button, Input } from '@components/shared';
import { CurrencySelector } from '@/components';

import { NUMBER_INPUT_PREVENTED_KEYS } from '@/constants';

import { useDebounce } from '@/hooks';

import {
    disableSwapLoading,
    enableSwapLoading,
    selectSwap,
    setCurrentDstCurrency,
    setCurrentSrcCurrency,
    setSwapValue
} from '@redux/feature/currency-swap';
import {
    openConfirmation,
    setConfirmationCallback,
    setConfirmationMessage,
    setLastFocusedElement
} from '@redux/feature/modals';

import { Currency } from '@/types';

interface Props {
    currencies: Array<Currency>;
    isFetchingCurrency: boolean;
}

export default function SwapForm({ currencies, isFetchingCurrency }: Props) {
    //// STATES ////
    const swap = useSelector(selectSwap);
    const [value, setValue] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');

    //// REFS ////
    const swapInputRef = useRef<HTMLInputElement | null>(null);

    //// HOOKS ////
    const dispatch = useDispatch();
    const debouceInput = useDebounce(value, 500);

    //// METHODS ////
    const validate = () => {
        if ((isNaN(parseFloat(value.toString())) && isFinite(value)) || value <= 0) return false;

        return true;
    };

    //// EVENT HANDLERS ////
    const handleSelectSrcCurrency = (currency: Currency) => {
        dispatch(setCurrentSrcCurrency(currency));
    };
    const handleSelectDstCurrency = (currency: Currency) => {
        dispatch(setCurrentDstCurrency(currency));
    };
    const handleSwitchCurrencies = () => {
        if (swap.currentSrcCurrency && swap.currentDstCurrency) {
            dispatch(setCurrentSrcCurrency(swap.currentDstCurrency));
            dispatch(setCurrentDstCurrency(swap.currentSrcCurrency));
        }
    };
    const handlePreventKeysOnInput = (e: React.KeyboardEvent) =>
        NUMBER_INPUT_PREVENTED_KEYS.includes(e.key) && e.preventDefault();
    const handleSwap = () => {
        // Simulate call swap API
        toast.success('Swap successfully.');
    };
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!validate()) {
            setErrorMessage('please enter a positive number.');
            return;
        }

        (document.activeElement as HTMLElement).blur(); // Blur input to prevent re-open confirmation modal when user hit Enter
        dispatch(setLastFocusedElement(swapInputRef)); // Focus again on this input if user cancel swap confirmation with Escape
        dispatch(setConfirmationMessage('Are you sure you want to swap?'));
        dispatch(setConfirmationCallback(handleSwap));
        dispatch(openConfirmation());
    };

    //// SIDE EFFECTS ///
    // Debounce swap input
    useEffect(() => {
        dispatch(disableSwapLoading());
        dispatch(setSwapValue(value));
        // eslint-disable-next-line
    }, [debouceInput, dispatch]);

    return (
        <form
            className='relative flex flex-col items-center gap-y-6 mb-12 p-6 pb-16 w-[40rem] max-w-full bg-peachy border border-white rounded-3xl drop-shadow-md'
            onSubmit={handleSubmit}
        >
            {/* Start: Currency selectors */}
            <div className='z-10 flex items-end justify-between gap-x-4 w-full drop-shadow-md'>
                <div className='flex flex-col items-start gap-y-1 w-full'>
                    <span className='relative ml-2 font-bold text-xl sm:text-2xl text-white text-center'>From</span>
                    <CurrencySelector
                        currencies={currencies}
                        currency={swap.currentSrcCurrency as Currency}
                        handleSelect={handleSelectSrcCurrency}
                        isLoading={isFetchingCurrency}
                    />
                </div>
                <button
                    type='button'
                    className='mb-2 w-12 hover:opacity-80 active:opacity-60 drop-shadow-md'
                    onClick={handleSwitchCurrencies}
                >
                    <img src={icons.rotate} alt='switch-icon' />
                </button>
                <div className='flex flex-col items-start gap-y-1 w-full'>
                    <span className='relative ml-2 font-bold text-xl sm:text-2xl text-white text-center'>To</span>
                    <CurrencySelector
                        currencies={currencies}
                        currency={swap.currentDstCurrency as Currency}
                        handleSelect={handleSelectDstCurrency}
                        isLoading={isFetchingCurrency}
                    />
                </div>
            </div>
            {/* End: Currency selectors */}

            <Input
                ref={swapInputRef}
                type='number'
                placeholder='enter amount to swap'
                autoFocus
                invalid={!!errorMessage}
                onKeyDown={handlePreventKeysOnInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value) {
                        dispatch(enableSwapLoading());
                        setErrorMessage('');
                        setValue(Number.parseFloat(e.target.value));
                    } else setValue(0);
                }}
            />
            {errorMessage && <span className='absolute bottom-8 -mt-5 text-lg text-berry'>{errorMessage}</span>}

            <Button
                type='submit'
                disabled={swap.isLoading}
                className='absolute bottom-0 translate-y-1/2 flex items-center gap-x-2'
            >
                <span>Swap</span>
                <span className='hidden sm:inline px-2 py-0.5 text-sm bg-gray-300/20 border-2 border-white rounded-md shadow-white drop-shadow-md'>
                    <img src={icons.enter} alt='enter-icon' className='w-4' />
                </span>
            </Button>
        </form>
    );
}
