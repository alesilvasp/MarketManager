import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserChangePassword } from "../../interfaces/user/user.changepassword.interface";

const userChangePasswordSchema: SchemaOf<IUserChangePassword> = yup.object().shape({
    token: yup
        .string().required(),
    new_password: yup
        .string().required(),
    new_password_confirm: yup
        .string().required().oneOf([yup.ref('new_password'), null], 'Passwords must match')
})

export default userChangePasswordSchema