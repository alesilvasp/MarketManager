import { StockProduct } from "../../entities";
import { getRepository } from "typeorm";
import { IUpdateStockProduct } from "../../interfaces/stock/stock.update.interface";
import AppError from "../../errors/appError";

export const stockUpdateService = async (
  stock_id: string,
  body: IUpdateStockProduct
) => {
  try {
    const { batch, expires_in, stock } = body;
    const stockRepository = getRepository(StockProduct);

    const stockProduct = await stockRepository.findOne(stock_id);

    if (!stockProduct) {
      throw new AppError("Product not found in stock.", 404);
    }

    const target = stockProduct.stock + (stock || 0);

    await stockRepository.save({
      ...stockProduct,
      batch,
      stock: target,
      expires_in: expires_in?.split("/").reverse(),
    });

    return await stockRepository.findOne(stock_id);
  } catch (err) {
    throw new AppError((err as any).message, (err as any).statusCode);
  }
};
