import { getRepository } from "typeorm";
import { ErrorHandler } from "../../errors/errorHandler";
import { StockProduct } from "../../entities";

export const stockUpdateService = async (stock_id: string, qnt: object) => {
  const stockRepository = getRepository(StockProduct);

  const productInStock = await stockRepository.findOne(stock_id);

  if (!productInStock) {
    throw new ErrorHandler(404, "Product not found in Stock.");
  }

  return await stockRepository.save({ ...productInStock, ...qnt });
};
