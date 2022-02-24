import { OrderProduct } from "../../entities";
import { IOrderProductCreate } from "../../interfaces/index";
export declare const orderProductCreateService: (body: IOrderProductCreate, cashier_id: number) => Promise<OrderProduct | undefined>;
