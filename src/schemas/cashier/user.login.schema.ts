import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICashierLogin } from "../../interfaces/cashier/cashier.login.interface";

const cashierLoginSchema: SchemaOf<ICashierLogin> = yup.object().shape({
    email: 
        yup.string().email().required(),
    password:
        yup.string().required(),
})

export default cashierLoginSchema