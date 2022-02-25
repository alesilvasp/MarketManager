import { Repository } from "typeorm";
import { OrderDetails } from "../entities/index";
declare class OrderDetailsRepository extends Repository<OrderDetails> {
}
export { OrderDetailsRepository };
