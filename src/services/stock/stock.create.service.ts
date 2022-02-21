import { StockProduct } from "../../entities";
import { getRepository } from "typeorm";
import { IStockProduct } from "../../interfaces/stock/stock.create.interface";
import AppError from "../../errors/appError";

export const stockCreateService = async (body: IStockProduct) => {
  const { name, stock, batch, expires_in } = body;
  const stockRepository = getRepository(StockProduct);

  const inStock = await stockRepository.findOne({ name });

  if (inStock) {
    throw new AppError("Product already registered in stock.", 409);
  }

  const stockProduct = stockRepository.create({
    name,
    stock,
    batch,
    expires_in: expires_in.split("/").reverse(),
  });

  await stockRepository.save(stockProduct);

  return stockProduct;
};
