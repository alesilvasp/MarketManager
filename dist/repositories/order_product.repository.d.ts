import { Repository } from "typeorm";
import { OrderProduct } from "../entities/index";
declare class OrderProductRepository extends Repository<OrderProduct> {
}
export { OrderProductRepository };
