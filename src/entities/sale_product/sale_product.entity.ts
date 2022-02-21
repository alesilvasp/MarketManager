import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "..";

@Entity()
export class SaleProduct {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("float")
  stock!: number;

  @OneToOne((type) => Product, (product) => product.sale_product)
  product!: Product;
}
