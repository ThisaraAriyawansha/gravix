import express from 'express';
import { 
  createOrder, 
  getUserOrders, 
  getOrderDetails 
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderDetails);

export default router;