import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/employees", authMiddleware, getEmployees);
router.post("/employees", authMiddleware, createEmployee);
router.put("/employees/:id", authMiddleware, updateEmployee);
router.delete("/employees/:id", authMiddleware, deleteEmployee);

export { router as employeesRoute };
