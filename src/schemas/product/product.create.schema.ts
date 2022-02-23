import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProductCreate } from "../../interfaces";

export const productCreateSchema: SchemaOf<IProductCreate> = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    unit: yup.string().required(),
    category_id: yup.number().required(),
  });
