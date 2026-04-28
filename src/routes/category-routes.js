import express from "express";
import controllers from "../controller/category-controller.js";

const router = express.Router();

router.post("/", controllers.create);
router.get("/", controllers.getAll);
router.get("/:id", controllers.getById);
router.put("/:id", controllers.updateOne);
router.delete("/:id", controllers.deleteOne);

export default router;
