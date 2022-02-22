import { Request, Response, NextFunction } from "express"
import { userAdminLoginService } from "../../services/user/user.adminlogin.service"

export const userAdminLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const adminAccessToken = await userAdminLoginService(req.body)

        return res.json({ token: adminAccessToken })
        
    } catch (error) {

        next(error)
    }
}