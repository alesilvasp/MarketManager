import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../user/user.entity";
import { Cashier } from "../cashier/cashier.entity";

@Entity()
export class Logs {

    @PrimaryGeneratedColumn()
    readonly id!: number

    @CreateDateColumn()
    login!: Date

    @Column({ nullable: true })
    logout!: Date

    @ManyToOne(type => User, user => user.logs)
    user!: User

    @Column({ nullable: true })
    session_time!: Date

    @ManyToOne(type => Cashier, cashier => cashier.logs)
    cashier!: Cashier

}