import { defineStore } from "pinia";
import type { Database } from "@/types/supabase";
import type { Garment } from "@/types/models";

export const useClothesStore = defineStore("clothes", () => {
  const supabase = useSupabaseClient<Database>();

  const clothes = ref<Garment[]>([]);

  const getGarmentById = (id: number) => clothes.value.find((c) => c.id === id);
  const getClothesInCategory = (categoryName: string) => clothes.value.filter((c) => c.category === categoryName);
  const getClothesInLocation = (locationName: string) => clothes.value.filter((c) => c.location && c.location === locationName);

  const fetchClothes = async () => {
    const { data, error, status } = await supabase
      .from("clothes")
      .select();
    if (error && status !== 406) throw error;

    clothes.value = data!;
  }

  const addGarment = async (newGarment: Garment) => {
    const { error } = await supabase.from("clothes").insert(newGarment);
    if (error) throw error;

    clothes.value.push(newGarment);
  }

  const updateGarment = async (id: number, updatedGarmentData: Partial<Garment>) => {
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
  }

  const removeGarment = async (id: number) => {
    const { error } = await supabase
      .from("clothes")
      .delete()
      .match({ id });
    if (error) throw error;

    clothes.value = clothes.value.filter((c) => c.id !== id);
  }

  return {
    clothes,
    getGarmentById,
    getClothesInCategory,
    getClothesInLocation,
    fetchClothes,
    addGarment,
    updateGarment,
    removeGarment
  }
});
