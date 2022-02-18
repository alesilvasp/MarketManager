import { Request, Response, NextFunction } from "express"
import { IUserRecover } from "../../interfaces/user/user.recover.interface"
import { SchemaOf } from "yup"

declare global {
    namespace Express {
      interface Request {
        recover_data: IUserRecover
      }
    }
}

export const validateRecover = (schema: SchemaOf<IUserRecover>) => async (req: Request, res: Response, next: NextFunction) => {

    try {

        const data = req.body

        try {

            const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true})

            req.recover_data = validatedData

            next()
        
        } catch (err: any) {

            return res.status(400).json({
                error: err.errors?.join(', ') 
            })
        }

    } catch (error) {

        next(error)
    } 
}