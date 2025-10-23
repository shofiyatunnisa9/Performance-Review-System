import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const getReviewsByEmployee = async (req: Request, res: Response) => {
  try {
    const employeeId = Number(req.params.id);

    const reviews = await prisma.review.findMany({
      where: { employeeId },
      orderBy: { reviewDate: "desc" },
    });

    res.status(200).json({
      code: 200,
      status: "Success",
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal server error",
      error,
    });
  }
};
export const createReview = async (req: Request, res: Response) => {
  try {
    const employeeId = Number(req.params.id);
    const { review_date, score, comments } = req.body;

    if (!review_date || !score) {
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "review_date dan score wajib diisi",
      });
    }

    if (score < 1 || score > 10) {
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "Score harus antara 1 - 10",
      });
    }

    const review = await prisma.review.create({
      data: {
        employeeId,
        reviewDate: new Date(review_date),
        score,
        comments,
      },
    });

    res.status(201).json({
      code: 201,
      status: "Success",
      message: "Review berhasil dibuat",
      data: review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal server error",
      error,
    });
  }
};

//  Dashboard (average score per employee)
export const getAverageScores = async (req: Request, res: Response) => {
  try {
    const averages = await prisma.review.groupBy({
      by: ["employeeId"],
      _avg: { score: true },
    });

    const results = await Promise.all(
      averages.map(async (avg) => {
        const employee = await prisma.employee.findUnique({
          where: { id: avg.employeeId },
          select: { name: true },
        });
        return {
          employeeId: avg.employeeId,
          name: employee?.name,
          averageScore: avg._avg.score,
        };
      })
    );

    res.status(200).json({
      code: 200,
      status: "Success",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal server error",
      error,
    });
  }
};
