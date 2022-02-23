import { NextFunction, Request, Response } from "express";
import { stockCreateService } from "../../services/stock";
import AppError from "../../errors/appError";

export const stockCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    if (typeof body.stock !== "number") {
      throw new AppError("Stock must be a number.", 400);
    }

    const stockProduct = await stockCreateService(body);

    return res.status(201).json(stockProduct);
  } catch (error) {
    next(error);
  }
};
