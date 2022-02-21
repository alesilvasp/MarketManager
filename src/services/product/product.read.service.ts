import { getRepository } from "typeorm";
import { Product } from "../../entities";

export const productReadService = async () => {
  const productRepository = getRepository(Product);

  const products = await productRepository.find();

  return products;
};
