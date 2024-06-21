import { get } from './api';

const getAllCurrencies = async () => {
    return await get(import.meta.env.VITE_CURRENCY_API_URL);
};
const getAllCurrencyIcons = async () => {
    return await get(import.meta.env.VITE_ICONS_API_URL);
};

export { getAllCurrencies, getAllCurrencyIcons };
