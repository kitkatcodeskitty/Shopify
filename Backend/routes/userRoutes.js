import express from 'express';
import { getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { checkImageFile, updateImageFile } from '../middleware/fileCheck.js';
import { checkUser } from '../middleware/authCheck.js';




const router = express.Router();



router.route('/api/users/login').post(loginUser);
router.route('/api/users/register').post(checkImageFile, registerUser);
router.route('/api/users/update').patch(checkUser, updateImageFile, updateUser);
router.route('/api/users/me').get(checkUser, getUser);



export default router;