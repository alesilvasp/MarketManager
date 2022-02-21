import { ResetToken, User } from "../../entities";
import { UserRepository } from "../../repositories/user.repository";
import { getRepository } from "typeorm";
import AppError from "../../errors/appError";
import * as bcrypt from "bcryptjs"

export const userChangePasswordService = async (token: string, new_password: string) => {

    const resetTokenRepository = getRepository(ResetToken)
    const userRepository = getRepository(User)

    const userToken = await resetTokenRepository.findOne({ token: token })

    if (!token) {

        throw new AppError("Invalid recovery token", 401)
    } 

    if (userToken) {

        const isValid = bcrypt.compare(token, userToken.token)

        if (!isValid) {

            throw new AppError("Invalid recovery token", 401)
        }

        let userId = userToken.user.id

        const user = await userRepository.findOne({ where: { id: userId } })

        if (user) {

            user.password = await bcrypt.hash(new_password, 10)

            await userRepository.save(user)

            await resetTokenRepository.delete(userToken)

            return "Password changed successfully"
        
        } else {

            throw new AppError("User not found", 404)
        }
    }
}