import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import { cashierCreateService } from "../../services/cashier";

export const cashierCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req

    if (typeof body.balance !== "number") {
      throw new AppError("balance must be a number", 400);
    }
    const cashierCreate = await cashierCreateService(body);

    return res.status(201).json(cashierCreate);
  } catch (error) {
    next(error);
  }
};