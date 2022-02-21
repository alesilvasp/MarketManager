import { getRepository } from "typeorm";
import AppError from "../../errors/appError";
import { ProductCategory } from "../../entities";

export const categoryCreateService = async (category: string) => {
  try {
    const categoryRepository = getRepository(ProductCategory);
    const newCategory = categoryRepository.create({
      category,
      products: [],
    });

    await categoryRepository.save(newCategory);

    return newCategory;
  } catch (error) {
    throw new AppError("Category already registered.", 409);
  }
};
