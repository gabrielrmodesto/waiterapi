import { Response, Request } from 'express';
import { Product } from '../../app/models/Product';

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const {categoriesId} = req.params;

    const products = await Product.find().where('category').equals(categoriesId);

    res.json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
