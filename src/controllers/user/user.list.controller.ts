import { NextFunction, Request, Response } from "express"
import { ISafeUser } from "../../interfaces/user/user.safe.interfaces"
import { userListService } from "../../services/user"

export const userList = async (req: Request, res: Response, next: NextFunction) => { 

    try {
        
        const users: ISafeUser[] = await userListService()

        return res.json(users)
        
    } catch (error) {

        next(error)
    }
}