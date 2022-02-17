import { EntityRepository, Repository } from "typeorm";
import { ProductCategory } from "../entities/index";

@EntityRepository(ProductCategory)
class ProductCategoryRepository extends Repository<ProductCategory> {}

export { ProductCategoryRepository }