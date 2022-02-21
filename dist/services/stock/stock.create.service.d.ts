import { StockProduct } from "../../entities";
import { IStockProduct } from "../../interfaces/stock/stock.create.interface";
export declare const stockCreateService: (body: IStockProduct) => Promise<StockProduct>;
