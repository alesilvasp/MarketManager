import { IStockProduct, IUpdateStockProduct } from "../../interfaces/stock";

declare global {
  namespace Express {
    interface Request {
      user: { uuid: string };
      token: string;
      adm_id: string;
      toStock: IStockProduct;
      stockUpdate: IUpdateStockProduct;
    }
  }
}
