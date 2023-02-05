
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-16',
            htmlAttrs: {
                lang: 'nl'
            },
            viewport: 'width=device-width, initial-scale=1',
            title: 'PapaKaas',
            meta: [
                // <meta name="description" content="My amazing site">
                { name: 'description', content: 'De PapaKaas website' }
            ],
        }
    },
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
        '@nuxt/image-edge',
        '@pinia/nuxt', // v 0.4.6
        '@pinia-plugin-persistedstate/nuxt',
        "formidable",
        "@kevinmarrec/nuxt-pwa"
    ],
    pwa: {
        meta: {
            name: 'PapaKaas',
            author: 'Astro',
            // Generate splash screens for iOS
            mobileAppIOS: true,
        },
    },
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
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
        }
    },
    nitro: {
        prerender: {
            crawlLinks: true
        }
    },
})

