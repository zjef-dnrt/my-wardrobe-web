<template>
  <article
    :style="{ 'pointer-events': noLink ? 'none' : 'auto' }"
    class="card tw-h-80 tw-w-full tw-my-3 tw-shadow-md tw-rounded-md tw-flex tw-flex-col hover:tw-cursor-pointer hover:tw-shadow-lg hover:tw--translate-y-1 tw-transition-all tw-duration-300 tw-overflow-hidden"
  >
    <div class="card__options">
      <client-only>
        <el-dropdown>
          <span
            class="el-dropdown-link card__options-menu tw-text-oldLavender-500"
          >
            <font-awesome-icon icon="ellipsis-v" />
          </span>
          <template #dropdown>
            <el-dropdown-menu class="tw-text-darkPurple-400">
              <el-dropdown-item @click="garmentEditDialogVisible = true">
                <span>
                  <font-awesome-icon icon="pen-clip" class="tw-mr-3" />
                  Edit
                </span>
              </el-dropdown-item>
              <el-dropdown-item @click="garmentMoveDialogVisible = true">
                <span>
                  <font-awesome-icon icon="repeat" class="tw-mr-3" />
                  Move
                </span>
              </el-dropdown-item>
              <el-dropdown-item @click="removeGarment">
                <span>
                  <font-awesome-icon icon="trash" class="tw-mr-3" />
                  Delete
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </client-only>
    </div>
    <client-only>
      <NuxtLink
        :to="`/${garment.category}/${garment.id}`"
        class="tw-h-full tw-flex tw-flex-col card__display"
      >
        <div class="tw-h-full tw-relative tw-overflow-hidden card__details">
          <el-tag
            type="info"
            class="tw-absolute tw-bottom-1 tw-right-1 tw-z-[1]"
          >
            {{ garmentLocation }}
          </el-tag>
          <div
            class="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center gradient-bg"
          >
            <font-awesome-icon
              v-if="!garment.photoURL"
              icon="image"
              class="tw-text-5xl tw-text-mistyRose-800 tw-opacity-25"
            />
            <NuxtImg
              v-else
              :src="garment.photoURL"
              placeholder="/hanger.svg"
              class="tw-w-full tw-h-full tw-filter tw-brightness-75"
            />
          </div>
        </div>
        <div
          class="tw-h-1/4 tw-bg-helioGray-600 tw-text-sm tw-grid tw-py-1 tw-px-2"
        >
          <p
            class="tw-tracking-widest tw-font-bold tw-text-mistyRose-500 tw-uppercase"
          >
            {{ garment.brand }}
          </p>
          <p>{{ garment.color }}, size {{ garmentSize.toLowerCase() }}</p>
          <p class="tw-text-xs tw-opacity-60">
            {{ capitalize(garment.category ?? "") }}
          </p>
        </div>
      </NuxtLink>
    </client-only>
  </article>
  <client-only>
    <GarmentDialog
      :garment="garment"
      :open="garmentEditDialogVisible"
      @closed="garmentEditDialogVisible = false"
    />
    <MoveGarmentDialog
      :garment="garment"
      :open="garmentMoveDialogVisible"
      @closed="garmentMoveDialogVisible = false"
    />
  </client-only>
</template>

<script setup lang="ts">
import { capitalize } from "@/util/string";
import type { Garment } from "~/types/models";

const props = defineProps<{
  garment: Garment;
  noLink?: boolean;
}>();

const clothesStore = useClothesStore();
const alertsStore = useAlertsStore();

const { garment } = toRefs(props);
const garmentEditDialogVisible = ref(false);
const garmentMoveDialogVisible = ref(false);
const garmentLocation = computed(() => garment.value.location ?? "Wardrobe");
const garmentSize = computed(
  () => garment.value.size?.toLowerCase() ?? "unknown"
);

const removeGarment = async () => {
  const garmentId = toRaw(garment.value).id;
  if (!garmentId) return alertsStore.error("Garment ID not found");

  try {
    await clothesStore.removeGarment(garmentId);
    alertsStore.success("Garment removed successfully");
  } catch (error) {
    alertsStore.error("Error removing garment");
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;

  &:hover {
    .card__options {
      opacity: 1;
    }
  }

  .card__options {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    z-index: 15;
    opacity: 0;
    transition: opacity 0.45s ease;
  }

  .card__options-menu {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-content: center;
    background: transparent !important;
    outline: none !important;

    &:focus,
    &:active {
      outline: none !important;
      outline-offset: 0 !important;
      box-shadow: none !important;
    }
  }

  .card__display:hover {
    .card__details {
      img {
        transform: scale(1.1);
      }
    }
  }

  .card__details {
    img {
      height: 100%;
      width: auto;
      transition: all 0.4s ease;
    }
  }
}

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
