import { EntityRepository, Repository } from "typeorm";
import { Logs } from "../entities/index";

@EntityRepository(Logs)
class LogsRepository extends Repository<Logs> {}

export { LogsRepository };
