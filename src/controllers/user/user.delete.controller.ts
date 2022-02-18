import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { userDeleteService } from "../../services/user";

class userDeleteController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const userToDelete = new userDeleteService();

      const user = await userToDelete.execute(user_id);

      return res.status(200).json();
    } catch (error) {
      if (error instanceof ErrorHandler) {
        handleError(error, res);
      }
    }
  }
}

export default userDeleteController;