import { defineStore } from "pinia";
import type { Database } from "@/types/supabase";
import type { Garment } from "@/types/models";

const populateGarmentPhotoURL = (supabase: any, user: any, garment: Garment) => {
  if (!garment.photo) return;
  const { data } = supabase.storage
    .from("clothes-images")
    .getPublicUrl(`${user.value!.id}/${garment.photo}`);

  garment.photoURL = data.publicUrl;
};

export const useClothesStore = defineStore("clothes", () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient<Database>();

  const { $pinia } = useNuxtApp();
  const categoriesStore = useCategoriesStore($pinia);

  const clothes = ref<Garment[]>([]);

  const getGarmentById = (id: number) => clothes.value.find((c) => c.id === id);
  const getClothesInCategory = (categoryName: string) =>
    clothes.value.filter((c) => c.category === categoryName);
  const getClothesInLocation = (locationName: string) =>
    clothes.value.filter((c) => c.location && c.location === locationName);

  const fetchClothes = async () => {
    const { data, error, status } = await supabase.from("clothes").select();
    if (error && status !== 406) throw error;

    

    data!.forEach((garment) => populateGarmentPhotoURL(supabase, user, garment));
    clothes.value = data!;
  };

  const addGarment = async (newGarment: Garment) => {
    const { error } = await supabase.from("clothes").insert(newGarment);
    if (error) throw error;

    clothes.value.push(newGarment);

    // Increment the count of the category
    const category = categoriesStore.getCategoryByName(newGarment.category!);
    categoriesStore.updateCategory(category.name, {
      clothes_amount: category.clothes_amount + 1,
    });
  };

  const updateGarment = async (
    id: number,
    updatedGarmentData: Partial<Garment>
  ) => {
    const { error } = await supabase
      .from("clothes")
      .update(updatedGarmentData)
      .match({ id });
    if (error) throw error;

    const index = clothes.value.findIndex((c) => c.id === id);
    clothes.value[index] = Object.assign(
      {},
      clothes.value[index],
      updatedGarmentData
    );
  };

  const removeGarment = async (id: number) => {
    const { error } = await supabase.from("clothes").delete().match({ id });
    if (error) throw error;

    const garment = getGarmentById(id);
    if (!garment) return;

    clothes.value = clothes.value.filter((c) => c.id !== id);

    // Decrement the count of the category
    const category = categoriesStore.getCategoryByName(garment.category!);
    categoriesStore.updateCategory(category.name, {
      clothes_amount: category.clothes_amount - 1,
    });
  };

  return {
    clothes,
    getGarmentById,
    getClothesInCategory,
    getClothesInLocation,
    fetchClothes,
    addGarment,
    updateGarment,
    removeGarment,
  };
});
