import express from 'express';
import { addProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/track', addProduct);

export default router;