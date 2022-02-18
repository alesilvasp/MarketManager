import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { userDeleteService } from "../../services/user";

export const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const userToDelete = await userDeleteService(user_id);

    return res.status(200).json();
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
  }
};
