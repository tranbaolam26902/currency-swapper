import { RefObject } from 'react';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';

interface Confirmation {
    isOpen: boolean;
    message: string;
    lastFocusedElement: RefObject<HTMLElement> | null;
    confirmationCallback: () => void;
}

const initialState: Confirmation = {
    isOpen: false,
    message: 'Do you want to perform this action?',
    lastFocusedElement: null,
    confirmationCallback: () => {}
};

const confirmationSlice = createSlice({
    name: 'confirmation',
    initialState,
    reducers: {
        openConfirmation: (state) => {
            state.isOpen = true;
        },
        closeConfirmation: (state) => {
            state.isOpen = false;
        },
        setConfirmationMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        setLastFocusedElement: (state, action) => {
            state.lastFocusedElement = action.payload;
        },
        setConfirmationCallback: (state, action: PayloadAction<() => void>) => {
            state.confirmationCallback = action.payload;
        }
    }
});

export const confirmationReducer = confirmationSlice.reducer;
export const selectConfirmation = (state: RootState) => state.confirmation;
export const {
    openConfirmation,
    closeConfirmation,
    setConfirmationMessage,
    setLastFocusedElement,
    setConfirmationCallback
} = confirmationSlice.actions;
