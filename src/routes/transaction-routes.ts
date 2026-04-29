import express from "express";
import controllers from "../controllers/transaction-controller.ts";
import authenticateToken from "../middlewares/authenticateToken.ts";

const router = express.Router();

router.use(authenticateToken);

router.post("/", controllers.create);
router.get("/", controllers.getAll);
router.get("/:id", controllers.getById);
router.put("/:id", controllers.updateOne);
router.delete("/:id", controllers.deleteOne);

export default router;