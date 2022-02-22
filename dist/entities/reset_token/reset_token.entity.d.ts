import { User } from "../user/user.entity";
export declare class ResetToken {
    readonly id: number;
    token: string;
    created_at: Date;
    user: User;
}
