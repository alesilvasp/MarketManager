import { EntityRepository, Repository } from "typeorm";
import { Cashier } from "../entities/index";

@EntityRepository(Cashier)
class CashierRepository extends Repository<Cashier> {}

export { CashierRepository }