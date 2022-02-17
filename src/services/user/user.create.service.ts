import { UserRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { IUserCreate } from "../../interfaces/user/user.create.interface";
import { ErrorHandler } from "../../errors/errorHandler";

class userCreateService {
  async execute({ name, email, password, isAdm }: IUserCreate) {
    const userRepository = getCustomRepository(UserRepository);

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
  }
}

export default userCreateService;
