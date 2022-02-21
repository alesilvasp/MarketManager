import { Logs } from "../logs/logs.entity";
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdm: boolean;
    logs: Logs[];
    hashPassword(): void;
}
