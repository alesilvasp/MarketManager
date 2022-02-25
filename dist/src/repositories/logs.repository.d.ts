import { Repository } from "typeorm";
import { Logs } from "../entities/index";
declare class LogsRepository extends Repository<Logs> {
}
export { LogsRepository };
