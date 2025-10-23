import express from "express";
import {
  createReview,
  getAverageScores,
  getReviewsByEmployee,
} from "../controllers/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id/reviews", authMiddleware, getReviewsByEmployee);
router.post("/:id/reviews", authMiddleware, createReview);
router.get("/dashboard/averages", authMiddleware, getAverageScores);

export { router as reviewsRoute };
