import { Router } from "express";
import UserController from "../../controller/UserController.js";

const user = new UserController();
const router = Router();

router.get("/user", (req, res) => user.getAll(req, res));
router.get("/user/:id", user.getUserByID)
router.post("/user", (req, res) => user.create(req, res));

export default router;