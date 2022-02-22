import { getRepository } from "typeorm";
import { Product } from "../../entities";
import AppError from "../../errors/appError";

export const productUpdateService = async (product_id: number, data: any) => {
  const productRepository = getRepository(Product);
  try {
    const productToUpdate = await productRepository.findOneOrFail(product_id);

    await productRepository.save({ ...productToUpdate, ...data });

    const productUpdated = await productRepository.findOneOrFail(product_id);

    return productUpdated;
  } catch (error) {
    if ((error as any).code === "23503") {
      throw new AppError(`Category id ${data.category} not found`, 404); // category_Id
    }
    if ((error as any).message.includes("Product")) {
      throw new AppError(`Product id ${product_id} not found`, 404);
    }
  }
};
