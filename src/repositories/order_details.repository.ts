import { EntityRepository, Repository } from "typeorm";
import { OrderDetails } from "../entities/index";

@EntityRepository(OrderDetails)
class OrderDetailsRepository extends Repository<OrderDetails> {}

export { OrderDetailsRepository }