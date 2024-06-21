import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
            "@components": `${path.resolve(__dirname, "./src/components/")}`,
            "@constants": `${path.resolve(__dirname, "./src/constants/")}`,
            "asdf": `${path.resolve(__dirname, "./src/hooks/")}`,
            "@redux": `${path.resolve(__dirname, "./src/redux/")}`,
            "@services": `${path.resolve(__dirname, "./src/services/")}`,
            "@types": `${path.resolve(__dirname, "./src/types/")}`,
            "@utils": `${path.resolve(__dirname, "./src/utils/")}`
        }
    }
})
