import { getRepository } from "typeorm";
import AppError from "../../errors/appError";
import { Cashier, OrderProduct, Product, SaleProduct } from "../../entities";
import { IOrderProductCreate } from "../../interfaces/index";

export const orderProductCreateService = async (
  body: IOrderProductCreate,
  cashier_id: number
) => {
  const { product_id, quantity } = body;

  try {
    const cashierRepository = getRepository(Cashier);
    const productRepository = getRepository(Product);
    const orderProductRepository = getRepository(OrderProduct);
    const saleProductRepository = getRepository(SaleProduct);

    const cashier = await cashierRepository.findOneOrFail(cashier_id);
    const product = await productRepository.findOneOrFail(product_id);
    const sale_product = await saleProductRepository.findOneOrFail(
      product.sale_product
    );

    const newOrderProduct = orderProductRepository.create({
      product: product,
      quantity: quantity,
      cashier: cashier,
      subtotal: Number((product.price * quantity).toFixed(2)),
    });

    sale_product.stock -= quantity;
    cashier.subtotal += newOrderProduct.subtotal;

    await saleProductRepository.save(sale_product);
    await cashierRepository.save(cashier);

    await orderProductRepository.save(newOrderProduct);

    const orderProductDetails = await orderProductRepository.findOneOrFail(
      {
        id: newOrderProduct.id,
      },
      { relations: ["cashier"] }
    );

    return orderProductDetails;
  } catch (error) {
    if ((error as any).message.includes("Cashier")) {
      throw new AppError(`Cashier id ${cashier_id} do not exists`, 404);
    }
    if ((error as any).message.includes("Product")) {
      throw new AppError(`Product id ${product_id} do not exists`, 404);
    }
  }
};
