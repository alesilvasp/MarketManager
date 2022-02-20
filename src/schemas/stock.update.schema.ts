import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUpdateStockProduct } from "../interfaces/stock/stock.update.interface";

export const stockUpdateSchema: SchemaOf<IUpdateStockProduct> = yup
  .object()
  .shape({
    stock: yup.number().required(),
  });
