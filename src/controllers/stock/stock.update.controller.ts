import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { stockUpdateService } from "../../services/stock";

export const stockUpdateController = async (req: Request, res: Response) => {
  try {
    const { stock_id } = req.params;
    const data = req.body;

    const updatedInStock = await stockUpdateService(stock_id, data);

    return res.status(200).json({ updated: updatedInStock });
  } catch (err) {
    if (err instanceof ErrorHandler) {
      handleError(err, res);
    }
  }
};
