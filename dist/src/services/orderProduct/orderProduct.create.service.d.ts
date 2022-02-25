import { Cashier, OrderProduct, SaleProduct } from "../../entities";
import { IOrderProductCreate } from "../../interfaces/index";
export declare const orderProductCreateService: (body: IOrderProductCreate, cashier_id: number) => Promise<{
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        unit: string;
        sale_product: SaleProduct;
        returned: import("../../entities").ReturnedProduct[];
        order_products: OrderProduct[];
        category: import("../../entities").ProductCategory;
    };
    id: number;
    quantity: number;
    subtotal: number;
    created_at: string;
    cashier: Cashier;
    order: import("../../entities").OrderDetails;
} | undefined>;
