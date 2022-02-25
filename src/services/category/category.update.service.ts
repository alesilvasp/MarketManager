import { getRepository } from "typeorm";
import { ProductCategory } from "../../entities";
import AppError from "../../errors/appError";

export const categoryUpdateService = async (category_id: number, data: any) => {
  const categoryRepository = getRepository(ProductCategory);
  try {
    const categoryToUpdate = await categoryRepository.findOneOrFail(
      category_id
    );

    const { category } = data;

    if (typeof category !== "string") {
      throw new AppError(`Category must be string`, 400);
    }

    const verified = category.toLowerCase();
    categoryToUpdate.category = verified;
    await categoryRepository.save(categoryToUpdate);

    const categoryUpdated = await categoryRepository.findOneOrFail(category_id);

    return categoryUpdated;
  } catch (error) {
    if ((error as any).code === "23505") {
      throw new AppError(`Category name already exists`, 409);
    }
    if ((error as any).message.includes("ProductCategory")) {
      throw new AppError(`Category id ${category_id} not found`, 404);
    }
    throw new AppError((error as any).message, (error as any).statusCode);
  }
};
