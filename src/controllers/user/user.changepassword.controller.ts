import { NextFunction, Request, Response } from "express"
import { userChangePasswordService } from "../../services/user/user.changepassword.service"
import { ErrorHandler, handleError } from "../../errors/errorHandler"

export const userChangePasswordController = async (req: Request, res: Response, next: NextFunction) => { 

    const { token, new_password  } = req.change_pwd_data

    try {
        
        const changed = await userChangePasswordService(token, new_password)

        res.json({ message: changed })
        
    } catch (error) {

        if (error instanceof ErrorHandler) {
            handleError(error, res)
        }
    }
}