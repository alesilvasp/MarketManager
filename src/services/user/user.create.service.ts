import { getRepository } from "typeorm";
import { IUserCreate } from "../../interfaces/user/user.create.interface";
import { ErrorHandler } from "../../errors/errorHandler";
import { Logs, User } from "../../entities";

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
  // const newUser = new User();
  // newUser.email = email;
  // newUser.isAdm = isAdm;
  // newUser.name = name;
  // newUser.password = password;
  // newUser.logs = [];
  const newUser = userRepository.create({
    name,
    email,
    password,
    isAdm,
    logs: [],
  });
  console.log(newUser);
  await userRepository.save(newUser);

  return newUser;
};
