import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { userCreateService } from "../../services/user/index";

export const userCreateController = async (req: Request, res: Response) => {
  try {
    const { new_user } = req;

    const userCreate = await userCreateService(new_user);

    const { password, ...safeUser } = userCreate;

    return res.status(201).json(safeUser);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      handleError(error, res);
    }
  }
};
