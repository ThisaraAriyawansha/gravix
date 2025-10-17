import pool from '../config/database.js';
import { upload } from '../middleware/upload.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { category, featured, search, minPrice, maxPrice } = req.query;
    
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = true
    `;
    let params = [];

    if (category) {
      query += ' AND c.slug = ?';
      params.push(category);
    }

    if (featured === 'true') {
      query += ' AND p.is_featured = true';
    }

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const [products] = await pool.execute(query, params);
    
    // Get variants for each product
    for (let product of products) {
      const [variants] = await pool.execute(`
        SELECT pv.*, 
               (SELECT image_url FROM product_images 
                WHERE product_variant_id = pv.id AND is_primary = true LIMIT 1) as primary_image
        FROM product_variants pv 
        WHERE pv.product_id = ? AND pv.stock_quantity > 0
      `, [product.id]);
      
      product.variants = variants;
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const [products] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.slug = ? AND p.is_active = true
    `, [slug]);
    
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = products[0];
    
    // Get all variants with images
    const [variants] = await pool.execute(`
      SELECT pv.* 
      FROM product_variants pv 
      WHERE pv.product_id = ? AND pv.stock_quantity > 0
    `, [product.id]);
    
    // Get images for each variant
    for (let variant of variants) {
      const [images] = await pool.execute(`
        SELECT * FROM product_images 
        WHERE product_variant_id = ?
      `, [variant.id]);
      variant.images = images;
    }
    
    product.variants = variants;
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get categories
export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(`
      SELECT * FROM categories WHERE is_active = true
    `);
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, category_id, is_featured } = req.body;
    
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const [result] = await pool.execute(`
      INSERT INTO products (name, slug, description, category_id, is_featured) 
      VALUES (?, ?, ?, ?, ?)
    `, [name, slug, description, category_id, is_featured || false]);
    
    res.json({ id: result.insertId, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category_id, is_featured, is_active } = req.body;
    
    await pool.execute(`
      UPDATE products 
      SET name = ?, description = ?, category_id = ?, is_featured = ?, is_active = ?
      WHERE id = ?
    `, [name, description, category_id, is_featured, is_active, id]);
    
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update product variant
export const updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, color, color_hex, price, discount_price, stock_quantity } = req.body;
    
    await pool.execute(`
      UPDATE product_variants 
      SET size = ?, color = ?, color_hex = ?, price = ?, discount_price = ?, stock_quantity = ?
      WHERE id = ?
    `, [size, color, color_hex, price, discount_price, stock_quantity, id]);
    
    res.json({ message: 'Product variant updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Upload product images
export const uploadProductImages = async (req, res) => {
  try {
    const { product_variant_id } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageResults = [];

    for (const file of files) {
      // Create image URL
      const imageUrl = `/uploads/${file.filename}`;
      
      // Insert into database
      const [result] = await pool.execute(
        'INSERT INTO product_images (product_variant_id, image_url, alt_text, is_primary) VALUES (?, ?, ?, ?)',
        [product_variant_id, imageUrl, `Product image ${file.originalname}`, false]
      );

      imageResults.push({
        id: result.insertId,
        image_url: imageUrl,
        alt_text: `Product image ${file.originalname}`,
        is_primary: false
      });
    }

    res.json({
      message: 'Images uploaded successfully',
      images: imageResults
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set primary image
export const setPrimaryImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { product_variant_id } = req.body;

    // First, set all images for this variant as non-primary
    await pool.execute(
      'UPDATE product_images SET is_primary = false WHERE product_variant_id = ?',
      [product_variant_id]
    );

    // Then set the selected image as primary
    await pool.execute(
      'UPDATE product_images SET is_primary = true WHERE id = ?',
      [imageId]
    );

    res.json({ message: 'Primary image set successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product image
export const deleteProductImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    // Get image info before deleting
    const [images] = await pool.execute(
      'SELECT * FROM product_images WHERE id = ?',
      [imageId]
    );

    if (images.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const image = images[0];

    // Delete from database
    await pool.execute('DELETE FROM product_images WHERE id = ?', [imageId]);

    // Delete file from server (optional)
    const fs = await import('fs');
    const filePath = path.join(__dirname, '..', image.image_url);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product images
export const getProductImages = async (req, res) => {
  try {
    const { product_variant_id } = req.params;

    const [images] = await pool.execute(
      'SELECT * FROM product_images WHERE product_variant_id = ? ORDER BY is_primary DESC, id ASC',
      [product_variant_id]
    );

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get product by ID (for admin editing)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [products] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [id]);
    
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = products[0];
    
    // Get all variants with images
    const [variants] = await pool.execute(`
      SELECT pv.* 
      FROM product_variants pv 
      WHERE pv.product_id = ?
    `, [product.id]);
    
    // Get images for each variant
    for (let variant of variants) {
      const [images] = await pool.execute(`
        SELECT * FROM product_images 
        WHERE product_variant_id = ?
      `, [variant.id]);
      variant.images = images;
    }
    
    product.variants = variants;
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





