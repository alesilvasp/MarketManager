import { ResetToken, User } from "../../entities";
import { UserRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../errors/errorHandler";
import { getRepository } from "typeorm";
import * as bcrypt from "bcryptjs"

export const userChangePasswordService = async (token: string, new_password: string) => {

    const resetTokenRepository = getRepository(ResetToken)
    const userRepository = getRepository(User)

    const userToken = await resetTokenRepository.findOne({ token: token })

    if (!token) {

        throw new ErrorHandler(401, "Invalid recovery token")
    } 

    if (userToken) {

        const isValid = bcrypt.compare(token, userToken.token)

        if (!isValid) {

            throw new ErrorHandler(401, "Invalid recovery token")
        }

        let userId = userToken.user.id

        const user = await userRepository.findOne({ where: { id: userId } })

        if (user) {

            user.password = await bcrypt.hash(new_password, 10)

            await userRepository.save(user)

            await resetTokenRepository.delete(userToken)

            return "Password changed successfully"
        
        } else {

            throw new ErrorHandler(404, "User not found")
        }
    }
}