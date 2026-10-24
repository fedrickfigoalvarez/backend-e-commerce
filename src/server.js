import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Rez-E-Commerce API is running",
  });
});

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Rez-E-Commerce API running at http://localhost:${PORT}`);
});
