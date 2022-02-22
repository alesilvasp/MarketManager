import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUpdateStockProduct } from "../interfaces/stock/stock.update.interface";

export const stockUpdateSchema: SchemaOf<IUpdateStockProduct> = yup
  .object()
  .shape({
    stock: yup.number().positive().integer(),
    batch: yup.string(),
    expires_in: yup
      .string()
      .matches(
        /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/,
        "Invalid date format. Must be in dd/mm/YYYY format."
      ),
  });
