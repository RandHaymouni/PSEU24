import express, { NextFunction } from 'express';
import userRouter from './routes/users.router.js';
import productRouter from './routes/products.router.js';
import cors from 'cors';
import { log } from 'console';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port: number = 3000;

const logging = (req: express.Request, res: express.Response, next: NextFunction) => {
  const day = new Date().getDay();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  console.log(`The Req method is: ${req.method} , The req route is: ${req.originalUrl}, The req time: ${new Date().toLocaleTimeString()}, the req Date is: ${day} - ${month} - ${year} `);
  next();
}

const requestBodyChecking = (req: express.Request, res: express.Response, next: NextFunction) => {
  const { name, id, imageURL, wishListCounter, inStock, category, price, desc } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: 'Product name must be a non-empty string.' });
    // also can write the erroe like that => next(new Error('Product name must be a non-empty string.'))
  }

  if (typeof id !== 'number' || isNaN(id)) {
    res.status(400).json({ error: 'Product ID must be a number.' });
  }

  if (typeof imageURL !== 'string' || imageURL.trim() === '') {
    res.status(400).json({ error: 'imageURL must be a non-empty string.' });
  }

  try {
    new URL(imageURL); // validate if it's a valid URL
  } catch {
    res.status(400).json({ error: 'imageURL must be a valid URL.' });
  }

  if (typeof wishListCounter !== 'number' || wishListCounter < 0) {
    res.status(400).json({ error: 'wishListCounter must be a non-negative number.' });
  }

  if (typeof inStock !== 'boolean') {
    res.status(400).json({ error: 'inStock must be a boolean (true or false).' });
  }

  if (typeof category !== 'string' || category.trim() === '') {
    res.status(400).json({ error: 'category must be a non-empty string.' });
  }

  if (typeof price !== 'number' || price < 0 || isNaN(price)) {
    res.status(400).json({ error: 'price must be a non-negative number.' });
  }

  if (typeof desc !== 'string' || desc.trim() === '') {
    res.status(400).json({ error: 'desc must be a non-empty string.' });
  }

  next();
}

const errorHandler = (error: Error, req: express.Request, res: express.Response, next: NextFunction) => {
  console.log(`Error Caught: ${error.message}`);
  res.status(500).json({ error: error.message || 'Internal Server Error' });
}

app.use(express.json());
app.use(cors());
app.use(logging)
app.use('/users', userRouter);
app.use('/products',requestBodyChecking, productRouter);
app.use(errorHandler)

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(204).send();
});

// Catch all route
app.all('/{*notFound}', (req: express.Request, res: express.Response) => {
  res.status(404).send("Not found!");
});

app.listen(port, () => {
  console.log(`Hello express app listening on port ${port}`)
});