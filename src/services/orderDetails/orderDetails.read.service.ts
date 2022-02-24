import { getRepository } from "typeorm";
import { OrderDetails, Cashier } from "../../entities";
import AppError from "../../errors/appError";

export const orderDetailsReadService = async (cashier_id: number) => {
  try {
    const orderDetailsRepository = getRepository(OrderDetails);
    const cashierRepository = getRepository(Cashier);

    const cashier = await cashierRepository.findOneOrFail(cashier_id, {
      relations: ["order_products"],
    });

    const orderDetails = await orderDetailsRepository.find({
      relations: ["cashier"],
    });

    const filterOrderDetails = orderDetails.filter(
      (order) => order.cashier.id == cashier_id
    );

    return filterOrderDetails;
  } catch (error) {
    if ((error as any).message.includes("Cashier")) {
      throw new AppError(`Cashier id ${cashier_id} do not exists`, 404);
    }
  }
};
