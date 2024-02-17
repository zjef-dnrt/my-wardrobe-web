<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <div class="tw-flex tw-justify-between tw-items-center">
      <h1 class="tw-mb-5 tw-text-mistyRose-800">
        {{ capitalize(categoryName) }}
      </h1>
      <button
        class="tw-bg-helioGray-600 tw-p-3 tw-shadow-md tw-rounded-md"
        @click="dialogOpen = true"
      >
        <font-awesome-icon icon="trash" class="tw-mr-3 tw-text-mistyRose-400" />
        <span class="tw-text-mistyRose-400">Delete category</span>
      </button>
    </div>
    <div class="tw-flex tw-mb-4">
      <AddGarmentButton :category-name="categoryName" />
    </div>
    <section v-if="clothesInCategory.length > 0" class="tw-flex-grow">
      <div
        class="tw-h-full tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 xl:tw-grid-cols-6 tw-gap-6 tw-overflow-y-auto"
      >
        <GarmentCard
          v-for="garment in clothesInCategory"
          :key="garment.id"
          :garment="garment"
        />
      </div>
    </section>
    <section v-else class="tw-flex-grow">
      <p class="tw-text-xl tw-text-mistyRose-800 tw-opacity-75">
        You don't have any clothes added yet!
      </p>
    </section>
  </div>
  <el-dialog v-model="dialogOpen" :title="`Delete category ${categoryName}`">
    <p>Are you sure? This action is irreversable.</p>
    <template #footer class="dialog-footer">
      <el-button @click="dialogOpen = false">Cancel</el-button>
      <el-button type="primary" :loading="isLoading" @click="deleteCategory">
        Delete
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { capitalize } from "@/util/string";

definePageMeta({
  layout: "main",
});

const route = useRoute();
const categoryName = route.params.category as string;

const clothesStore = useClothesStore();
const clothesInCategory = computed(() =>
  clothesStore.getClothesInCategory(categoryName)
);

const dialogOpen = ref(false);
const isLoading = ref(false);

const categoriesStore = useCategoriesStore();
const alertStore = useAlertsStore();

const deleteCategory = async () => {
  try {
    await categoriesStore.removeCategory(categoryName);
    alertStore.success(`Category ${categoryName} deleted`);
  } catch (error) {
    alertStore.error(`Error deleting category ${categoryName}`);
    console.log(error);
  } finally {
    dialogOpen.value = false;
    navigateTo("/wardrobe");
  }
};
</script>
