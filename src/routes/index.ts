import express from "express";
import userRoutes from "./user-routes.js";
import categoryRoutes from "./category-routes.js";

const router = express.Router();

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/category", categoryRoutes);

router.get("/", (req, res) => {
  res.json("Welcome in my server");
});

export default router;