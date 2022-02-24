import { StockProduct } from "../../entities";
import { IUpdateStockProduct } from "../../interfaces/stock/stock.update.interface";
export declare const stockUpdateService: (stock_id: string, body: IUpdateStockProduct) => Promise<StockProduct | undefined>;
