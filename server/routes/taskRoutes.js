import express from "express";
import {
  createTask,
  getTaskById,
  getTasksByStatus,
  updateTaskStatus,
  updateAssignee,
  updateTitle,
  updateDescription,
  updateDue,
  deleteTaskById,
} from "../controllers/Task.js";

const router = express.Router();

router.post("/new", createTask);
router.get("/:id", getTaskById);
router.get("/status/:status/:filter?", getTasksByStatus);
router.patch("/update/status/:id", updateTaskStatus);
router.patch("/update/assignee/:id", updateAssignee);
router.patch("/update/title/:id", updateTitle);
router.patch("/update/desc/:id", updateDescription);
router.patch("/update/due/:id", updateDue);
router.delete("/delete/:id", deleteTaskById);

export default router;