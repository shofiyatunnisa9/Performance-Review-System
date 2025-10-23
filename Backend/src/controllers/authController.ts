import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/db.js";

//register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, passwordHash } = req.body;

    const checkEmail = await prisma.user.findUnique({ where: { email } });
    if (checkEmail) {
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "Email alredy registed!",
      });
    }

    const hashpassword = await bcrypt.hash(passwordHash, 10);

    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashpassword },
    });

    return res.status(201).json({
      code: 201,
      status: "Succes",
      message: " Succes register",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal server error",
      error,
    });
  }
};

//login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, passwordHash } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "Invalid email or password",
      });
    }

    const checkPassword = await bcrypt.compare(passwordHash, user.passwordHash);
    if (!checkPassword) {
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      code: 200,
      status: "Succes",
      message: "Login Succes",
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "Error", message: "Internal server error" });
  }
};
