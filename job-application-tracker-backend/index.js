import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import router from './Routes/jobs-router.js';
import userRouter from './Routes/userRouter.js';

const DATABASE_URL = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/jobs`;

const PORT = 8000;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json());
app.use(router);
app.use(userRouter);

await connectDB(DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});