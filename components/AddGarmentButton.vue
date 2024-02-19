<template>
  <button
    class="tw-px-5 tw-py-2 tw-rounded-md tw-border-helioGray-700 tw-border-2 tw-text-sm hover:tw-shadow-md tw-text-helioGray-700 hover:tw-border-transparent tw-duration-500 hover:tw-bg-helioGray-700 hover:tw-text-mistyRose-600 tw-transition-all tw-border-dashed"
    @click="dialogOpen = true"
  >
    ADD GARMENT
  </button>
  <client-only>
    <el-dialog
      v-model="dialogOpen"
      :title="`Add a new garment to ${props.categoryName}`"
      @closed="resetForm(formRef)"
    >
      <div
        class="tw-w-24 tw-h-24 tw-mb-2 tw-mx-auto tw-shadow-md tw-justify-self-center tw-rounded-full tw-flex tw-justify-center tw-items-center tw-overflow-hidden"
      >
        <font-awesome-icon
          v-if="!photoUrl"
          icon="image"
          class="tw-text-5xl tw-text-mistyRose-800"
        />
        <NuxtImg
          v-else
          :src="photoUrl"
          placeholder
          class="tw-object-cover tw-w-full tw-h-full"
          alt="garment"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        class="tw-mb-2"
        @change="onChangeImage"
      />
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="Brand" prop="brand">
          <el-input
            v-model="form.brand"
            placeholder="e.g. New Balance"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Color" prop="color">
          <el-input
            v-model="form.color"
            placeholder="e.g. Blue"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Size" prop="size">
          <el-input
            v-model="form.size"
            placeholder="e.g. Small"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Purchase date" prop="purchase_date">
          <el-date-picker
            v-model="form.purchase_date"
            type="date"
            placeholder="Pick a date"
            format="DD-MM-YYYY"
            class="tw-w-full"
          />
        </el-form-item>
        <el-form-item label="Remark" prop="remark">
          <el-input
            type="textarea"
            v-model="form.remark"
            placeholder="e.g. Bought on sale"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
    <el-checkbox v-model="removeBackgroundOfImage" label="Remove the background of the image before uploading" size="large" />

      <template #footer>
        <el-button @click="dialogOpen = false">Cancel</el-button>
        <el-button type="primary" @click="submit(formRef, removeBackgroundOfImage)" :loading="isLoading">
          Add garment
        </el-button>
        <p
          v-if="imageUploadStatus"
          class="tw-text-sm tw-text-mistyRose-800 tw-my-1 tw-italic"
        >
          {{ imageUploadStatus }}
        </p>
      </template>
    </el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";

const props = defineProps<{
  categoryName: string;
}>();

const dialogOpen = ref(false);
const removeBackgroundOfImage = ref(true);
const formRef = ref<FormInstance>();

const closeDialog = () => {
  dialogOpen.value = false;
};

const {
  form,
  photoUrl,
  rules,
  submit,
  imageUploadStatus,
  isLoading,
  resetForm,
  onChangeImage,
} = useGarmentForm(closeDialog, undefined, props.categoryName);
</script>
