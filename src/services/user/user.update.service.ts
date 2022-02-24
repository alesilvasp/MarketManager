import { getRepository } from "typeorm";
import { User } from "../../entities";
import AppError from "../../errors/appError";

export const userUpdateService = async (user_id: string, data: any) => {
  const userRepository = getRepository(User);
  try {
    const userToUpdate = await userRepository.findOne(user_id);

    if ("isAdm" in data || "logs" in data) {
      throw new AppError("isAdm and logs fields cannot be changed!", 401);
    }

    if ("password" in data) {
      throw new AppError("To change password, access recover page", 401);
    }

    return await userRepository.save({ ...userToUpdate, ...data });
  } catch (error) {
    if ((error as any).code === "22P02") {
      throw new AppError("User not found!", 404);
    }
    throw new AppError((error as any).message, (error as any).statusCode);
  }
};
