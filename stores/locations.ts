import { defineStore } from "pinia";
import type { Database } from "@/types/supabase";
import type { Location } from "@/types/models";

export const useLocationsStore = defineStore("locations", () => {
  const supabase = useSupabaseClient<Database>();

  const locations = ref<Location[]>([]);

  const getLocationByName = (locationName: string): Location =>
    locations.value.find((c) => c.name.toLowerCase() === locationName.toLowerCase())!;

  const fetchLocations = async () => {
    const { data, error, status } = await supabase
      .from("locations")
      .select();
    if (error && status !== 406) throw error;

    locations.value = data!;
  }

  const addLocation = async (newLocation: Location) => {
    const { error } = await supabase.from("locations").insert(newLocation);
    if (error) throw error;

    locations.value.push(newLocation);
  }

  const updateLocation = async (
    name: string,
    updatedLocationData: Partial<Location>
  ) => {
    const { error } = await supabase
      .from("locations")
      .update(updatedLocationData)
      .match({ name });
    if (error) throw error;

    const index = locations.value.findIndex((c) => c.name === name);
    locations.value[index] = Object.assign(
      {},
      locations.value[index],
      updatedLocationData
    );
  }

  const removeLocation = async (name: string) => {
    const { error } = await supabase
      .from("locations")
      .delete()
      .match({ name });
    if (error) throw error;

    const index = locations.value.findIndex((c) => c.name === name);
    locations.value.splice(index, 1);
  }

  return {
    locations,
    getLocationByName,
    fetchLocations,
    addLocation,
    updateLocation,
    removeLocation,
  };
});
