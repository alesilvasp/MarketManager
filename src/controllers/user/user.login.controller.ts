import { Request, Response, NextFunction } from "express"
import { userLoginService } from "../../services/user/user.login.service"

export const userLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const accesToken = await userLoginService(req.body)

        return accesToken
        
    } catch (error) {

        next(error)
    }
}