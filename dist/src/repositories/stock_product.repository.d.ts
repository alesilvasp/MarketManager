import { Repository } from "typeorm";
import { StockProduct } from "../entities/index";
declare class StockProductRepository extends Repository<StockProduct> {
}
export { StockProductRepository };
