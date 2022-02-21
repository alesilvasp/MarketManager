import * as yup from "yup";

export const categoryCreateSchema = yup.object().shape({
  category: yup.string().required(),
});
