import { getRepository } from "typeorm";
import AppError from "../../errors/appError";
import {
  Cashier,
  OrderProduct,
  Product,
  SaleProduct,
  ReturnedProduct,
} from "../../entities";
import { IOrderProductDelete } from "../../interfaces";

export const orderProductDeleteService = async (
  product_id: number,
  data: IOrderProductDelete
) => {
  try {
    const { cashier, quantity, discard } = data;

    const orderProductRepository = getRepository(OrderProduct);
    const cashierRepository = getRepository(Cashier);
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(product_id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const orderProduct = await orderProductRepository.find({
      product: { id: product_id },
      cashier: { id: cashier },
    });

    const inCashier = await cashierRepository.findOneOrFail(cashier);

    let totalItems = 0;

    orderProduct.map((obj) => (totalItems += obj.quantity));

    if (totalItems < quantity) {
      throw new AppError("Quantity to remove beyond allowed", 400);
    }

    let unitPrice = Number(
      (orderProduct[0].subtotal / orderProduct[0].quantity).toFixed(2)
    );

    let totalPrice = Number((unitPrice * quantity).toFixed(2));

    inCashier.subtotal -= totalPrice;

    await cashierRepository.save(inCashier);

    if (discard) {
      const returnedProductRepository = getRepository(ReturnedProduct);

      const toReturn = returnedProductRepository.create({
        created_at: new Date(),
        product: product,
        quantity: quantity,
        subtotal: totalPrice,
      });

      await returnedProductRepository.save(toReturn);
    } else {
      const saleProductRepository = getRepository(SaleProduct);

      const forSale = await saleProductRepository.findOneOrFail({
        where: { id: product.sale_product.id },
      });

      await saleProductRepository.save({
        ...forSale,
        stock: forSale.stock + quantity,
      });
    }

    let endPoint = orderProduct.length;
    let ref = quantity;
    let toDelete = [];

    for (let i = 0; i < endPoint; i++) {
      let prod = orderProduct[i];
      let qnt = prod.quantity - ref;

      if (qnt < 0) {
        toDelete.push(i);
        ref -= prod.quantity;
      } else {
        const patchOrder = await orderProductRepository.findOneOrFail(prod.id);

        patchOrder.quantity -= ref;
        patchOrder.subtotal = Number(
          (patchOrder.quantity * unitPrice).toFixed(2)
        );
        await orderProductRepository.save(patchOrder);
      }
    }

    for (let i = 0; i < toDelete.length; i++) {
      await orderProductRepository.delete(orderProduct[i].id);
    }
    return `${quantity} ${product.name} was returned, deducing R$ ${totalPrice} from the total price.`;
  } catch (err) {
    throw new AppError((err as any).message, (err as any).statusCode);
  }
};
