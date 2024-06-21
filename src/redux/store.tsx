import { configureStore } from '@reduxjs/toolkit';

import { swapReducer } from './feature/currency-swap/swapSlice';
import { confirmationReducer } from './feature/modals/confirmationSlice';

export const store = configureStore({
    reducer: {
        swap: swapReducer,
        confirmation: confirmationReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
