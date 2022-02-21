import { Product, StockProduct } from "../../entities";
import { getRepository } from "typeorm";
import { IStockProduct } from "../../interfaces/stock/stock.create.interface";
import AppError from "../../errors/appError";

export const stockCreateService = async (body: IStockProduct) => {
  const { product_id, stock, batch, expires_in } = body;
  const stockRepository = getRepository(StockProduct);
  const productRepository = getRepository(Product);

  const product = await productRepository.findOne({ id: product_id });

  if (!product) {
    throw new AppError("Product not found.", 400);
  }

  const stockProduct = stockRepository.create({
    stock,
    batch,
    expires_in: expires_in.split("/").reverse(),
    product: product,
  });

  await stockRepository.save(stockProduct);

  return stockProduct;
};
