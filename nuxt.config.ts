// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/test-utils/module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],
  app: {
    head: {
      title: "My Wardrobe",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Raleway&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Festive&display=swap",
        },
      ],
    },
  },
  css: [
    "~/assets/style/all.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  elementPlus: {
    importStyle: "scss",
  },
  runtimeConfig: {
    public: {
      baseUrl:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_BASE_URL
          : process.env.DEV_BASE_URL,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/element-plus.scss" as element;',
        },
      },
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [],
      cookieRedirect: true,
    },
  },
});
