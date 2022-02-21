import { Repository } from "typeorm";
import { ProductCategory } from "../entities/index";
declare class ProductCategoryRepository extends Repository<ProductCategory> {
}
export { ProductCategoryRepository };
