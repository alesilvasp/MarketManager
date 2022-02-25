import { Request, Response, NextFunction } from "express"
import { cashierLoginService } from "../../services/cashier/cashier.login.service"

export const cashierLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const { cashier_id } = req.params

        const accesToken = await cashierLoginService(req.body, Number(cashier_id))

        return res.json({token: accesToken })
        
    } catch (error) {

        next(error)
    }
}