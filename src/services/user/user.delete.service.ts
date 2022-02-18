import { getRepository } from "typeorm";
import { ErrorHandler } from "../../errors/errorHandler";
import { User } from "../../entities";

export const userDeleteService = async (user_id: string) => {
  const userRepository = getRepository(User);

  const userToDelete = await userRepository.findOne(user_id);

  if (!userToDelete) {
    throw new ErrorHandler(404, "User not found!");
  }

  await userRepository.remove([userToDelete]);
};
