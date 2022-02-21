import { Request, Response, NextFunction } from "express";
import { userCreateService } from "../../services/user/index";

export const userCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCreate = await userCreateService(req.body);

    return res.status(201).json(userCreate);
  } catch (error) {
    next(error);
  }
};
