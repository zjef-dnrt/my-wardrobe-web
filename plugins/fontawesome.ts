import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faArrowRightLong,
  faDice,
  faEllipsisV,
  faImage,
  faPenClip,
  faPlus,
  faRepeat,
  faTrash,
  faUserCircle,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faFacebook,
  faGoogle,
  faArrowLeft,
  faUserCircle,
  faArrowRightLong,
  faPlus,
  faTrash,
  faPenClip,
  faEllipsisV,
  faImage,
  faDice,
  faRepeat,
  faWandMagicSparkles,
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
