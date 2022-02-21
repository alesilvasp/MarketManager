import { getRepository } from "typeorm";
import { User } from "../../entities";
import { ISafeUser } from "../../interfaces/user/user.safe.interfaces";

export const userListService = async () => {

    const userRepository = getRepository(User)

    const users: ISafeUser[] = await userRepository.find()

    users.map(u => delete u.password)

    return users

}
