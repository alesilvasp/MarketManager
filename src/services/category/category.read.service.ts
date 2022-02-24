import { getRepository } from "typeorm";
import { ProductCategory } from "../../entities";

export const categoryReadService = async () => {
  const categoryRepository = getRepository(ProductCategory);

  const category = await categoryRepository.find();

  return category;
};
