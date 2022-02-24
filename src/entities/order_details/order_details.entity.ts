import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cashier } from "../cashier/cashier.entity";
import { OrderProduct } from "../order_product/order_product.entity";

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("float")
  total!: number;

  @CreateDateColumn()
  created_at!: string;

  @OneToMany((type) => OrderProduct, (order_product) => order_product.order, {
    eager: true,
  })
  order_products!: OrderProduct[];

  @ManyToOne((type) => Cashier, (cashier) => cashier.order_details)
  cashier!: Cashier;
}
