import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "../product/product.entity"
import { OrderDetails } from "../order_details/order_details.entity"
import { Cashier } from "../cashier/cashier.entity"

@Entity()
export class OrderProduct {

    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column()
    quantity!: number

    @Column('float')
    subtotal!: number

    @CreateDateColumn()
    created_at!: string

    @ManyToOne(type => Product, product => product.order_products, {
        eager: true
    })
    product!: Product

    @ManyToOne(type => Cashier, cashier => cashier.order_products)
    cashier!: Cashier

    @ManyToOne(type => OrderDetails, order_details => order_details.order_products)
    order!: OrderDetails
}