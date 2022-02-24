import { getRepository } from "typeorm";
import { User, Cashier, Logs } from "../../entities";
import AppError from "../../errors/appError";
import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "../../config/jwt.config";
import { IUserLogin } from "../../interfaces/user/user.login.interface";

export const userLoginService = async (body: IUserLogin) => {

    const { email, password, cashier_id } = body

    const userRepository = getRepository(User)
    const cashierRepository = getRepository(Cashier)
    const logsRepository = getRepository(Logs)

    const user = await userRepository.findOne({ email: email })
    const cashier = await cashierRepository.findOne({ id: cashier_id })

    if (!user) {

        throw new AppError("Wrong password/email", 401)
    }

    if (!cashier) {
        
        throw new AppError("Cashier not found", 404)
    }
    
    const pwdMatch = await bcrypt.compare(password, user.password)

    if (!cashier.user && pwdMatch && !user.isAdm) {

        const newLog = new Logs()
        newLog.login = new Date()
        newLog.user = user
        newLog.cashier = cashier
        await logsRepository.save(newLog)

        cashier.user = user
        await cashierRepository.save(cashier)

        const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdm: user.isAdm
        },
        config.secret,
        {expiresIn: config.expiresIn})

        return token

    } else if (!cashier.user && pwdMatch && user.isAdm) {

        const newLog = new Logs()
        newLog.login = new Date()
        newLog.user = user
        newLog.cashier = cashier
        await logsRepository.save(newLog)
        await logsRepository.save(newLog)

        cashier.user = user
        await cashierRepository.save(cashier)

    } else if (cashier.user) {

        throw new AppError("Cashier is in use", 401)

    } else if (!pwdMatch) {

        throw new AppError("Wrong password/email", 401)
    }

}