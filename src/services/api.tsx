import axios from 'axios';
import { toast } from 'react-toastify';

const get = async (url: string) => {
    const response = await axios.get(url).catch((error) => {
        toast.error(error.message);
    });

    return response?.data || null;
};

export { get };
