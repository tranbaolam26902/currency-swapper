import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';

import { Currency } from '@/types';

interface Swap {
    currentSrcCurrency: Currency | null;
    currentDstCurrency: Currency | null;
    value: number;
    isLoading: boolean;
}

const initialState: Swap = {
    value: 0,
    currentSrcCurrency: null,
    currentDstCurrency: null,
    isLoading: false
};

const swapSlice = createSlice({
    name: 'swap',
    initialState,
    reducers: {
        setCurrentSrcCurrency: (state, action: PayloadAction<Currency>) => {
            state.currentSrcCurrency = action.payload;
        },
        setCurrentDstCurrency: (state, action: PayloadAction<Currency>) => {
            state.currentDstCurrency = action.payload;
        },
        setSwapValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        enableSwapLoading: (state) => {
            state.isLoading = true;
        },
        disableSwapLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const swapReducer = swapSlice.reducer;
export const selectSwap = (state: RootState) => state.swap;
export const { setCurrentSrcCurrency, setCurrentDstCurrency, setSwapValue, enableSwapLoading, disableSwapLoading } =
    swapSlice.actions;
