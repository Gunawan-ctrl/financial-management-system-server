import express from "express";
import controllers from "../controller/user-controller.js";
// import validateObjectId from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post("/register", controllers.create);
router.post("/login", controllers.login);
router.get("/", controllers.getAll);
router.get("/:id", controllers.getById);
router.put("/:id", controllers.updateOne);
router.delete("/:id", controllers.deleteOne);

export default router;
