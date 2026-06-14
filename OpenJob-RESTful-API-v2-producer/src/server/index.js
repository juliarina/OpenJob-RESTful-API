import express from 'express';
import 'dotenv/config';
import router from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';

const app = express();

app.use(express.json());
app.use(router);
app.use(ErrorHandler)

export default app;