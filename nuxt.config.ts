
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-16',
            htmlAttrs: {
                lang: 'nl'
            },
            viewport: 'width=device-width, initial-scale=1',
            title: 'BommelKaas',
            meta: [
                // <meta name="description" content="My amazing site">
                { name: 'description', content: 'De BommelKaas website' }
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
        manifest: {
            name: 'BommelKaas',
            lang: 'nl',
            background_color: '#ffe442'
        },
        meta: {
            name: 'BommelKaas',
            author: 'Astro',
            theme_color: '#ffe442',
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

