import { NextFunction, Request, Response } from "express"
import { userRecoverService } from "../../services/user/user.recover.service"


export const userRecoverController = async (req: Request, res: Response, next: NextFunction) => { 

    try {
        
        const { email } = req.body

        const recover = await userRecoverService(email)

        res.status(201).json({ message: recover })
        
    } catch (error) {

        next(error)
    }
}