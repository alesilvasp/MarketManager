import { EntityRepository, Repository } from "typeorm";
import { ResetToken } from "../entities/index";

@EntityRepository(ResetToken)
class ResetTokenRepository extends Repository<ResetToken> {}

export { ResetTokenRepository }