import { IUserCreate } from "../../interfaces/user/user.create.interface";
export declare const userCreateService: (body: IUserCreate) => Promise<{
    id: string;
    name: string;
    email: string;
    isAdm: boolean;
    logs: import("../../entities").Logs[];
}>;
