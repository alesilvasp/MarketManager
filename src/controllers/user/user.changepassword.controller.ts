import { NextFunction, Request, Response } from "express"
import { userChangePasswordService } from "../../services/user/user.changepassword.service"

export const userChangePasswordController = async (req: Request, res: Response, next: NextFunction) => { 

    const { token, new_password  } = req.body

    try {
        
        const changed = await userChangePasswordService(token, new_password)

        res.json({ message: changed })
        
    } catch (error) {

        next(error)
    }
}