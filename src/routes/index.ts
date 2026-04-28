import express from "express";
import userRoutes from "./user-routes.ts";
import categoryRoutes from "./category-routes.ts";
import transactionRoutes from "./transaction-routes.ts";

const router = express.Router();

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/transaction", transactionRoutes);
router.get("/", (req, res) => {
  res.json("Welcome in my server");
});

export default router;