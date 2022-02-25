export declare const saleProductSearchService: (product_id: string) => Promise<{
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        unit: string;
        returned: import("../../entities").ReturnedProduct[];
        order_products: import("../../entities").OrderProduct[];
        category: import("../../entities").ProductCategory;
    };
    id?: number | undefined;
    stock?: number | undefined;
}>;
