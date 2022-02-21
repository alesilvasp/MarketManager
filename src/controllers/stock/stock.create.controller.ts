import { NextFunction, Request, Response } from "express";
import { stockCreateService } from "../../services/stock";

export const stockCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stockProduct = await stockCreateService(req.body);

    return res.status(201).json(stockProduct);
  } catch (error) {
    next(error);
  }
};
