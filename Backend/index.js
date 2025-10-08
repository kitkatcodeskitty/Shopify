import 'dotenv/config';
import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

//mongodb connect
mongoose.connect(process.env.MONGODB_URI).then((val) => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server run and listening on port ${process.env.PORT || 5000}`);
  })
}).catch((err) => {
  console.log(err);
})
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_URL,process.env.PRODUCTION_URL]
}));
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

app.use(express.static('uploads'));
app.use(express.static('user_images'));


app.get('/', (req, res) => {
  return res.status(200).json({ message: 'welcome to backened' });
});




app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

