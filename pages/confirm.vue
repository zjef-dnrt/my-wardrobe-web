<template>
  <div
    class="tw-w-full tw-flex-grow tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <p class="tw-mx-9 tw-mb-4 tw-text-center tw-opacity-40">
      The authentication failed, please try again
    </p>
    <NuxtLink
      to="/login"
      class="tw-py-4 tw-w-2/3 tw-shadow-md tw-rounded-full tw-flex tw-justify-center tw-items-center tw-bg-helioGray-700 hover:tw-shadow-xl hover:tw--translate-y-1 tw-transition-all tw-duration-300 tw-text-white"
    >
      <font-awesome-icon icon="arrow-left" class="tw-mr-2" />
      Return to login
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const user = useSupabaseUser();

// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName;
const redirectPath = useCookie(`${cookieName}-redirect-path`).value;

// Immediately redirect to the wardrobe if the user signed in successfully
watch(
  user,
  () => {
    if (!user.value) return;
    // Clear cookie
    useCookie(`${cookieName}-redirect-path`).value = null;
    // Redirect to path
    return navigateTo(redirectPath || "/wardrobe");
  },
  { immediate: true }
);
</script>
