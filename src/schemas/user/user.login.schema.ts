import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../../interfaces/user/user.login.interface";

const userLoginSchema: SchemaOf<IUserLogin> = yup.object().shape({
    email: 
        yup.string().email().required(),
    password:
        yup.string().required(),
    cashier_id: 
        yup.number().integer().required()
})

export default userLoginSchema