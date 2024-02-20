import type { Tables } from "@/types/supabase";

export type Category = Tables<"categories">;
export type Location = Tables<"locations">;
export type Garment = Tables<"clothes">;

export type WheelItem = {
  id: number;
  garment: Garment;
  htmlContent: string;
  background: string;
};
