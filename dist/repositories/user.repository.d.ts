import { Repository } from "typeorm";
import { User } from "../entities/index";
declare class UserRepository extends Repository<User> {
}
export { UserRepository };
