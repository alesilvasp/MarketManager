import { NextFunction, Request, Response } from "express";
import { userDeleteService } from "../../services/user";

export const userDeleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.params;

    const userToDelete = await userDeleteService(user_id);

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
