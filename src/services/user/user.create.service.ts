import { getRepository } from "typeorm";
import { IUserCreate } from "../../interfaces/user/user.create.interface";
import { User } from "../../entities";
import AppError from "../../errors/appError";

export const userCreateService = async (body: IUserCreate) => {
  const { email, password, name, isAdm } = body;
  try {
    const userRepository = getRepository(User);

    const user = userRepository.create({
      email,
      password,
      name,
      isAdm,
      logs: [],
    });

    await userRepository.save(user);

    const { password: string, ...newUser } = user;
    return newUser;
  } catch (error) {
    throw new AppError("E-mail already registered", 409);
  }
};
