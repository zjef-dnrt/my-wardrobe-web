<template>
  <button
    v-if="button"
    class="tw-px-5 tw-py-2 tw-rounded-md tw-border-helioGray-700 tw-border-2 tw-text-sm hover:tw-shadow-md tw-text-helioGray-700 hover:tw-border-transparent tw-duration-500 hover:tw-bg-helioGray-700 hover:tw-text-mistyRose-600 tw-transition-all tw-border-dashed"
    @click="dialogOpen = true"
  >
    EDIT GARMENT
  </button>
  <font-awesome-icon
    v-else
    icon="pen-clip"
    class="tw-text-helioGray-800 hover:tw-cursor-pointer"
    @click="dialogOpen = true"
  />
  <GarmentDialog
    :garment="garment"
    :open="dialogOpen"
  />
</template>

<script setup lang="ts">
import type { Garment } from "@/types/models";

defineProps<{
  garment: Garment;
  // Show the button instead of the icon
  button?: boolean;
}>();

const dialogOpen = ref(false);
</script>
