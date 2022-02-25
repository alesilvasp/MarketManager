import { Product } from "../product/product.entity";
export declare class ReturnedProduct {
    readonly id: number;
    quantity: number;
    subtotal: number;
    created_at: Date;
    product: Product;
}
