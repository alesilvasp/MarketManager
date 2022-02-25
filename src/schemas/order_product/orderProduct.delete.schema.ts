import * as yup from "yup";
import { SchemaOf } from "yup";
import { IOrderProductDelete } from "../../interfaces";

export const orderProductDeleteSchema: SchemaOf<IOrderProductDelete> = yup
  .object()
  .shape({
    cashier: yup.number().integer().positive().required(),
    quantity: yup.number().integer().positive().required(),
    discard: yup.boolean(),
  });
