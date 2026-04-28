import express from "express";
import userRoutes from "./user-routes.js";
import stokRoutes from "./stok-routes.js";
import categoryRoutes from "./category-routes.js";
import menuRoutes from "./menu-routes.js";
import bookRoutes from "./book-routes.js"

const router = express.Router();

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/stok", stokRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/menu", menuRoutes);
router.use("/api/v1/book", bookRoutes);

router.get("/", (req, res) => {
  res.json("Welcome in my server");
});

export default router;
