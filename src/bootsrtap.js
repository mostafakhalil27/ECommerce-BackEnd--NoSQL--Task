import connection  from './DB/connection.js';
import userRouter from './Modules/user/user.router.js';
import productRouter from './Modules/product/product.router.js';

function bootsrtap (express, app) {
  app.use(express.json());
  app.use(userRouter);
  app.use(productRouter);
  connection()
};

export default bootsrtap;