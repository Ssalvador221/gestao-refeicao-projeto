import { Router } from "express";
import UserController from "../../controller/UserController.js";

const user = new UserController();
const router = Router();

router.get("/user", user.getAll);
router.get("/user/:id", user.getUserByID)
router.post("/user", user.create);
router.put("/user/:id", user.update);
router.delete("/user/:id", user.delete);


export default router;