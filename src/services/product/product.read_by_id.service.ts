import { getRepository } from "typeorm";
import { Product } from "../../entities";
import AppError from "../../errors/appError";

export const productReadByIdService = async (product_id: number) => {
  const productRepository = getRepository(Product);
  try {
    const product = await productRepository.findOneOrFail({ id: product_id });

    return product;
  } catch (error) {
    throw new AppError(`Product id ${product_id} not found`, 404);
  }
};
