<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <div class="tw-flex tw-items-center tw-mb-5">
      <h1 class="tw-text-mistyRose-800">
        {{ capitalize(locationName) }}
      </h1>
    </div>
    <div class="tw-flex tw-mb-4">
      <button
        class="tw-bg-helioGray-600 tw-text-mistyRose-400 tw-p-3 tw-shadow-md tw-rounded-md"
        @click="dialogOpen = true"
      >
        <client-only>
          <font-awesome-icon icon="trash" class="tw-mr-3" />
        </client-only>
        <span>Delete location</span>
      </button>
    </div>
    <div class="tw-flex-grow">
      <div
        v-if="clothesInLocation.length"
        class="tw-h-full tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 xl:tw-grid-cols-6 tw-gap-6 tw-overflow-y-auto"
      >
        <GarmentCard
          v-for="garment in clothesInLocation"
          :key="garment.id"
          :garment="garment"
        />
      </div>
      <p v-else class="tw-text-xl tw-text-mistyRose-800 tw-opacity-75">
        You don't have any clothes in this location!
      </p>
    </div>
  </div>
  <client-only>
    <el-dialog v-model="dialogOpen" :title="`Delete location ${locationName}`">
      <p>Are you sure? This action is irreversable.</p>
      <template #footer class="dialog-footer">
        <el-button @click="dialogOpen = false">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="deleteCategory">
          Delete
        </el-button>
      </template>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import { capitalize } from "@/util/string";

definePageMeta({
  layout: "main",
});

const route = useRoute();
const locationName = computed(() => route.params.location as string);

const { getClothesInLocation } = useClothesStore();
const clothesInLocation = computed(() =>
  getClothesInLocation(locationName.value)
);

const dialogOpen = ref(false);
const isLoading = ref(false);

const locationsStore = useLocationsStore();
const alertStore = useAlertsStore();

const deleteCategory = async () => {
  try {
    await locationsStore.removeLocation(locationName.value);
    alertStore.success(`Category ${locationName.value} deleted`);
  } catch (error) {
    alertStore.error(`Error deleting category ${locationName.value}`);
    console.log(error);
  } finally {
    dialogOpen.value = false;
    navigateTo("/wardrobe");
  }
};
</script>
