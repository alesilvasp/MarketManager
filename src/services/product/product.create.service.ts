import { getRepository } from "typeorm";
import AppError from "../../errors/appError";
import { Product, ProductCategory } from "../../entities";
import { IProductCreate } from "../../interfaces";

export const productCreateService = async (body: IProductCreate) => {
  const { name, description, price, unit, category_id } = body;

  try {
    const productRepository = getRepository(Product);
    const categoryRepository = getRepository(ProductCategory);

    const categoryFind = await categoryRepository.findOneOrFail({
      id: category_id,
    });

    const newProduct = productRepository.create({
      name,
      description,
      price,
      unit,
      category: categoryFind,
      stock_product: [],
      order_products: [],
      returned: [],
    });

    await productRepository.save(newProduct);
    return newProduct;
  } catch (error) {
    throw new AppError("Category not found", 404);
  }
};
