import { Request, Response, NextFunction } from "express"

export const userLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {


        const { token } = req

        

        return 
        
    } catch (error) {

        next(error)
    }
}