import { Router } from "express";
import UserController from "../../controller/UserController.js";

const user = new UserController();
const router = Router();

// GET
router.get("/user", user.getAll); // GET ALL Users
router.get("/user/:id", user.getUserByID); // GET ONE User by id

// POST
router.post("/user", user.create); // CREATE a new User

// PUT
router.put("/user/:id", user.update); // UPDATE User

// DELETE
router.delete("/user/:id", user.delete); // DELETE a User

export default router;