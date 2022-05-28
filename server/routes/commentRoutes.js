import express from "express";
import {
  createComment,
  getCommentsByTaskId,
  deleteCommentById,
} from "../controllers/Comment.js";

const router = express.Router();

router.post("/new", createComment);
router.get("/:task", getCommentsByTaskId);
router.delete("/delete/:id", deleteCommentById);

export default router;