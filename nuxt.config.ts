// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@element-plus/nuxt",
  ],
  app: {
    head: {
      title: "My Closet",
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/style/element-plus.scss" as element;',
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
