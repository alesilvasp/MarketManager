import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "..";

@Entity()
export class StockProduct {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("float")
  stock!: number;

  @Column()
  batch!: string;

  @CreateDateColumn()
  expires_in!: Date;

  @ManyToOne((type) => Product, (product) => product.stock_product)
  product!: Product;
}
