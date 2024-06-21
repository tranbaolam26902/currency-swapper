import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { icons } from '@/assets';

import { Fade, Button } from '@components/shared';

import { closeConfirmation, selectConfirmation, setConfirmationCallback } from '@redux/feature/modals';

export default function ConfirmationModal() {
    //// HOOKS ////
    const dispatch = useDispatch();
    const confirmation = useSelector(selectConfirmation);

    //// EVENT HANDLERS
    /**
     * Clear confirmation callback, close confirmation modal and focus on last focused element
     */
    const handleClose = useCallback(() => {
        dispatch(setConfirmationCallback(() => {}));
        dispatch(closeConfirmation());
        confirmation.lastFocusedElement?.current?.focus();
    }, [dispatch, confirmation.lastFocusedElement]);
    /**
     * Clear confirmation callback after execute and close confirmation modal
     */
    const handleConfirm = useCallback(() => {
        confirmation.confirmationCallback();
        dispatch(setConfirmationCallback(() => {}));
        dispatch(closeConfirmation());
    }, [confirmation, dispatch]);

    //// SIDE EFFECTS ////
    useEffect(() => {
        /**
         * Allow cancel and confirm with Escape and Enter
         */
        const handleConfirmationModalWithKeyboard = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
            if (e.key === 'Enter') {
                handleConfirm();
            }
        };

        window.addEventListener('keydown', handleConfirmationModalWithKeyboard);

        return () => {
            window.removeEventListener('keydown', handleConfirmationModalWithKeyboard);
        };
    }, [handleClose, handleConfirm]);

    return (
        <Fade duration={0.2} className='fixed z-10 inset-0 flex items-center justify-center p-6'>
            <div className='absolute z-0 inset-0 bg-black/40' onClick={handleClose}></div>
            <section className='relative z-10 flex flex-col gap-y-4 p-6  max-w-full bg-white rounded-3xl'>
                <h6 className='text-xl text-center'>{confirmation.message}</h6>
                <div className='grid grid-cols-2 gap-x-2 sm:gap-x-4 mx-auto w-fit'>
                    <Button
                        variant='outline'
                        size='small'
                        className='flex items-center justify-center gap-x-2'
                        onClick={handleClose}
                    >
                        <span>Cancel</span>
                        <span className='hidden sm:inline px-2 py-0.5 text-xs text-[#676767] bg-[#e5e5e5] rounded-md drop-shadow'>
                            Esc
                        </span>
                    </Button>
                    <Button
                        variant='secondary'
                        size='small'
                        className='flex items-center justify-center gap-x-2'
                        onClick={handleConfirm}
                    >
                        <span>Confirm</span>
                        <span className='hidden sm:inline px-2 py-px text-sm bg-gray-300/20 border-2 border-white rounded-md shadow-white drop-shadow-md'>
                            <img src={icons.enter} alt='enter-icon' className='w-4' />
                        </span>
                    </Button>
                </div>
            </section>
        </Fade>
    );
}
