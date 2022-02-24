import { Any, getRepository } from "typeorm";
import AppError from "../../errors/appError";
import { Cashier, OrderDetails } from "../../entities";
import { Details } from "../../interfaces/orderDetails/orderDetails.response.interface";

export const orderDetailsCreateService = async (cashier_id: number) => {
  try {
    const orderDetailsRepository = getRepository(OrderDetails);
    const cashierRepository = getRepository(Cashier);

    const cashier = await cashierRepository.findOneOrFail(cashier_id, {
      relations: ["order_products"],
    });

    if (cashier.order_products.length <= 0) {
      throw new AppError(`The cashier is empty`, 400);
    }
    console.log("------------------", cashier);
    const newOrderDetails = orderDetailsRepository.create({
      total: cashier.subtotal,
      cashier: cashier,
      order_products: cashier.order_products,
    });

    await orderDetailsRepository.save(newOrderDetails);
    cashier.order_products = [];
    cashier.balance = cashier.balance + cashier.subtotal;
    cashier.subtotal = 0;

    await cashierRepository.save(cashier);

    const orderDetailsProducts: Details[] = [];

    const products = newOrderDetails.order_products.map((order) => {
      orderDetailsProducts.push({
        product_name: order.product.name,
        price: order.product.price,
        quantity: order.quantity,
      });
    });

    const response = {
      "invoice number": newOrderDetails.id,
      total: newOrderDetails.total,
      "issue date": newOrderDetails.created_at,
      products: orderDetailsProducts,
    };

    return response;
  } catch (error) {
    if ((error as any).message.includes("Cashier")) {
      throw new AppError(`Cashier id ${cashier_id} do not exists`, 404);
    }
    throw new AppError((error as any).message, (error as any).statusCode);
  }
};
