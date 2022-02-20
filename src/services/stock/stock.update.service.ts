import { getRepository } from "typeorm";
import { ErrorHandler } from "../../errors/errorHandler";
import { StockProduct } from "../../entities";
import { IUpdateStockProduct } from "../../interfaces/stock";

export const stockUpdateService = async (
  stock_id: string,
  qnt: IUpdateStockProduct
) => {
  const stockRepository = getRepository(StockProduct);

  const productInStock = await stockRepository.findOne(stock_id);

  if (!productInStock) {
    throw new ErrorHandler(404, "Product not found in Stock.");
  }

  let target = productInStock.stock + qnt.stock;

  if (target < 0) {
    throw new ErrorHandler(
      400,
      `Insufficient quantity in stock. Currently contains ${productInStock.stock}.`
    );
  }

  return await stockRepository.save({ ...productInStock, stock: target });
};
