import { Express } from "express"
import { userRouter } from "./user";



export const initializerRouter = (app: Express) => {

    app.use("/user", userRouter())
}