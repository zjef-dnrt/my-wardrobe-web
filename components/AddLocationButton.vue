<template>
  <font-awesome-icon
    icon="plus"
    class="tw-text-helioGray-800 hover:tw-cursor-pointer"
    @click="dialogOpen = true"
  />
  <el-dialog
    v-model="dialogOpen"
    title="Add a new Location"
    @opened="nameRef?.focus()"
    @closed="resetForm(formRef)"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="Location name" prop="locationName">
        <el-input
          ref="nameRef"
          v-model="form.locationName"
          placeholder="e.g. Wardrobe upstairs, travel bag, ..."
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogOpen = false">Cancel</el-button>
      <el-button type="primary" :loading="isLoading" @click="submit(formRef)">
        Add location
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import type { Location } from "@/types/models";

const user = useSupabaseUser();
const alertsStore = useAlertsStore();
const locationsStore = useLocationsStore();

const dialogOpen = ref(false);
const isLoading = ref(false);

interface RuleForm {
  locationName: string;
}
const formRef = ref<FormInstance>();
const nameRef = ref<HTMLInputElement>();
const form = reactive<RuleForm>({
  locationName: "",
});

const validateName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please enter a location name"));
  } else {
    const alreadyExists = locationsStore.getLocationByName(value);

    // Prevent the user from creating a location with the name "wardrobe"
    value.toLowerCase() === "wardrobe" &&
      callback(new Error("You already have a wardrobe, this name is reserved"));

    // Prevent the user from creating a location with the same name as an already existing location
    alreadyExists &&
      callback(new Error("A location with this name already exists"));

    callback();
  }
};

const rules = reactive<FormRules<RuleForm>>({
  locationName: [{ validator: validateName, trigger: "blur" }],
});

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (!valid) return;

    isLoading.value = true;

    const newCategory: Location = {
      name: form.locationName.toLowerCase(),
      user_id: user.value!.id,
    };
    handleAddCategory(newCategory);
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const handleAddCategory = async (newLocation: Location) => {
  try {
    await locationsStore.addLocation(newLocation);
    alertsStore.success("Category added successfully");
    dialogOpen.value = false;
    navigateTo(`/${newLocation.name}`);
  } catch (error) {
    alertsStore.error(`Error adding category ${newLocation.name}`);
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
