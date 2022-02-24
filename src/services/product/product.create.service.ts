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
    if ((error as any).code === "23505") {
      throw new AppError(`Product ${name} already exists`, 409); 
    }
    throw new AppError(`Category id ${category_id} not found`, 404);
  }
};
