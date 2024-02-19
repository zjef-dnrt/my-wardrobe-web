<template>
  <h1
    class="tw-font-festive tw-tracking-widest tw-text-6xl tw-text-oldLavender-500 tw-my-6"
  >
    My Wardrobe
  </h1>
  <p class="tw-mx-9 tw-text-center tw-opacity-40">
    Please authenticate yourself to continue
  </p>
  <div
    class="tw-w-full tw-flex-grow tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <button
      class="tw-py-4 tw-w-2/3 tw-shadow-md tw-rounded-full tw-flex tw-justify-center tw-items-center tw-bg-helioGray-700 hover:tw-shadow-xl hover:tw--translate-y-1 tw-transition-all tw-duration-300 tw-text-white"
      @click="signInWFB"
    >
      <Loading v-if="isLoading" />
      <div v-else>
        <font-awesome-icon icon="fa-brands fa-facebook" class="tw-mr-2" />
        Login with Facebook
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
definePageMeta({
  layout: "auth",
});

const isLoading = ref(false);
const supabase = useSupabaseClient();

const signInWFB = async () => {
  isLoading.value = true;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) console.log(error);
};
</script>
