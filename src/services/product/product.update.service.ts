import { getRepository } from "typeorm";
import { Product } from "../../entities";
import AppError from "../../errors/appError";

export const productUpdateService = async (product_id: number, data: any) => {
  const productRepository = getRepository(Product);
  try {
    const productToUpdate = await productRepository.findOneOrFail(product_id);

    const toVerify = Object.entries(data).map((item) =>
      item.map((values) =>
        typeof values === "string" ? values.toLowerCase() : values
      )
    );

    const verified = Object.fromEntries(toVerify);

    await productRepository.save({ ...productToUpdate, ...verified });

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
