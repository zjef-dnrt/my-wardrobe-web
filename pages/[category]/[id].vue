<template>
  <NuxtImg
    :src="photoUrl"
    placeholder
    fit="contain"
    class="gradient-bg tw-border-helioGray-700 tw-border-2 tw-rounded-md tw-shadow-md"
  />
  <div v-if="garment" class="tw-my-2 tw-flex tw-flex-col">
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
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const route = useRoute();
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const clothesStore = useClothesStore();

const garment = computed(() => clothesStore.getGarmentById(+route.params.id));
const photoUrl = ref<string>("");

watch(
  () => route.params.id,
  async (id) => {
    const { data } = supabase.storage
      .from("clothes-images")
      .getPublicUrl(`${user.value!.id}/${garment.value!.photo}`);

    photoUrl.value = data.publicUrl;
  },
  { immediate: true }
);
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