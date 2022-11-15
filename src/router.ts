import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import { createCategory } from './useCases/categories/createCategory';
import { listCategories } from './useCases/categories/listCategories';
import { createProduct } from './useCases/products/createProduct';
import { listProducts } from './useCases/products/listProducts';
import { listProductsByCategory } from './useCases/categories/listProductsByCategory';
import { listOrders } from './useCases/order/listOrders';
import { createOrder } from './useCases/order/createOrder';
import { changeOrderStatus } from './useCases/order/changeOrderStatus';
import { cancelOrder } from './useCases/order/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.get('/products', listProducts);
router.post('/products', upload.single('image'), createProduct);
router.get('/categories/:categoriesId/products', listProductsByCategory);
router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.patch('/orders/:orderId', changeOrderStatus);
router.delete('/orders/:orderId', cancelOrder);
