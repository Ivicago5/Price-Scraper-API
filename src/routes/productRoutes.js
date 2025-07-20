import express from 'express';
import { handleGetProducts, handleTrackProduct} from '../controllers/productController.js';

const router = express.Router();

router.post('/track', handleTrackProduct);
router.get('/', handleGetProducts);

export default router;