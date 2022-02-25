import { ICashierLogin } from "../../interfaces/cashier/cashier.login.interface";
export declare const cashierLoginService: (body: ICashierLogin, cashier_id: number) => Promise<string | undefined>;
