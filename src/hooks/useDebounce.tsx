import { useEffect, useState } from 'react';

export default function useDebounce(value: string | number, delay: number) {
    //// STATES ////
    const [debouncedValue, setDebouncedValue] = useState(value);

    //// SIDE EFFECTS /////
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
