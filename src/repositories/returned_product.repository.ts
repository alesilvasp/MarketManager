import { EntityRepository, Repository } from "typeorm";
import { ReturnedProduct } from "../entities/index";

@EntityRepository(ReturnedProduct)
class ReturnedProductRepository extends Repository<ReturnedProduct> {}

export { ReturnedProductRepository }