import { getRepository } from "typeorm";
import AppError from "../../errors/appError";
import { Cashier } from "../../entities";

export const cashierCreateService = async (body: any) => {
  const { balance } = body;

  try {
    const cashierRepository = getRepository(Cashier);

    const newCashier = cashierRepository.create({
      subtotal: 0,
      balance: balance,
      logs: [],
      order_details: [],
      order_products: []
    });

    await cashierRepository.save(newCashier);

    return newCashier;
  } catch (error) {
    if ((error as any).code === "23502") {
      throw new AppError(`Field balance cannot be empty`, 400); 
    }
    console.log(error)
  }
};
