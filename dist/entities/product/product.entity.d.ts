import { OrderProduct } from "../order_product/order_product.entity";
import { ProductCategory } from "../product_category/product_category.entity";
import { ReturnedProduct } from "../returned_product/returned_product.entity";
import { StockProduct } from "../stock_product/stock_product.entity";
import { SaleProduct } from "../sale_product/sale_product.entity";
export declare class Product {
    readonly id: number;
    name: string;
    description: string;
    price: number;
    for_sale: number;
    unit: string;
    sale_product: SaleProduct;
    returned: ReturnedProduct[];
    stock_product: StockProduct[];
    order_products: OrderProduct[];
    category: ProductCategory;
}
