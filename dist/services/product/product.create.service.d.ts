import { Product } from "../../entities";
import { IProductCreate } from "../../interfaces";
export declare const productCreateService: (body: IProductCreate) => Promise<Product>;
