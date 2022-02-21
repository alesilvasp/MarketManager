import { Repository } from "typeorm";
import { Product } from "../entities/index";
declare class ProductRepository extends Repository<Product> {
}
export { ProductRepository };
