/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                peachy: 'var(--color-peachy)',
                matcha: 'var(--color-matcha)',
                berry: 'var(--color-berry)',
                brownie: 'var(--color-brownie)',
                'light-orange': 'var(--color-light-orange)',
                typo: 'var(--color-typo)'
            },
            fontfamily: {
                futura: ['futura', 'sans-serif']
            }
        }
    },
    plugins: []
};
