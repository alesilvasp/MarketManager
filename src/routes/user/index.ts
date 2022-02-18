import { Router } from "express"
import { userList } from "../../controllers/user/user.list.controller"

const router = Router()

export const userRouter = () => {

    router.get("", userList)
    
    return router
}