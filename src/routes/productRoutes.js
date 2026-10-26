import { Router } from "express";
import { getProducts, getProduct } from "../controllers/productController.js";
import {
  validateIdParam,
  validateCategoryIdQuery,
} from "../middleware/validate.js";

const router = Router();

router.get("/", validateCategoryIdQuery, getProducts);

router.get("/:id", validateIdParam, getProduct);

export default router;
