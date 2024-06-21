import { ChangeEvent, KeyboardEventHandler, Ref, forwardRef } from 'react';

interface Props {
    type?: string;
    placeholder?: string;
    autoFocus?: boolean;
    invalid?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: KeyboardEventHandler;
}

const Input = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
    //// PROPS ////
    const { type = 'text', placeholder, autoFocus = false, invalid = false, onKeyDown, onChange } = props;

    return (
        <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            step={'any'}
            className={[
                'px-8 py-2 w-full font-bold text-center text-xl sm:text-2xl bg-white border border-[#d7d7d7] outline outline-2 rounded-full shadow-md',
                invalid ? 'outline-berry' : 'outline-transparent'
            ].join(' ')}
            autoFocus={autoFocus}
            onKeyDown={onKeyDown}
            onChange={onChange}
        />
    );
});

export default Input;
