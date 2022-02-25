import { getRepository } from "typeorm";
import { Product, SaleProduct, StockProduct } from "../../entities";
import { ISaleProductTransfer, InfoQnt } from "../../interfaces";
import AppError from "../../errors/appError";

export const saleProductService = async (data: ISaleProductTransfer) => {
  try {
    const saleProductRepository = getRepository(SaleProduct);
    const stockRepository = getRepository(StockProduct);
    const productRepository = getRepository(Product);
    let { name, quantity } = data;

    const product = await productRepository.findOne({
      where: { name: name.toLowerCase() },
    });

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    const sortedProducts = product.stock_product
      .filter((prod) => prod.stock > 0)
      .sort((a, b) => (a.expires_in > b.expires_in ? 1 : -1));

    let info: Array<InfoQnt> = [];
    let endPoint = sortedProducts.length;

    for (let i = 0; quantity != 0 && i < endPoint; i++) {
      let prod = sortedProducts[i];
      let qnt = prod.stock - quantity;

      if (qnt < 0) {
        await stockRepository.save({
          ...prod,
          stock: 0,
        });

        if (product.sale_product) {
          const forSale = await saleProductRepository.findOne({
            where: { id: product.sale_product.id },
          });

          await saleProductRepository.save({
            ...forSale,
            stock: forSale!.stock + quantity,
          });
        } else {
          const newSaleProduct = saleProductRepository.create({
            product: product,
            stock: prod.stock,
          });

          await saleProductRepository.save(newSaleProduct);
        }

        info.push({ qnt: prod.stock, batch: prod.batch });
        quantity = -qnt;
      } else if (qnt >= 0) {
        await stockRepository.save({
          ...prod,
          stock: prod.stock - quantity,
        });

        if (product.sale_product) {
          const forSale = await saleProductRepository.findOne({
            where: { id: product.sale_product.id },
          });

          await saleProductRepository.save({
            ...forSale,
            stock: forSale!.stock + quantity,
          });
        } else {
          const newSaleProduct = saleProductRepository.create({
            product: product,
            stock: quantity,
          });

          await saleProductRepository.save(newSaleProduct);
        }

        info.push({ qnt: quantity, batch: prod.batch });
        quantity = 0;
      }
    }

    const filtered = info.filter((n) => n.qnt > 0);

    if (filtered.length === 0) {
      throw new AppError("Product not in stock.", 404);
    }

    return filtered;
  } catch (err) {
    throw new AppError((err as any).message, (err as any).statusCode);
  }
};
