import { Cashier } from "../cashier/cashier.entity";
import { OrderProduct } from "../order_product/order_product.entity";
export declare class OrderDetails {
    readonly id: number;
    total: number;
    created_at: string;
    order_products: OrderProduct[];
    cashier: Cashier;
}
