import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(
    {
        plugins: [
            react(),
        ],
        resolve: {
            alias: {
                '@src': resolve(__dirname, 'src'),
                '@components': resolve(__dirname, 'src/components'),
                '@pages': resolve(__dirname, 'src/pages'),
                '@assets': resolve(__dirname, 'src/assets'),
                '@utils': resolve(__dirname, 'src/utils'),
                '@hooks': resolve(__dirname, 'src/hooks'),
                '@services': resolve(__dirname, 'src/services'),
                '@config': resolve(__dirname, 'src/config'),
                '@styles': resolve(__dirname, 'src/styles'),
                '@layouts': resolve(__dirname, 'src/layouts')
            }
        }
    }
)
