import express from 'express';
import { 
  getDashboardStats, 
  getUsers, 
  updateUser, 
  getAllOrders, 
  updateOrderStatus,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
  getAllProducts,
  createProductWithImages,
  uploadVariantImages
} from '../controllers/adminController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

router.use(authenticate);
router.use(requireAdmin);

// Dashboard
router.get('/stats', getDashboardStats);

// User Management
router.get('/users', getUsers);
router.put('/users/:id', updateUser);

// Order Management
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Product Management
router.get('/products', getAllProducts);
router.post('/products/with-images', uploadMultiple, createProductWithImages);

// Product Variants Management
router.post('/variants', createProductVariant);
router.put('/variants/:id', updateProductVariant);
router.delete('/variants/:id', deleteProductVariant);

// Variant Images
router.post('/variants/images', uploadMultiple, uploadVariantImages);

export default router;