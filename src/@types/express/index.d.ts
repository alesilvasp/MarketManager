import { IStockProduct } from "../../interfaces/stock/stock.create.interface";
import { IUserCreate } from "../../interfaces/index";
declare global {
  namespace Express {
    interface Request {
      user: { uuid: string };
      token: string;
      adm_id: string;
      toStock: IStockProduct;
      new_user: IUserCreate;
    }
  }
}
