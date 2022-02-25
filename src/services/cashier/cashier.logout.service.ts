import { getRepository } from "typeorm";
import { User, Cashier, Logs } from "../../entities";
import AppError from "../../errors/appError";
import intervalToDuration from 'date-fns/intervalToDuration'


export const cashierLogoutService = async (uuid: string, cashier_id: number) => {

    const userRepository = getRepository(User)
    const cashierRepository = getRepository(Cashier)
    const logsRepository = getRepository(Logs)
    
    const user = await userRepository.findOne({ id: uuid })

    if (!user) {

        throw new AppError("User not found", 404)
    }
    
    let cashier = await cashierRepository.findOneOrFail({ id: cashier_id })

    if (!cashier) {

        throw new AppError("Cashier not found", 404)
    }

    if (!cashier.user) {

        throw new AppError("Cashier is not being used", 401)
    }

    if (cashier.user.id !== user.id) {

        throw new AppError("Trying to logout from wrong Cashier", 401)
    }

    const fakeCashier = { user: null }

    cashier = Object.assign(cashier, fakeCashier)

    await cashierRepository.save(cashier)

    // const log = await logsRepository.findOne({
    //     where: {
    //         user: user,
    //         logout: null
    //     }
    // })

    // if (log) {
        
    //     log.logout = new Date()
    //     log.session_time = intervalToDuration({
    //         start: log.login
    //     })
    // }

    return cashier

    

}