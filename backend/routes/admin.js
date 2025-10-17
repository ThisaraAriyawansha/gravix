import express from 'express';
import { 
  getDashboardStats, 
  getUsers, 
  updateUser, 
  getAllOrders, 
  updateOrderStatus,
  createProductVariant
} from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(requireAdmin);

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.post('/variants', createProductVariant);

export default router;