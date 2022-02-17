import * as yup from "yup";
import * as bcrypt from "bcrypt";
import { IUserCreate } from "../interfaces/index";
import { SchemaOf } from "yup";

const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    }),
  password: yup
    .string()
    .required()
    .transform((value, originalValue) => {
      return bcrypt.hashSync(originalValue, 10);
    }),
  isAdm: yup.boolean().required(),
});

export default userCreateSchema;
