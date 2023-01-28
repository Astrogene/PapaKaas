import readingTime from 'reading-time'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    components: true,
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@nuxt/content',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        "formidable",
    ],
    runtimeConfig: {
        secret: 'superdupersafesecret',
        
        public: { apiBase: '/api' }
    },
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
        }
    }
})

