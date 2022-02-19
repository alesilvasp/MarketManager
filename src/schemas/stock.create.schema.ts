import * as yup from "yup";
import { SchemaOf } from "yup";
import { IStockProduct } from "../interfaces/stock/stock.create.interface";

export const stockCreateSchema: SchemaOf<IStockProduct> = yup.object().shape({
  name: yup
    .string()
    .required()
    .transform((name) => name.toLowerCase()),
  stock: yup.number().required().positive(),
  batch: yup.string().required(),
  expires_in: yup
    .string()
    .required()
    .matches(
      /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/,
      "Invalid date format. Must be in dd/mm/YYYY format."
    ),
});
