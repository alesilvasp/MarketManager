import { User } from "../user/user.entity";
import { Logs } from "../logs/logs.entity";
import { OrderProduct } from "../order_product/order_product.entity";
import { OrderDetails } from "../order_details/order_details.entity";
export declare class Cashier {
    readonly id: number;
    subtotal: number;
    created_at: string;
    balance: number;
    user: User;
    logs: Logs[];
    order_products: OrderProduct[];
    order_details: OrderDetails[];
}
