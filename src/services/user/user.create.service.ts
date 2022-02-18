import { getRepository } from "typeorm";
import { IUserCreate } from "../../interfaces/user/user.create.interface";
import { ErrorHandler } from "../../errors/errorHandler";
import { User } from "../../entities";

export const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserCreate) => {
  const userRepository = getRepository(User);

  const emailAlreadyExists = await userRepository.findOne({ email });

  if (emailAlreadyExists) {
    throw new ErrorHandler(409, "E-mail already registered");
  }

  const newUser = userRepository.create({
    name,
    email,
    password,
    isAdm,
    logs: [],
  });
  await userRepository.save(newUser);

  return newUser;
};
