import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { userUpdateService } from "../../services/user";

class userUpdateController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { body } = req

      const userUpdate = new userUpdateService();

      const user = await userUpdate.execute(user_id, body);

      const { password, ...safeUser } = user;

      return res.status(201).json(safeUser);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        handleError(error, res);
      }
    }
  }
}

export default userUpdateController;