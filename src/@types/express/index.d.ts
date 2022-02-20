import { IStockProduct, IUpdateStockProduct } from "../../interfaces/stock";
import { IUserCreate } from "../../interfaces/index";

declare global {
  namespace Express {
    interface Request {
      user: { uuid: string };
      token: string;
      adm_id: string;
      toStock: IStockProduct;
      new_user: IUserCreate;
      stockUpdate: IUpdateStockProduct;
    }
  }
}
