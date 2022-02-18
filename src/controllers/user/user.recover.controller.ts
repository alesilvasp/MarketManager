import { NextFunction, Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/errorHandler"
import { userRecoverService } from "../../services/user/user.recover.service"


export const userRecover = async (req: Request, res: Response, next: NextFunction) => { 

    try {
        
        const { email } = req.recover_data

        const recover = await userRecoverService(email)

        res.status(201).json({ message: recover })
        
    } catch (error) {

        if (error instanceof ErrorHandler) {
            handleError(error, res)
        }
    }
}