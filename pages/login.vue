<template>
  <h1
    class="tw-font-festive tw-tracking-wide tw-text-6xl tw-text-oldLavender-500 tw-my-6"
  >
    My Wardrobe
  </h1>
  <div
    class="tw-w-full tw-flex-grow tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <div class="tw-mt-8 tw-w-5/6">
      <label for="email" class="tw-mb-3 tw-text-oldLavender-700">
        Your email
      </label>
      <input
        v-model="email"
        type="email"
        name="email"
        id="email"
        autocomplete="off"
        class="tw-bg-oldLavender-200 tw-text-oldLavender-700 tw-rounded-lg tw-shadow-sm block tw-w-full tw-p-2.5"
        placeholder="name@company.com"
        @input="validateEmail"
      />
      <p v-if="emailError" class="tw-mt-2 tw-text-red-800">{{ emailError }}</p>
      <button
        :disabled="!emailValid"
        class="tw-bg-helioGray-600 tw-text-mistyRose-400 tw-text-sm tw-p-2 tw-px-4 disabled:tw-opacity-50 tw-float-right tw-mt-3 tw-shadow-md tw-rounded-md"
        @click="signInWithOTP"
      >
        <Loading v-if="isLoadingOTP" />
        <template v-else>
          <client-only>
            <font-awesome-icon icon="wand-magic-sparkles" class="tw-mr-3" />
          </client-only>
          <span>Sign in with magic link</span>
        </template>
      </button>
    </div>
    <hr class="divider tw-w-2/3 tw-mt-10 tw-mb-8 tw-border-darkPurple-300" />
    <button
      class="tw-py-4 tw-mb-4 tw-shadow-md tw-w-5/6 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-bg-helioGray-700 hover:tw-shadow-xl hover:tw--translate-y-1 tw-transition-all tw-duration-300 tw-text-white"
      @click="signInWithOauth('google')"
    >
      <Loading v-if="isLoadingGoogle" />
      <div v-else>
        <client-only>
          <font-awesome-icon icon="fa-brands fa-google" class="tw-mr-2" />
        </client-only>
        Login with Google
      </div>
    </button>
    <button
      class="tw-py-4 tw-shadow-md tw-w-5/6 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-bg-helioGray-700 hover:tw-shadow-xl hover:tw--translate-y-1 tw-transition-all tw-duration-300 tw-text-white"
      @click="signInWithOauth('facebook')"
    >
      <Loading v-if="isLoadingFB" />
      <div v-else>
        <client-only>
          <font-awesome-icon icon="fa-brands fa-facebook" class="tw-mr-2" />
        </client-only>
        Login with Facebook
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Provider } from "@supabase/supabase-js";

definePageMeta({
  layout: "auth",
});

const isLoadingFB = ref(false);
const isLoadingGoogle = ref(false);
const isLoadingOTP = ref(false);

const supabase = useSupabaseClient();
const alertStore = useAlertsStore();
const config = useRuntimeConfig();

const email = ref("");
const emailError = ref("");
const emailValid = ref(false);

const validateEmail = () => {
  const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.value.match(pattern)) {
    emailError.value = "Please enter a valid email address";
    emailValid.value = false;
  } else {
    emailError.value = "";
    emailValid.value = true;
  }
};

const signInWithOTP = async () => {
  if (!emailValid.value) return;
  isLoadingOTP.value = true;

  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: `${config.public.baseUrl}/confirm`,
    },
  });
  if (error) console.log(error);

  alertStore.success('Check your email for the magic link')
  email.value = "";
  isLoadingOTP.value = false;
};

const signInWithOauth = async (provider: Provider) => {
  switch (provider) {
    case "google":
      isLoadingGoogle.value = true;
      break;
    case "facebook":
      isLoadingFB.value = true;
      break;
    default:
      break;
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${config.public.baseUrl}/confirm`,
    },
  });
  if (error) console.log(error);
};
</script>

<style lang="scss" scoped>
.divider {
  position: relative;
  overflow: visible;

  &:before {
    content: 'OR';
    display: block;
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 10px;
    color: #80727b;
    background-color: #c1b2b2;
  }
}
</style>