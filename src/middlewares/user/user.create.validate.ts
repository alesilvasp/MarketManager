import { Request, Response, NextFunction } from "express";
import { IUserCreate } from "../../interfaces/index";
import { SchemaOf } from "yup";

export const validateNewUser =
  (schema: SchemaOf<IUserCreate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.new_user = validatedData;

        next();
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
