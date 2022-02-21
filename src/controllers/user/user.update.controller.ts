import { Request, Response, NextFunction } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { userUpdateService } from "../../services/user";

export const userUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.params;
    const { body } = req;

    const userUpdate = await userUpdateService(user_id, body);

    const { password, ...safeUser } = userUpdate;

    return res.status(200).json(safeUser);
  } catch (error) {
    next(error);
  }
};
