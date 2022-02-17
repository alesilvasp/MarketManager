import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/index";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export { UserRepository }
