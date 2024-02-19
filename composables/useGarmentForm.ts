import type { FormInstance, FormRules } from "element-plus";
import type { Garment } from "@/types/models";

interface RuleForm {
  brand: string;
  color: string;
  size: string;
  photo: string;
  purchase_date: Date;
  remark: string;
}

/**
 * Composable to handle the form for adding or updating a garment
 * @param formRef The form instance element
 * @param onSuccess The function to call when the form is submitted successfully
 * @param garment The optional garment to update
 * @param categoryName The category name
 */
export default function (
  onSuccess?: Function,
  garment?: Garment,
  categoryName?: string
) {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const clothesStore = useClothesStore();
  const alertsStore = useAlertsStore();
  const { resizeImage, uploadStatus, formatImageAndUpload } = useImageHandler();

  const isLoading = ref(false);

  // The URL used to display the image in the dialog
  const photoUrl = ref<string | null>(null);

  const form = reactive<RuleForm>({
    brand: garment?.brand ?? "",
    color: garment?.color ?? "",
    size: garment?.size ?? "",
    photo: garment?.photo ?? "",
    purchase_date: garment?.purchase_date
      ? new Date(garment?.purchase_date)
      : new Date(),
    remark: garment?.remark ?? "",
  });

  const rules = reactive<FormRules<RuleForm>>({
    brand: [
      { required: true, message: "This field is required", trigger: "blur" },
    ],
    color: [
      { required: true, message: "This field is required", trigger: "blur" },
    ],
  });

  onBeforeMount(async () => {
    if (!garment) return
    const { data } = supabase.storage
      .from("clothes-images")
      .getPublicUrl(`${user.value!.id}/${garment.photo}`);

    photoUrl.value = data.publicUrl;
  })

  const submit = async (formEl?: FormInstance) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (!valid) return;

      isLoading.value = true;

      const imageBucketKey = await formatImageAndUpload();
      const newGarment: Garment = {
        ...form,
        user_id: user.value!.id,
        category: categoryName ?? garment?.category ?? null,
        ...(imageBucketKey && { photo: imageBucketKey }),
      };

      // If the garment exists, update it, otherwise add it
      if (garment) {
        handleUpdateGarment(newGarment);
      } else {
        handleAddGarment(newGarment);
      }
    });
  };

  const resetForm = (formEl?: FormInstance) => {
    if (!formEl) return;
    formEl.resetFields();

    // Reset the photo URL if it's an add form
    if (!garment) photoUrl.value = null;
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
      onSuccess?.();
    } catch (error) {
      alertsStore.error("Error adding garment");
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleUpdateGarment = async (updatedGarment: Garment) => {
    try {
      await clothesStore.updateGarment(garment!.id!, updatedGarment);
      alertsStore.success("Garment updated successfully");
      onSuccess?.();
    } catch (error) {
      alertsStore.error("Error updating garment");
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    form,
    photoUrl,
    rules,
    submit,
    imageUploadStatus: uploadStatus,
    isLoading,
    resetForm,
    onChangeImage: onChangeInput,
  };
}
