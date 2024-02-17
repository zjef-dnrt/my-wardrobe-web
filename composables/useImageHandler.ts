import loadImage, { type LoadImageResult } from "blueimp-load-image";
import { removeBackground } from "@imgly/background-removal";
import { uuid } from "@/util/string";

const IMAGE_FORMAT = 'webp';

export default function () {
  const resizedImage = ref<LoadImageResult | null>(null);
  const uploadStatus = ref<string>("");

  // Resize the image for better performance in photoroom
  const resizeImage = async (image: Blob) => {
    resizedImage.value = await loadImage(image, {
      maxWidth: 500,
      maxHeight: 500,
      canvas: true,
    });
  };

  const formatImageAndUpload = async () => {
    const imageNoBg = await removeImageBackground();
    const bucketObjectRef = await uploadImage(uuid(), imageNoBg);

    // Remove the bucket name from the path
    return bucketObjectRef!.path.split('/').slice(1).join('/');
  };

  const removeImageBackground = async (): Promise<Blob> =>
    new Promise((resolve) => {
      uploadStatus.value = "(1/2) Removing image background...";
      const image = resizedImage.value!.image as HTMLCanvasElement;

      image.toBlob(async (inputBlob) => {
        if (!inputBlob) return;
        const imgBlob = await removeBackground(inputBlob, {
          output: {
            format: `image/${IMAGE_FORMAT}`,
          }
        })
        uploadStatus.value = "";
        resolve(imgBlob);
      });
    });

  const uploadImage = async (imageId: string, imageNoBg: Blob) => {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const alertStore = useAlertsStore();

    uploadStatus.value = "(2/2) Uploading image...";

    try {
      const { data, error } = await supabase.storage
        .from("clothes-images")
        .upload(`${user.value!.id}/${imageId}.${IMAGE_FORMAT}`, imageNoBg, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) throw error;
      uploadStatus.value = "";
      return data;
    } catch (error) {
      alertStore.error("Failed to upload image, try again later.");
    }
  };

  return {
    resizeImage,
    uploadStatus,
    formatImageAndUpload,
  };
};
