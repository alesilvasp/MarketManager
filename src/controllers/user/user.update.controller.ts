import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { userUpdateService } from "../../services/user";

export const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { body } = req;

    const userUpdate = await userUpdateService(user_id, body);

    const { password, ...safeUser } = userUpdate;

    return res.status(201).json(safeUser);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
  }
};
