import { IUserCreate } from "./user/user.create.interface";
import { IProductCreate } from "./product/product.create.interface";
import { IProductCategory } from "./product_category/productCategory.create.interface";
import { IReturnedProduct } from "./returned/returnedProduct.create.interface";
import { IOrderProductCreate } from "./order_product/orderProduct.create.interface";
import { IProductUpdate } from "./product/product.update.interface";
import { IStockProduct } from "./stock/stock.create.interface";
import { IUpdateStockProduct } from "./stock/stock.update.interface";
import {
  ISaleProductTransfer,
  InfoQnt,
} from "./sale_product/sale_product.transfer.interface";
import { IOrderProductDelete } from "./order_product/orderProduct.delete.interface";

export {
  IUserCreate,
  IProductCategory,
  IProductCreate,
  IReturnedProduct,
  IProductUpdate,
  IOrderProductCreate,
  IStockProduct,
  IUpdateStockProduct,
  ISaleProductTransfer,
  InfoQnt,
  IOrderProductDelete,
};
