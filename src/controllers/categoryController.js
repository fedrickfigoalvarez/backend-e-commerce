import { getAllCategories } from "../services/categoryService.js";

/**
 * GET /api/categories
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data kategori",
    });
  }
};

