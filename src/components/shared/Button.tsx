import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'text';
type Size = 'small' | 'normal';

interface Props {
    children: ReactNode;
    type?: 'button' | 'submit';
    className?: string;
    disabled?: boolean;
    variant?: Variant;
    size?: Size;
    onClick?: () => void;
}

export default function Button({
    children,
    type = 'button',
    className,
    disabled = false,
    variant = 'primary',
    size = 'normal',
    onClick
}: Props) {
    //// METHODS ////
    /**
     * Get className by variant
     * @param {Variant} variant - 'primary' | 'secondary' | 'accent' | 'outline'
     */
    const getVariantClassName = (variant: Variant): string => {
        switch (variant) {
            case 'primary':
                return 'text-white bg-light-orange border-white';
            case 'secondary':
                return 'text-white bg-matcha border-white';
            case 'outline':
                return 'text-typo bg-white border-typo';
            case 'text':
                return 'px-0 py-0 text-typo bg-transparent border-transparent shadow-none';
        }
    };
    /**
     * Get className by size
     * @param {Size} size - 'primary' | 'secondary' | 'accent' | 'outline'
     */
    const getSizeClassName = (size: Size): string => {
        switch (size) {
            case 'small':
                return 'px-4 py-1.5 text';
            case 'normal':
                return 'px-6 py-2 text-2xl';
        }
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={[
                'font-bold uppercase border outline-typo rounded-full shadow-md transition hover:opacity-80 active:opacity-60 disabled:bg-gray-300 disabled:hover:opacity-100',
                getVariantClassName(variant),
                getSizeClassName(size),
                className
            ].join(' ')}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
