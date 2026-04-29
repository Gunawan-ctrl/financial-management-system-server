import express from "express";
import controllers from "../controllers/user-controller.ts";
import authenticateToken from "../middlewares/authenticateToken.ts";

const router = express.Router();

router.post("/register", controllers.create);
router.post("/login", controllers.login);

router.use(authenticateToken);

router.get("/", controllers.getAll);
router.get("/:id", controllers.getById);
router.put("/:id", controllers.updateOne);
router.delete("/:id", controllers.deleteOne);

export default router;