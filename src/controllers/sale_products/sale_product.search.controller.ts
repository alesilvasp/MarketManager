import { Request, Response, NextFunction } from "express";
import { saleProductSearchService } from "../../services/sale_product/sale_product.search.service";

export const saleProductSearchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.params;

    const searchInfo = await saleProductSearchService(product_id);

    return res.status(200).json(searchInfo);
  } catch (err) {
    next(err);
  }
};
