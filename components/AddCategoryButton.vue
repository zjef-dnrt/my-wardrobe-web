<template>
  <font-awesome-icon
    icon="plus"
    class="tw-text-helioGray-800 hover:tw-cursor-pointer"
    @click="dialogOpen = true"
  />
  <el-dialog v-model="dialogOpen" title="Add a new Category" @opened="nameRef?.focus()" @closed="resetForm(formRef)">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="Category name" prop="categoryName">
        <el-input
          ref="nameRef"
          v-model="form.categoryName"
          placeholder="e.g. Pants, shirts, ..."
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogOpen = false">Cancel</el-button>
        <el-button type="primary" @click="submit(formRef)">
          Add category
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import type { Category } from "@/types/models";

const dialogOpen = ref(false);

interface RuleForm {
  categoryName: string;
}
const formRef = ref<FormInstance>();
const nameRef = ref<HTMLInputElement>();
const form = reactive<RuleForm>({
  categoryName: "",
});

const validateName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please enter a category name"));
  } else {
    const categoriesStore = useCategoriesStore();
    const alreadyExists = categoriesStore.getCategoryByName(value);
    alreadyExists &&
      callback(new Error("A category with this name already exists"));
    callback();
  }
};

const rules = reactive<FormRules<RuleForm>>({
  categoryName: [{ validator: validateName, trigger: "blur" }],
});

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (!valid) return;

    const user = useSupabaseUser();
    const newCategory: Category = {
      name: form.categoryName,
      clothes_amount: 0,
      user_id: user.value!.id,
    };
    handleAddCategory(newCategory);
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const handleAddCategory = async (newCategory: Category) => {
  const alertsStore = useAlertsStore();
  const categoriesStore = useCategoriesStore();
  try {
    await categoriesStore.addCategory(newCategory);
    alertsStore.success("Category added successfully");
  } catch (error) {
    alertsStore.error("An error occurred while adding the category");
    console.error(error);
  } finally {
    dialogOpen.value = false;
  }
};
</script>