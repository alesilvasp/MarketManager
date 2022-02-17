import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/errorHandler";
import { userCreateService } from "../../services/index";

class userCreateController {
  async handle(req: Request, res: Response) {
    try {
      const { new_user } = req;

      const userCreate = new userCreateService();

      const newUser = await userCreate.execute(new_user);

      const { password, ...safeUser } = newUser;

      return res.status(201).json(safeUser);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        handleError(error, res);
      }
    }
  }
}

export default userCreateController;
