import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/index";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {}

export { ProductRepository }