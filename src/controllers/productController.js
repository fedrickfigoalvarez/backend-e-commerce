import { getAllProducts, getProductById } from "../services/productService.js";

/**
 * GET /api/products
 * Query params: ?category_id=xxx&search=keyword
 */
export const getProducts = async (req, res) => {
  try {
    const { category_id, search } = req.query;
    const products = await getAllProducts({ category_id, search });

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data produk",
    });
  }
};

/**
 * GET /api/products/:id
 */
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Produk tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    // Supabase .single() throws PGRST116 jika tidak ditemukan
    if (error.code === "PGRST116") {
      return res.status(404).json({
        status: "error",
        message: "Produk tidak ditemukan",
      });
    }

    console.error("Error fetching product:", error.message);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil detail produk",
    });
  }
};
