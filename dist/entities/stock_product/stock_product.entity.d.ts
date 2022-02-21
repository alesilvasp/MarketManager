import { Product } from "..";
export declare class StockProduct {
    readonly id: number;
    stock: number;
    batch: string;
    expires_in: Date;
    product: Product;
}
