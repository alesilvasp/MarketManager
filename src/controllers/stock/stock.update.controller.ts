import { Request, Response, NextFunction } from "express";
import { stockUpdateService } from "../../services/stock";

export const stockUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stock_id } = req.params;
    const stockUpdated = await stockUpdateService(stock_id, req.body);

    return res.status(200).json({ updated: stockUpdated });
  } catch (err) {
    next(err);
  }
};
