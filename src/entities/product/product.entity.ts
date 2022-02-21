import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { OrderProduct } from "../order_product/order_product.entity";
import { ProductCategory } from "../product_category/product_category.entity";
import { ReturnedProduct } from "../returned_product/returned_product.entity";
import { StockProduct } from "../stock_product/stock_product.entity";
import { SaleProduct } from "../sale_product/sale_product.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column("float")
  price!: number;

  @Column()
  unit!: string;

  @OneToOne((type) => SaleProduct, {
    eager: true,
  })
  @JoinColumn()
  sale_product!: SaleProduct;

  @OneToMany((type) => ReturnedProduct, (returned) => returned.product)
  returned!: ReturnedProduct[];

  @OneToMany((type) => StockProduct, (stock_product) => stock_product.product, {
    eager: true,
  })
  @JoinColumn()
  stock_product!: StockProduct[];

  @OneToMany((type) => OrderProduct, (order_product) => order_product.product)
  order_products!: OrderProduct[];

  @ManyToOne((type) => ProductCategory, (category) => category.products, {
    eager: true,
  })
  category!: ProductCategory;
}
