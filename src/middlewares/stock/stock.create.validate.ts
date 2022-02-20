import { Request, Response, NextFunction } from "express";
import { IStockProduct } from "../../interfaces/stock";
import { SchemaOf } from "yup";

export const validateNewStockProduct =
  (schema: SchemaOf<IStockProduct>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const toStock = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.toStock = toStock;

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
