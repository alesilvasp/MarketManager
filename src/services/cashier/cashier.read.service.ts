import { getRepository } from "typeorm";
import { Cashier } from "../../entities";

export const cashierReadService = async () => {
  const cashierRepository = getRepository(Cashier);

  const cashier = await cashierRepository.find();

  return cashier;
};