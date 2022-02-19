import { StockProduct } from "../../entities";
import { getRepository } from "typeorm";
import { ErrorHandler } from "../../errors/errorHandler";
import { IStockProduct } from "../../interfaces/stock/stock.create.interface";

export const stockCreateService = async ({
  name,
  stock,
  batch,
  expires_in,
}: IStockProduct) => {
  const stockRepository = getRepository(StockProduct);

  const inStock = await stockRepository.findOne({ name });

  if (inStock) {
    throw new ErrorHandler(409, "Product already registered in stock.");
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
