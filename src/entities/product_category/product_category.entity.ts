import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("text", { unique: true })
  category!: string;

  @OneToMany((type) => Product, (product) => product.category)
  products!: Product[];
}
