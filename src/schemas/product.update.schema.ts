import * as yup from "yup";
import { IProductUpdate } from "../interfaces";
import { SchemaOf } from "yup";

export const productUpdateSchema: SchemaOf<IProductUpdate> = yup
  .object()
  .shape({
    name: yup.string(),
    description: yup.string(),
    price: yup.number(),
    unit: yup.string(),
    category_id: yup.number(),
  });
