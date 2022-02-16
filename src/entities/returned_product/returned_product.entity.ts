import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "../product/product.entity"

@Entity()
export class ReturnedProduct {

    @PrimaryGeneratedColumn()
    readonly id!: number
    
    @Column()
    quantity!: number

    @Column('float')
    subtotal!: number

    @CreateDateColumn()
    created_at!: Date

    @ManyToOne(type => Product, product => product.returned, {
        eager: true
    })
    product!: Product

}