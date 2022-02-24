import { getRepository } from "typeorm";
import { User, Cashier, Logs } from "../../entities";
import AppError from "../../errors/appError";
import { IUserDecoded } from "../../interfaces/user/user.decoded.interface";

function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const userLogout = async (token: string) => {

    const userRepository = getRepository(User)
    const cashierRepository = getRepository(Cashier)
    const logsRepository = getRepository(Logs)
    const tokenData: IUserDecoded = parseJwt(token)
    
    const user = await userRepository.findOne({ id: tokenData.id })

    if (!user) {

        throw new AppError("User not found", 404)
    }

    const cashiers = await cashierRepository.find()

    const cashier = cashiers.find(item => item.user === user)

    const logs = await logsRepository.find({
        where: { 
            logout: null,
            user: user,
        },
    })

}