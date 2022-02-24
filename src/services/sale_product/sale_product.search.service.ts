import { getRepository } from "typeorm";
import { Product, SaleProduct } from "../../entities";
import AppError from "../../errors/appError";

export const saleProductSearchService = async (product_id: string) => {
  try {
    const productRepository = getRepository(Product);
    const saleProductRepository = getRepository(SaleProduct);

    const product = await productRepository.findOne(product_id);

    if (!product) {
      throw new AppError("Product not registered.", 404);
    }

    if (!product.sale_product) {
      throw new AppError("Product not for sale.", 400);
    }

    const forSale = await saleProductRepository.findOne({
      where: {
        id: product.sale_product.id,
      },
    });

    const { sale_product, stock_product, ...productData } = product;
    const info = { ...forSale, product: productData };

    return info;
  } catch (err) {
    throw new AppError((err as any).message, (err as any).statusCode);
  }
};
