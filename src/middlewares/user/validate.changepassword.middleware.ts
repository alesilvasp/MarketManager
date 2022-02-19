import { Request, Response, NextFunction} from 'express'
import { IUserChangePassword } from '../../interfaces/user/user.changepassword.interface'
import { SchemaOf } from 'yup'

declare global {
    namespace Express {
      interface Request {
        change_pwd_data: IUserChangePassword
      }
    }
}

export const validateChangePassword = (schema: SchemaOf<IUserChangePassword>) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = req.body

        try {

            const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true})

            req.change_pwd_data = validatedData
            
            next()

        } catch (err: any) {

            // yup error handling
            return res.status(400).json({
                error: err.errors?.join(', ')
            })
        }

    } catch (err) {

        next(err)
    }
}