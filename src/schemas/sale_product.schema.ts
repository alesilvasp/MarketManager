import * as yup from "yup";
import { SchemaOf } from "yup";
import { ISaleProductTransfer } from "../interfaces";

export const saleProductTransferSchema: SchemaOf<ISaleProductTransfer> = yup
  .object()
  .shape({
    name: yup.string().required(),
    quantity: yup.number().integer().positive().required(),
  });
