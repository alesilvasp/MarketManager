import { getRepository } from "typeorm";
import AppError from "../../errors/appError";
import { Cashier, OrderProduct, Product } from "../../entities";
import { IOrderProductCreate } from "../../interfaces/index";

export const orderProductCreateService = async (body: IOrderProductCreate, cashier_id: number) => {
  const { product_id, quantity } = body;

  try {
    const cashierRepository = getRepository(Cashier);
    const productRepository = getRepository(Product)
    const orderProductRepository = getRepository(OrderProduct)

    const cashier = await cashierRepository.findOneOrFail(cashier_id)
    const product = await productRepository.findOneOrFail(product_id)

    const newOrderProduct = await orderProductRepository.create({
      product: product,
      quantity: quantity,
      cashier: cashier,
      // Order Detail??
      subtotal: product.price * quantity
    })
    
    // remover a quantidade da entidade for_sale

    await orderProductRepository.save(newOrderProduct);
    return newOrderProduct;
  } catch (error) {
    if ((error as any).message.includes("Cashier")) {
      throw new AppError(`Cashier id ${cashier_id} do not exists`, 404); 
    }
    if ((error as any).message.includes("Product")) {
      throw new AppError(`Product id ${product_id} do not exists`, 404); 
    }
  }
};