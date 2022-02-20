import { Request, Response, NextFunction } from "express";
import { IUpdateStockProduct } from "../../interfaces/stock";
import { SchemaOf } from "yup";

export const validateUpdateStockProduct =
  (schema: SchemaOf<IUpdateStockProduct>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: object = req.body;

      try {
        const stockData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.stockUpdate = stockData;

        return next();
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      return next(err);
    }
  };
