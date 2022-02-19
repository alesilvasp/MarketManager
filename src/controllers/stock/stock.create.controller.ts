import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { stockCreateService } from "../../services/stock";

export const stockCreateController = async (req: Request, res: Response) => {
  try {
    const { toStock } = req;

    const stockProduct = await stockCreateService(toStock);

    return res.status(201).json(stockProduct);
  } catch (err) {
    if (err instanceof ErrorHandler) {
      handleError(err, res);
    }
  }
};
