import { UserRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/errorHandler";


class userDeleteService {
  async execute (user_id: string) {
    const userRepository = getCustomRepository(UserRepository);

    const userToDelete = await userRepository.findOne(user_id);

    if (!userToDelete) {
      throw new ErrorHandler(404, "User not found!");
    }

    await userRepository.remove([userToDelete])

    
  }
}

export default userDeleteService