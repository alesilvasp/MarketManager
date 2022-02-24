import { getRepository } from "typeorm";
import { Cashier } from "../../entities";
import AppError from "../../errors/appError";

export const cashierReadByIdService = async (cashier_id: number) => {
  const cashierRepository = getRepository(Cashier);
  try {
    const cashier = await cashierRepository.findOneOrFail(cashier_id, {
      relations: ["order_products"],
    });

    return cashier;
  } catch (error) {
    throw new AppError(`Cashier id ${cashier_id} not found`, 404);
  }
};
