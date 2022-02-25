import { Request, Response, NextFunction } from "express";
import { stockUpdateService } from "../../services/stock";
import AppError from "../../errors/appError";

export const stockUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stock_id } = req.params;
    const { body } = req;

    if (body.stock && typeof body.stock !== "number") {
      throw new AppError("Quantity must be a number.", 400);
    }

    const stockUpdated = await stockUpdateService(stock_id, body);

    return res.status(200).json({ updated: stockUpdated });
  } catch (err) {
    next(err);
  }
};
