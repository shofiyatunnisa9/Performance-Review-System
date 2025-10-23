import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

interface JwtPayload {
  userId: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        code: 401,
        status: "Unauthorized",
        message: "No token provided",
      });
    }
    const token: any = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    (req as any).userId = decoded.userId;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ code: 401, status: "Error", message: "Invalid token" });
  }
};
