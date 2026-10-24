import supabase from "../lib/supabase.js";

/**
 * Ambil semua produk aktif dengan filter opsional
 * @param {Object} filters
 * @param {string} [filters.category_id] - Filter berdasarkan kategori
 * @param {string} [filters.search] - Pencarian berdasarkan nama produk
 */
export const getAllProducts = async ({ category_id, search } = {}) => {
  let query = supabase
    .from("products")
    .select("*, categories(id, name)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (category_id) {
    query = query.eq("category_id", category_id);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

/**
 * Ambil detail produk berdasarkan ID
 * @param {string} id - UUID produk
 */
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

