import { User } from "../user/user.entity";
import { Cashier } from "../cashier/cashier.entity";
export declare class Logs {
    readonly id: number;
    login: Date;
    logout: Date;
    user: User;
    session_time: Date;
    cashier: Cashier;
}
