import express from 'express';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { checkFile, updateCheckFile } from '../middleware/fileCheck.js';
import { checkAdmin, checkUser } from '../middleware/authCheck.js';


const router = express.Router();



router.route('/api/products').get(getProducts).post(checkUser, checkAdmin, checkFile, addProduct);
router.route('/api/products/:id').get(getProduct).patch(checkUser, checkAdmin, updateCheckFile, updateProduct).delete(checkUser, checkAdmin, deleteProduct);


export default router;







