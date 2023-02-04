
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
        '@pinia/nuxt', // v 0.4.6
        '@pinia-plugin-persistedstate/nuxt',
        "formidable",
    ],
    runtimeConfig: {
        secret: 'superdupersafesecret',
        username: 'admin',
        password: 'bestpassword',
        
        public: { apiBase: '/api' }
    },
    imports: {
        dirs: ['./stores'],
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
    },
    /*,
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
        }
    }*/
})

