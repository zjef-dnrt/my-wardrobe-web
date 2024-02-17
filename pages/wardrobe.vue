<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <h1 class="tw-mb-5 tw-text-mistyRose-800">My Wardrobe</h1>
    <div class="tw-flew-grow">
      <div
        v-if="clothes.length"
        class="tw-h-full tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 xl:tw-grid-cols-6 tw-gap-6 tw-overflow-y-auto"
      >
        <GarmentCard
          v-for="garment in clothes"
          :key="garment.id"
          :garment="garment"
        />
      </div>
      <p v-else class="tw-text-xl tw-text-mistyRose-800 tw-opacity-75">
        You don't have any clothes added yet!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const { clothes } = useClothesStore();
</script>
