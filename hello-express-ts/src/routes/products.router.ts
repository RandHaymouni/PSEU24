import express, { NextFunction } from 'express';
import productController from '../controllers/products.controller.js'

const router = express.Router();

router.post('/', (req: express.Request<any, any, Store.IProduct>, res: express.Response, next: NextFunction) => {
  const product = req.body;
  const result = productController.createProduct(product);
  if (!result.success) {
    res.status(400).json(result.errors);
    //OR next(new Error(result.errors));
  } else {
    if (Math.random() < 0.5)
      next(new Error('Random error occurred while creating product!'));
    res.status(201).json({ message: 'Product created', product: req.body });
  }


});

router.get("/", (req, res) => {
  const products = productController.getAllProducts();
  res.json(products);
})

export default router;