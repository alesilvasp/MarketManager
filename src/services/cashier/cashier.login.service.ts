import { getRepository } from "typeorm";
import { User, Cashier, Logs } from "../../entities";
import AppError from "../../errors/appError";
import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "../../config/jwt.config";
import { ICashierLogin } from "../../interfaces/cashier/cashier.login.interface";

export const cashierLoginService = async (body: ICashierLogin, cashier_id: number) => {

    const { email, password } = body

    const userRepository = getRepository(User)
    const cashierRepository = getRepository(Cashier)
    const logsRepository = getRepository(Logs)

    const user = await userRepository.findOne({ email: email })
    const cashier = await cashierRepository.findOne({ id: cashier_id })
    const cashiers = await cashierRepository.find()

    console.log(user)

    if (!user) {

        throw new AppError("Wrong password/email", 401)
    }

    if (!cashier) {
        
        throw new AppError("Cashier not found", 404)
    }
    
    const pwdMatch = await bcrypt.compare(password, user.password)

    const userIsLogged = cashiers.find(item => item.user === user)

    console.log(userIsLogged)

    if (userIsLogged) {

        throw new AppError("This user is already logged in in another cashier", 401)
    }

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

        cashier.user = user
        await cashierRepository.save(cashier)

    } else if (cashier.user) {

        throw new AppError("Cashier is already been used", 401)

    } else if (!pwdMatch) {

        throw new AppError("Wrong password/email", 401)
    }

}