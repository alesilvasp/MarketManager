import { EntityRepository, Repository } from "typeorm";
import { StockProduct } from "../entities/index";

@EntityRepository(StockProduct)
class StockProductRepository extends Repository<StockProduct> {}

export { StockProductRepository };
