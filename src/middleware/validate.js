// Regex UUID v4
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validasi bahwa param :id adalah UUID yang valid.
 * Gunakan di route yang menerima :id.
 */
export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id || !UUID_REGEX.test(id)) {
    return res.status(400).json({
      status: "error",
      message: "ID tidak valid. Harus berupa UUID.",
    });
  }

  next();
};

/**
 * Validasi bahwa query param category_id (jika ada) adalah UUID yang valid.
 */
export const validateCategoryIdQuery = (req, res, next) => {
  const { category_id } = req.query;

  if (category_id && !UUID_REGEX.test(category_id)) {
    return res.status(400).json({
      status: "error",
      message: "category_id tidak valid. Harus berupa UUID.",
    });
  }

  next();
};

/**
 * Factory: validasi field wajib pada req.body.
 * @param {string[]} fields - Nama-nama field yang wajib ada
 */
export const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missing = [];

    for (const field of fields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
      ) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: `Field wajib tidak boleh kosong: ${missing.join(", ")}`,
      });
    }

    next();
  };
};

/**
 * Validasi body untuk membuat produk baru.
 * Field wajib: name, price, stock, category_id
 */
export const validateCreateProduct = (req, res, next) => {
  const { name, price, stock, category_id } = req.body;
  const errors = [];

  // Field wajib
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("name wajib diisi dan berupa teks");
  }

  if (price === undefined || price === null) {
    errors.push("price wajib diisi");
  } else if (typeof price !== "number" || price < 0) {
    errors.push("price harus berupa angka >= 0");
  }

  if (stock === undefined || stock === null) {
    errors.push("stock wajib diisi");
  } else if (!Number.isInteger(stock) || stock < 0) {
    errors.push("stock harus berupa bilangan bulat >= 0");
  }

  if (!category_id) {
    errors.push("category_id wajib diisi");
  } else if (!UUID_REGEX.test(category_id)) {
    errors.push("category_id harus berupa UUID yang valid");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validasi gagal",
      errors,
    });
  }

  // Sanitize: trim nama
  req.body.name = name.trim();
  next();
};

/**
 * Validasi body untuk update produk (partial update via PATCH).
 * Semua field opsional, tapi jika ada harus valid.
 */
export const validateUpdateProduct = (req, res, next) => {
  const { name, price, stock, category_id } = req.body;
  const errors = [];

  // Minimal harus ada 1 field yang dikirim
  const allowedFields = [
    "name",
    "price",
    "stock",
    "category_id",
    "is_active",
    "description",
    "image_url",
  ];
  const sentFields = Object.keys(req.body).filter((key) =>
    allowedFields.includes(key),
  );

  if (sentFields.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Minimal satu field harus dikirim untuk update",
    });
  }

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      errors.push("Name harus berupa teks dan tidak boleh kosong");
    } else {
      req.body.name = name.trim();
    }
  }

  if (price !== undefined) {
    if (typeof price !== "number" || price < 0) {
      errors.push("Price harus berupa angka >= 0");
    }
  }

  if (stock !== undefined) {
    if (!Number.isInteger(stock) || stock < 0) {
      errors.push("Stock harus berupa bilangan bulat >= 0");
    }
  }

  if (category_id !== undefined) {
    if (!UUID_REGEX.test(category_id)) {
      errors.push("category_id harus berupa UUID yang valid");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validasi gagal",
      errors,
    });
  }

  next();
};

/**
 * Validasi body untuk membuat kategori baru.
 * Field wajib: name
 */
export const validateCreateCategory = (req, res, next) => {
  const { name } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("name wajib diisi dan berupa teks");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validasi gagal",
      errors,
    });
  }

  req.body.name = name.trim();
  next();
};

/**
 * Validasi body untuk update kategori (PATCH).
 */
export const validateUpdateCategory = (req, res, next) => {
  const { name } = req.body;
  const errors = [];

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      errors.push("name harus berupa teks dan tidak boleh kosong");
    } else {
      req.body.name = name.trim();
    }
  } else {
    return res.status(400).json({
      status: "error",
      message: "Minimal satu field harus dikirim untuk update",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validasi gagal",
      errors,
    });
  }

  next();
};
