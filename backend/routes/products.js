import express from 'express';
import { 
  getProducts, 
  getProduct, 
  getProductById,
  getCategories,
  createProduct, 
  updateProduct, 
  deleteProduct,
  uploadProductImages,
  setPrimaryImage,
  deleteProductImage,
  getProductImages
} from '../controllers/productController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:slug', getProduct);
router.get('/id/:id', getProductById);

// Image routes
router.get('/images/:product_variant_id', getProductImages);
router.post('/images/upload', authenticate, requireAdmin, uploadMultiple, uploadProductImages);
router.put('/images/:imageId/primary', authenticate, requireAdmin, setPrimaryImage);
router.delete('/images/:imageId', authenticate, requireAdmin, deleteProductImage);

// Admin routes
router.post('/', authenticate, requireAdmin, createProduct);
router.put('/:id', authenticate, requireAdmin, updateProduct);
router.delete('/:id', authenticate, requireAdmin, deleteProduct);

export default router;