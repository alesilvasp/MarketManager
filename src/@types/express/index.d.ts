import { IStockProduct } from "../../interfaces/stock/stock.create.interface";

declare global {
  namespace Express {
    interface Request {
      user: { uuid: string };
      token: string;
      adm_id: string;
      toStock: IStockProduct;
    }
  }
}
