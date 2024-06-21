import { icons } from '@/assets';

interface Props {
    width?: number;
    white?: boolean;
}

export default function Loading({ width = 64, white = false }: Props) {
    return (
        <img
            src={white ? icons.loadingWhite : icons.loading}
            alt='loading-icon'
            width={width}
            className='mx-auto animate-spin animate-infinite animate-duration-1000'
        />
    );
}
