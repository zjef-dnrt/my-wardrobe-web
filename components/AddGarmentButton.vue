<template>
  <button
    class="tw-px-5 tw-py-2 tw-rounded-md tw-border-helioGray-700 tw-border-2 tw-text-sm hover:tw-shadow-md tw-text-helioGray-700 hover:tw-border-transparent tw-duration-500 hover:tw-bg-helioGray-700 hover:tw-text-mistyRose-600 tw-transition-all tw-border-dashed"
    @click="dialogOpen = true"
  >
    ADD GARMENT
  </button>
  <el-dialog
    v-model="dialogOpen"
    :title="`Add a new Garment to ${props.categoryName}`"
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
      @change="onChangeInput"
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
    <template #footer class="dialog-footer">
      <el-button @click="dialogOpen = false">Cancel</el-button>
      <el-button type="primary" @click="submit(formRef)" :loading="isLoading">
        Add garment
      </el-button>
      <p v-if="uploadStatus" class="tw-text-sm tw-text-mistyRose-800 tw-my-1 tw-italic">{{ uploadStatus }}</p>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import type { Garment } from "@/types/models";

const props = defineProps<{
  categoryName: string;
}>();

const user = useSupabaseUser();
const clothesStore = useClothesStore();
const alertsStore = useAlertsStore();
const { resizeImage, uploadStatus, formatImageAndUpload } = useImageHandler();

const dialogOpen = ref(false);
const isLoading = ref(false);
const photoUrl = ref<string | null>(null);

interface RuleForm {
  brand: string;
  color: string;
  size: string;
  purchase_date: Date;
  remark: string;
}

const formRef = ref<FormInstance>();
const form = reactive<RuleForm>({
  brand: "",
  color: "",
  size: "",
  purchase_date: new Date(),
  remark: "",
});

const rules = reactive<FormRules<RuleForm>>({
  brand: [
    { required: true, message: "This field is required", trigger: "blur" },
  ],
  color: [
    { required: true, message: "This field is required", trigger: "blur" },
  ],
});

const submit = async (formEl?: FormInstance) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (!valid) return;

    isLoading.value = true;

    const imageBucketKey = await formatImageAndUpload();
    const newGarment: Garment = {
      ...form,
      user_id: user.value!.id,
      category: props.categoryName,
      photo: imageBucketKey,
    };
    handleAddGarment(newGarment);
  });
};

const resetForm = (formEl?: FormInstance) => {
  if (!formEl) return;
  formEl.resetFields();
};

const onChangeInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    photoUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
  resizeImage(file);
};

const handleAddGarment = async (newGarment: Garment) => {
  try {
    await clothesStore.addGarment(newGarment);
    alertsStore.success("Garment added successfully");
    dialogOpen.value = false;
  } catch (error) {
    alertsStore.error("Error adding garment");
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
