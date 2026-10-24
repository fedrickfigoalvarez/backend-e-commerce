import supabase from "../lib/supabase.js";

/**
 * Ambil semua kategori
 */
export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
};

