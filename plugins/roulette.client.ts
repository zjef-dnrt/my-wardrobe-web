import { Roulette } from "vue3-roulette";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("roulette", Roulette);
});
