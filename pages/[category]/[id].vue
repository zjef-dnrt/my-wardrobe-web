<template>
  <div class="tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center tw-my-4">
    <EditGarmentButton :garment="garment!" button />
    <div
      class="gradient-bg tw-relative tw-w-3/4 tw-h-3/4 tw-mt-4 tw-grid tw-place-items-center tw-p-8 tw-border-helioGray-700 tw-border-2 tw-rounded-md tw-shadow-md"
    >
      <NuxtImg :src="garment!.photoURL!" placeholder fit="contain" class="tw-pb-8"/>
      <div
        v-if="garment"
        class="tw-flex tw-flex-col tw-px-8 tw-py-4 tw-w-full tw-bg-mistyRose-500 tw-rounded-md tw-shadow-xl"
      >
        <div class="tw-mt-2 tw-mb-1">
          <h3 class="tw-font-bold">Brand</h3>
          <p class="tw-text-sm">{{ garment.brand }}</p>
        </div>
        <div class="tw-mt-2 tw-mb-1">
          <h3>Color</h3>
          <p class="tw-text-sm">{{ garment.color }}</p>
        </div>
        <div v-if="garment.size" class="tw-mt-2 tw-mb-1">
          <h3>Size</h3>
          <p class="tw-text-sm">{{ garment.size }}</p>
        </div>
        <div class="tw-mt-2 tw-mb-1">
          <h3>Purchase date</h3>
          <p class="tw-text-sm">{{ garment.purchase_date }}</p>
        </div>
        <div class="tw-mt-2 tw-mb-1">
          <h3>Location</h3>
          <p class="tw-text-sm">{{ garment.location ?? "Wardrobe" }}</p>
        </div>
        <div v-if="garment.remark" class="tw-mt-2 tw-mb-1">
          <h3>Remark</h3>
          <p class="tw-text-sm">{{ garment.remark }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const route = useRoute();
const clothesStore = useClothesStore();

const garment = computed(() => clothesStore.getGarmentById(+route.params.id));
</script>

<style lang="scss" scoped>
.gradient-bg {
  background: hsla(0, 40%, 91%, 1);

  background: radial-gradient(
    circle,
    hsla(0, 40%, 91%, 1) 0%,
    hsla(0, 11%, 73%, 1) 100%
  );

  background: -moz-radial-gradient(
    circle,
    hsla(0, 40%, 91%, 1) 0%,
    hsla(0, 11%, 73%, 1) 100%
  );

  background: -webkit-radial-gradient(
    circle,
    hsla(0, 40%, 91%, 1) 0%,
    hsla(0, 11%, 73%, 1) 100%
  );
}
</style>
