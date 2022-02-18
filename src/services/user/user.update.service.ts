import { getRepository } from "typeorm";
import { ErrorHandler } from "../../errors/errorHandler";
import { User } from "../../entities";

export const userUpdateService = async (user_id: string, data: any) => {
  const userRepository = getRepository(User);

  const userToUpdate = await userRepository.findOne(user_id);

  if (!userToUpdate) {
    throw new ErrorHandler(404, "User not found!");
  }

  if ("isAdm" in data || "logs" in data) {
    throw new ErrorHandler(401, "isAdm and logs fields cannot be changed!");
  }

  if ("password" in data) {
    throw new ErrorHandler(401, "To change password, access recover page")
  }

  return await userRepository.save({ ...userToUpdate, ...data });
};
