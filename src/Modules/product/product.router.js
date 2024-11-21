import Router from 'express';
import { 
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProducts, 
  sortProducts 
  } from './controller/product.controller.js';

const router = Router();

router.post('/addProduct', addProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.patch('/updateProduct/:id', updateProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProducts', getProducts);
router.get('/sortProducts', sortProducts);

export default router;