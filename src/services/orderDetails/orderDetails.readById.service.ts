import { getRepository } from "typeorm";
import { OrderDetails, Cashier } from "../../entities";
import AppError from "../../errors/appError";

export const orderDetailsReadByIdService = async (order_id: number) => {
  try {
    const orderDetailsRepository = getRepository(OrderDetails);

    const orderDetails = await orderDetailsRepository.findOneOrFail(order_id);

    return orderDetails;
  } catch (error) {
    if ((error as any).message.includes("OrderDetails")) {
      throw new AppError(`order id ${order_id} do not exists`, 404);
    }
  }
};
