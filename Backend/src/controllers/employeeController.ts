import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const { page = "1", search = "" } = req.query;
    const take = 10;
    const skip = (parseInt(page as string) - 1) * take;

    const employees = await prisma.employee.findMany({
      where: {
        name: {
          contains: search as string,
          mode: "insensitive",
        },
      },
      skip,
      take,
      orderBy: { id: "asc" },
    });
    const total = await prisma.employee.count({
      where: {
        name: {
          contains: search as string,
          mode: "insensitive",
        },
      },
    });
    return res.status(200).json({
      code: 200,
      status: "succes",
      data: employees || [],
      pagination: {
        total,
        page: parseInt(page as string),
        totalPage: Math.ceil(total / take),
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal Server error",
      error,
    });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, department, position } = req.body;

    if (!name || !email || !department || !position) {
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "All fields are required",
      });
    }

    const checkEmail = await prisma.employee.findUnique({ where: { email } });
    if (checkEmail) {
      return res.status(400).json({
        code: 400,
        status: "Failed",
        message: "Email already exists",
      });
    }

    const employee = await prisma.employee.create({
      data: { name, email, department, position },
    });

    return res.status(201).json({
      code: 201,
      status: "Success",
      message: "Employee created successfully",
      data: employee,
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
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, department, position } = req.body;

    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!employee) {
      return res.status(404).json({
        code: 404,
        status: "Failed",
        message: "Employee not found",
      });
    }

    const updated = await prisma.employee.update({
      where: { id: Number(id) },
      data: { name, email, department, position },
    });

    return res.status(200).json({
      code: 200,
      status: "Success",
      message: "Employee updated successfully",
      data: updated || [],
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
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!employee) {
      return res.status(404).json({
        code: 404,
        status: "Failed",
        message: "Employee not found",
      });
    }

    await prisma.employee.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      code: 200,
      status: "Success",
      message: "Employee deleted successfully",
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
