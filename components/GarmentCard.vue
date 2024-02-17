<template>
  <article
    class="card tw-h-80 tw-w-full tw-my-3 tw-shadow-md tw-rounded-md tw-flex tw-flex-col hover:tw-cursor-pointer hover:tw-shadow-lg hover:tw--translate-y-1 tw-transition-all tw-duration-300 tw-overflow-hidden"
  >
    <div class="card__options">
      <el-dropdown>
        <span class="el-dropdown-link card__options-menu tw-text-oldLavender-500">
          <font-awesome-icon icon="ellipsis-v" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="() => {/* TODO */}">
              <span class="tw-text-darkPurple-400">
              <font-awesome-icon icon="pencil" class="tw-mr-3" />
              Edit
            </span>
            </el-dropdown-item>
            <el-dropdown-item @click="removeGarment">
              <span class="tw-text-darkSienna-400">
                <font-awesome-icon icon="trash" class="tw-mr-3" />
                Delete
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <client-only>
      <NuxtLink
        :to="`/${garment.category}/${garment.id}`"
        class="tw-h-full tw-flex tw-flex-col card__display"
      >
        <div class="tw-h-full tw-relative card__details">
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
              v-if="!imageUrl"
              icon="image"
              class="tw-text-5xl tw-text-mistyRose-800 tw-opacity-25"
            />
            <NuxtImg
              v-else
              :src="imageUrl"
              placeholder
              class="tw-w-full tw-h-full tw-object-cover tw-filter tw-brightness-75"
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
</template>

<script setup lang="ts">
import { capitalize } from "@/util/string";
import type { Garment } from "~/types/models";

const props = defineProps<{
  garment: Garment;
}>();

const clothesStore = useClothesStore();
const alertsStore = useAlertsStore();
const supabase = useSupabaseClient();

const { garment } = toRefs(props);
const imageUrl = ref<string | null>(null);
const garmentLocation = computed(() => garment.value.location ?? "Wardrobe");
const garmentSize = computed(
  () => garment.value.size?.toLowerCase() ?? "unknown"
);

watch(
  garment,
  (newGarment: Garment) => {
    const { data } = supabase.storage
      .from("clothes-images")
      .getPublicUrl(newGarment.photo ?? "");

    imageUrl.value = data.publicUrl;
  },
  { immediate: true }
);

const removeGarment = async () => {
  try {
    await clothesStore.removeGarment(garment.value.id);
    alertsStore.success("Success, your garment was removed");
  } catch (error) {
    alertsStore.error("An error occurred while removing your garment");
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
    top: 0.5rem;
    right: 0.15rem;
    z-index: 15;
    opacity: 0;
    transition: opacity 0.45s ease;
  }

  .card__options-menu {
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
      height: 75%;

      img {
        height: 95%;
      }
    }
  }

  .card__details {
    transition: all 0.5s ease;

    img {
      height: 100%;
      width: auto;
      transition: all 1s ease;
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
