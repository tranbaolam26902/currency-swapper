import { ReactNode } from 'react';
import { easeInOut, motion } from 'framer-motion';

interface Props {
    duration: number;
    children: ReactNode;
    className?: string;
}

export default function Fade({ duration, children, className }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration, ease: easeInOut } }}
            exit={{ opacity: 0, transition: { duration, ease: easeInOut } }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
