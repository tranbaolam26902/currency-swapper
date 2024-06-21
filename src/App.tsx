import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { images } from './assets';

import { ConfirmationModal } from '@components/shared';
import { ResultSection, SwapForm } from '@/components';

import { selectConfirmation } from './redux/feature/modals/confirmationSlice';
import { useCurrencies } from './hooks';

function App() {
    //// STATES ////
    const confirmation = useSelector(selectConfirmation);
    const { currencies, isFetchingCurrency } = useCurrencies();

    return (
        <main className='flex flex-col items-center p-6 w-full'>
            <Fade direction='up' duration={1500} className='flex flex-col items-center w-full'>
                <img src={images.title} alt='title' className='mt-10 mb-8 w-fit' />
            </Fade>
            <Fade direction='up' duration={1500} delay={200} className='z-10 flex flex-col items-center w-full'>
                <SwapForm currencies={currencies} isFetchingCurrency={isFetchingCurrency} />
            </Fade>
            <Fade direction='up' duration={1500} delay={400} className='flex flex-col items-center w-full'>
                <ResultSection isFetchingCurrency={isFetchingCurrency} />
            </Fade>
            <AnimatePresence>{confirmation.isOpen && <ConfirmationModal />}</AnimatePresence>
            <ToastContainer
                autoClose={4000}
                pauseOnFocusLoss={false}
                limit={4}
                draggablePercent={60}
                position='top-right'
            />
        </main>
    );
}

export default App;
