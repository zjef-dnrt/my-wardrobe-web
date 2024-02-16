import { defineStore } from "pinia";
import type { Database } from "@/types/supabase";
import type { Category } from "@/types/models";

export const useCategoriesStore = defineStore("categories", () => {
  const supabase = useSupabaseClient<Database>();

  const categories = ref<Category[]>([]);

  const getCategoryByName = (categoryName: string): Category =>
    categories.value.find(
      (c) => c.name.toLowerCase() === categoryName.toLowerCase()
    )!;

  const fetchCategories = async () => {
    const { data, error, status } = await supabase
      .from("categories")
      .select("*");
    if (error && status !== 406) throw error;

    categories.value = data!;
  };

  const addCategory = async (newCategory: Category) => {
    const { error } = await supabase.from("categories").insert(newCategory);
    if (error) throw error;

    categories.value.push(newCategory);
  };

  const updateCategory = async (
    name: string,
    updatedCategoryData: Partial<Category>
  ) => {
    const { error } = await supabase
      .from("categories")
      .update(updatedCategoryData)
      .match({ name });
    if (error) throw error;

    const index = categories.value.findIndex((c) => c.name === name);
    categories.value[index] = Object.assign(
      {},
      categories.value[index],
      updatedCategoryData
    );
  };

  const removeCategory = async (name: string) => {
    const { error } = await supabase
      .from("categories")
      .delete()
      .match({ name });
    if (error) throw error;

    categories.value = categories.value.filter((c) => c.name !== name);
  };

  return {
    categories,
    getCategoryByName,
    fetchCategories,
    addCategory,
    updateCategory,
    removeCategory,
  };
});
