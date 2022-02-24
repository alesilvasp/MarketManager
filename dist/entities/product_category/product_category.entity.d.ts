import { Product } from "../product/product.entity";
export declare class ProductCategory {
    readonly id: number;
    category: string;
    products: Product[];
    toLower(): void;
}
