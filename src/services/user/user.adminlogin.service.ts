import { getRepository } from "typeorm";
import { User } from "../../entities";
import { IUserAdminLogin } from "../../interfaces/user/user.adminlogin.interface";
import AppError from "../../errors/appError";
import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "../../config/jwt.config";

export const userAdminLoginService = async (body: IUserAdminLogin) => {
  
    const { email, password } = body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email: email })

    if (!user) {

        throw new AppError("Wrong password/email", 401)
    }

    if (!user.isAdm) {

        throw new AppError("Unauthorized, please login with an Administrator account.", 401)
    }

    const pwdMatch = await bcrypt.compare(password, user.password)

    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdm: user.isAdm
    },
    config.secret,
    {expiresIn: config.expiresIn})

    if (pwdMatch) {

        return token
    
    } else {

        throw new AppError("Wrong email/password", 401)
    }
};
