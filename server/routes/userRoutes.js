import express from "express";
import {
  createUser,
  getUser,
  findUsernameByToken,
  getAllUsers,
} from "../controllers/User.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", getUser);
router.get("/:token", findUsernameByToken);

export default router;