import { EntityRepository, Repository } from "typeorm";
import { OrderProduct } from "../entities/index";

@EntityRepository(OrderProduct)
class OrderProductRepository extends Repository<OrderProduct> {}

export { OrderProductRepository }