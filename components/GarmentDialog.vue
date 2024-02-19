<template>
  <el-dialog
    v-model="dialogOpen"
    title="Edit Garment"
    @closed=";[$emit('closed'), resetForm(formRef)]"
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
    <template #footer>
      <el-button @click="dialogOpen = false">Cancel</el-button>
      <el-button type="primary" @click="submit(formRef)" :loading="isLoading">
        Save
      </el-button>
      <p
        v-if="imageUploadStatus"
        class="tw-text-sm tw-text-mistyRose-800 tw-my-1 tw-italic"
      >
        {{ imageUploadStatus }}
      </p>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import type { Garment } from "@/types/models";

const props = defineProps<{
  garment: Garment;
  open: boolean;
}>();

const dialogOpen = ref(props.open);
const formRef = ref<FormInstance>();

watch(() => props.open, (newVal) => dialogOpen.value = newVal);

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
} = useGarmentForm(closeDialog, props.garment);
</script>
