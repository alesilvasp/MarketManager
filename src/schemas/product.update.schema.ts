import * as yup from "yup";

export const productUpdateSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  price: yup.number(),
  unit: yup.string(),
  category_id: yup.number(),
});
