import { Repository } from "typeorm";
import { Cashier } from "../entities/index";
declare class CashierRepository extends Repository<Cashier> {
}
export { CashierRepository };
