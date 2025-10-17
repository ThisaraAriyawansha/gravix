import pool from '../config/database.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const [products] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = true
      ORDER BY p.created_at DESC
    `);
    
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