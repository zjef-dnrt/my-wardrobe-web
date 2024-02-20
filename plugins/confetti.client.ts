import ConfettiExplosion from "vue-confetti-explosion";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("confetti-explosion", ConfettiExplosion);
});
