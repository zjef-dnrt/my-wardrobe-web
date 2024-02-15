// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  app: {
    head: {
      title: "My Closet",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
    "~/assets/style/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  plugins: ["~/plugins/fontawesome.ts"],
});
