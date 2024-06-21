interface ImportMetaEnv {
    readonly VITE_ICONS_API_URL: string;
    readonly VITE_CURRENCY_API_URL: string;
    readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
