import { UserRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/errorHandler";

class userUpdateService {
  async execute(user_id: string, data: any) {
    const userRepository = getCustomRepository(UserRepository);

    const userToUpdate = await userRepository.findOne(user_id);

    if (!userToUpdate) {
      throw new ErrorHandler(404, "User not found!");
    }

    if ("isAdm" in data) {
      throw new ErrorHandler(401, "isAdm field cannot be changed!");
    }

    return await userRepository.save({ ...userToUpdate, ...data });
  }
}

export default userUpdateService