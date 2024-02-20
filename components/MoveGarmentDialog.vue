<template>
  <el-dialog
    v-model="dialogOpen"
    title="Move Garment to another location"
    @closed="$emit('closed')"
  >
    <div
      class="tw-text-center tw-m-auto tw-flex tw-max-w-xl tw-flex-col tw-items-center"
    >
      <GarmentCard :garment="garment" no-link />
      <el-select
        v-model="selectedLocation"
        value-key="name"
        placeholder="Select location"
        size="large"
        class="tw-my-4"
      >
        <el-option
          v-for="location in getAllLocations()"
          :key="location.name"
          :label="capitalize(location.name)"
          :value="location"
        />
      </el-select>
      <el-button type="primary" :loading="isLoading" @click="moveGarment">
        Move garment
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { capitalize } from "@/util/string";
import type { Garment, Location } from "@/types/models";

const props = defineProps<{
  garment: Garment;
  open: boolean;
}>();

const clothesStore = useClothesStore();
const alertsStore = useAlertsStore();
const { getAllLocations } = useLocationsStore();
const allLocations = computed(getAllLocations);

const dialogOpen = ref(props.open);
const isLoading = ref(false);
const selectedLocation = ref<Location>(allLocations.value[0]);

watch(
  () => props.open,
  (newVal) => (dialogOpen.value = newVal)
);

const moveGarment = async () => {
  isLoading.value = true;

  const locationName = selectedLocation.value.name;

  try {
    const updatedGarment: Partial<Garment> = {
      location: locationName === "Wardrobe" ? null : locationName,
    };

    await clothesStore.updateGarment(props.garment.id!, updatedGarment);
    dialogOpen.value = false;
    alertsStore.success(`Garment moved to ${locationName}`);
  } catch (error) {
    alertsStore.error(`Error moving garment to ${locationName}`);
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
