import { Router } from "express"
import { userList } from "../../controllers/user/user.list.controller"
import { userRecover } from "../../controllers/user/user.recover.controller"
import { validateRecover } from "../../middlewares/user/validate.recover.middleware"
import userRecoverSchema from "../../schemas/user/user.recover.schema"

const router = Router()

export const userRouter = () => {

    router.get("", userList)
    router.post("/recover", [validateRecover(userRecoverSchema)], userRecover)
    
    return router
}