// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        secret: 'superdupersafesecret',
        
        public: { apiBase: '/api' }
    }
})

