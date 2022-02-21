import { getRepository } from "typeorm";
import { Product } from "../../entities";
import AppError from "../../errors/appError";

export const productUpdateService = async (product_id: number, data: any) => {
  const productRepository = getRepository(Product);
  try {
    const productToUpdate = await productRepository.findOneOrFail(product_id);

    await productRepository.save({ ...productToUpdate, ...data });
    
    return productToUpdate;
  } catch (error) {
    if ((error as any).code === "23503") {
      throw new AppError(`Category id ${data?.category} not found`, 404);
    }
    throw new AppError("Product not found!", 404);
  }
};
