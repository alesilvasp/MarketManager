import { Product } from "../product/product.entity";
import { OrderDetails } from "../order_details/order_details.entity";
import { Cashier } from "../cashier/cashier.entity";
export declare class OrderProduct {
    readonly id: number;
    quantity: number;
    subtotal: number;
    created_at: string;
    product: Product;
    cashier: Cashier;
    order: OrderDetails;
}
