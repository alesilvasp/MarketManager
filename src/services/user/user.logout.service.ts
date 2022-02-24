import { getRepository } from "typeorm";
import { User, Cashier, Logs } from "../../entities";
import AppError from "../../errors/appError";
import * as bcrypt from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import { config } from "../../config/jwt.config";
import { IUserDecoded } from "../../interfaces/user/user.decoded.interface";

export const userLogout = async (token: string) => {

    const userRepository = getRepository(User)
    const cashierRepository = getRepository(Cashier)
    const logsRepository = getRepository(Logs)

    const decodedToken = jwt.decode(token, { complete: true })

    if (decodedToken) {


    }

    
    

}