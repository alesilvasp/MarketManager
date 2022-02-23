import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserAdminLogin } from "../../interfaces/user/user.adminlogin.interface";

const userAdminLoginSchema: SchemaOf<IUserAdminLogin> = yup.object().shape({
    email: 
        yup.string().email().required(),
    password:
        yup.string().required()
})

export default userAdminLoginSchema