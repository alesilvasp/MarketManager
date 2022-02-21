import { getRepository } from "typeorm";
import { User } from "../../entities";
import AppError from "../../errors/appError";

export const userDeleteService = async (user_id: string) => {
  try {
    const userRepository = getRepository(User);

    const userToDelete = await userRepository.findOne(user_id);

    await userRepository.remove([userToDelete!]);
  } catch (error) {
    throw new AppError("User not found!", 404);
  }
};
