import { Details } from "../../interfaces/orderDetails/orderDetails.response.interface";
export declare const orderDetailsCreateService: (cashier_id: number) => Promise<{
    "invoice number": number;
    total: number;
    "issue date": string;
    products: Details[];
}>;
