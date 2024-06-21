import { useSelector } from 'react-redux';

import { Loading } from './shared';

import { useCurrencies } from '@/hooks';

import { selectSwap } from '@redux/feature/currency-swap';

interface Props {
    isFetchingCurrency: boolean;
}

export default function ResultSection({ isFetchingCurrency }: Props) {
    //// STATES ////
    const swap = useSelector(selectSwap);

    //// HOOKS ////
    const { calculateExchangeRate, convertSrcToDst } = useCurrencies();

    return (
        <section className='p-6 w-[40rem] max-w-full text-center bg-matcha border border-white rounded-3xl drop-shadow-md'>
            <h5 className='font-bold text-xl sm:text-2xl text-white uppercase drop-shadow-md'>amount to receive</h5>
            <hr className='mt-2 mb-2 sm:mb-4 border-b border-white' />
            {swap.isLoading || isFetchingCurrency ? (
                <Loading white />
            ) : (
                <>
                    <div className='mb-1 flex flex-wrap break-all items-center justify-center gap-x-1 sm:gap-x-4 gap-y-1 drop-shadow-md'>
                        {swap.currentSrcCurrency && swap.currentDstCurrency && (
                            <span className='font-bold text-3xl sm:text-4xl text-white'>
                                {convertSrcToDst(
                                    swap.currentSrcCurrency,
                                    swap.currentDstCurrency,
                                    swap.value
                                ).toLocaleString('en-US', {
                                    maximumFractionDigits: 100,
                                    maximumSignificantDigits: 21,
                                    useGrouping: true
                                })}
                            </span>
                        )}
                    </div>
                    <div className='mb-1 sm:mb-2 flex items-center justify-center gap-x-2 drop-shadow-md'>
                        <img src={swap.currentDstCurrency?.icon} alt='destination-icon' className='w-6' />
                        <span className='font-bold text-2xl sm:text-3xl text-white'>
                            {swap.currentDstCurrency?.currency}
                        </span>
                    </div>
                    {swap.currentSrcCurrency && swap.currentDstCurrency && (
                        <div className='flex items-center justify-center flex-wrap gap-x-1 text-xl sm:text-2xl text-white drop-shadow-md'>
                            <span>1</span>
                            <span>{swap.currentSrcCurrency?.currency}</span>
                            <span>=</span>
                            <span>
                                {calculateExchangeRate(swap.currentSrcCurrency, swap.currentDstCurrency).toFixed(8)}
                            </span>
                            <span>{swap.currentDstCurrency?.currency}</span>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
