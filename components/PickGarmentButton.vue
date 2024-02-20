<template>
  <client-only>
    <el-tooltip
      :disabled="clothesInCategory.length >= 4"
      content="You need at least 4 garments in order to pick a random one"
      placement="top"
    >
      <button
        class="tw-bg-helioGray-600 tw-text-mistyRose-400 tw-p-3 tw-ml-3 tw-shadow-md tw-rounded-md disabled:tw-opacity-50"
        :disabled="clothesInCategory.length < 4"
        @click="dialogOpen = true"
      >
        <font-awesome-icon icon="dice" class="tw-mr-3" />
        Pick a random garment
      </button>
    </el-tooltip>
    <el-dialog
      v-model="dialogOpen"
      :top="'7vh'"
      :width="`${dialogWidth}px`"
      :title="`Pick a random garment from ${props.categoryName}`"
    >
      <el-steps :active="activeStep" align-center>
        <el-step title="Pick garment" />
        <el-step title="Keep or replace" />
        <el-step title="Choose location" />
      </el-steps>
      <div class="tw-h-full tw-m-8 tw-grid tw-place-items-center">
        <template v-if="activeStep === 0" class="">
          <p class="tw-mb-4">Click the wheel to start a spin!</p>
          <roulette
            ref="wheel"
            :items="clothesInCategory"
            display-indicator
            centered-indicator
            base-display
            :result-variation="100"
            :size="Math.min(width * 0.5, 500)"
            class="wheel tw-shadow-lg"
            @click="pickRandomGarment"
            @wheel-end="onWheelEnd"
          />
        </template>
        <template v-if="activeStep === 1">
          <div class="tw-flex tw-flex-col tw-items-center tw-text-center">
            <confetti-explosion
              :colors="CONFETTI_COLORS"
              :stageWidth="dialogWidth"
            />
            <h2 class="tw-text-2xl tw-mb-4">Do you want to keep this one?</h2>
            <GarmentCard :garment="selectedGarment!" no-link />
            <div class="tw-flex tw-gap-5 tw-justify-center tw-h-8">
              <el-button type="danger" @click="prevStep">
                Give me a new one
              </el-button>
              <el-button type="success" @click="nextStep"
                >Keep this garment</el-button
              >
            </div>
          </div>
        </template>
        <template v-if="activeStep === 2">
          <div class="tw-text-center">
            <h2 class="tw-text-2xl tw-mb-4">Move this garment</h2>
            <GarmentCard :garment="selectedGarment!" no-link />
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
        </template>
      </div>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import { capitalize } from "@/util/string";
import { WHEEL_COLORS, CONFETTI_COLORS } from "@/util/constants";
import type { Garment, Location, WheelItem } from "@/types/models";

const props = defineProps<{
  categoryName: string;
}>();

const clothesStore = useClothesStore();
const alertsStore = useAlertsStore();
const { getAllLocations } = useLocationsStore();

const clothesInCategory = computed(() => {
  const clothesInCategory = clothesStore.getClothesInCategory(
    props.categoryName
  );

  // Sort the clothes by last added to wardrobe
  // So that the most recently added clothes are last
  const sortedClothes = clothesInCategory.sort((a, b) => {
    return (
      new Date(a.last_added_to_wardrobe!).getTime() -
      new Date(b.last_added_to_wardrobe!).getTime()
    );
  });

  // Map the clothes to roulette items
  return [
    ...sortedClothes,
    ...sortedClothes,
    ...sortedClothes,
    ...sortedClothes,
    ...sortedClothes,
  ].map(
    (garment, index) =>
      ({
        id: garment.id ?? index,
        garment,
        htmlContent: `<img src="${garment.photoURL}" alt="${garment.brand}" style="margin:auto; transform: scale(0.85), translateY(-10px)"/>`,
        background: WHEEL_COLORS[index % WHEEL_COLORS.length],
      } as WheelItem)
  );
});

const dialogOpen = ref(false);
const activeStep = ref(0);
const isLoading = ref(false);

const wheel = ref<HTMLElement | null>(null);
const selectedGarment = ref<Garment | null>(null);
const selectedLocation = ref<Location>();

const { width } = useWindowSize();
const dialogWidth = computed(() => Math.min(width.value * 0.8, 700));

const nextStep = () => (activeStep.value = Math.min(activeStep.value + 1, 2));
const prevStep = () => (activeStep.value = Math.max(activeStep.value - 1, 0));

const pickRandomGarment = () => {
  selectedGarment.value = null;

  const rouletteWheel = wheel.value as any;
  rouletteWheel?.launchWheel();
};

const onWheelEnd = async ({ garment }: WheelItem) => {
  selectedGarment.value = toRaw(garment);
  nextStep();
};

const moveGarment = async () => {
  if (!selectedGarment.value || !selectedLocation.value) return;
  isLoading.value = true;

  const garment = selectedGarment.value;
  const locationName = selectedLocation.value.name;

  try {
    const updatedGarment: Partial<Garment> = {
      location: locationName === 'Wardrobe' ? null : locationName,
    };

    await clothesStore.updateGarment(garment.id!, updatedGarment);
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

<style lang="scss" scoped>
/* Styling for the wheel indicator */
.wheel:before {
  top: 0;
  left: 50%;
  height: 20px;
  transform: translateX(-50%);
  border-top: 20px solid #4a4153;
}
</style>
