import express from 'express';
import bootsrtap from './src/bootsrtap.js';

const app = express();
const port = 3000;

bootsrtap(express, app);

app.listen(port, () => {
  console.log(`Server Is Running at ${port}`);
});