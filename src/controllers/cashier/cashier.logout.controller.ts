import { Request, Response, NextFunction } from "express"
import { cashierLogoutService } from "../../services/cashier/cashier.logout.service"

export const cashierLogoutController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const { uuid } = req.user

        const { cashier_id } = req.params
        
        const logout = await cashierLogoutService(uuid, Number(cashier_id))

        return res.json({ message: logout })
        
    } catch (error) {

        next(error)
    }
}