import { Column, CreateDateColumn, Entity, OneToOne, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { User } from "../user/user.entity"
import { Logs } from "../logs/logs.entity"
import { OrderProduct } from "../order_product/order_product.entity"
import { OrderDetails } from "../order_details/order_details.entity"

@Entity()
export class Cashier {

    @PrimaryGeneratedColumn()
    readonly id!: number
    
    @Column('float')
    subtotal!: number

    @CreateDateColumn()
    created_at!: string

    @Column('float')
    balance!: number

    @OneToOne((type) => User, {
        eager: true,
        nullable: true
    })@JoinColumn()
    user!: User

    @OneToMany(type => Logs, log => log.cashier)
    logs!: Logs[]

    @OneToMany(type => OrderProduct, order_product => order_product.cashier)
    order_products!: OrderProduct[]

    @OneToMany(type => OrderDetails, order_details => order_details.cashier)
    order_details!: OrderDetails[]

}