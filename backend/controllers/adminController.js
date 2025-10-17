import pool from '../config/database.js';
import { uploadMultiple } from '../middleware/upload.js';

// Admin dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // Total sales
    const [salesResult] = await pool.execute(`
      SELECT COALESCE(SUM(total_amount), 0) as total_sales 
      FROM orders 
      WHERE status != 'cancelled'
    `);
    
    // Total orders
    const [ordersResult] = await pool.execute(`
      SELECT COUNT(*) as total_orders FROM orders
    `);
    
    // Total products
    const [productsResult] = await pool.execute(`
      SELECT COUNT(*) as total_products FROM products WHERE is_active = true
    `);
    
    // Total users
    const [usersResult] = await pool.execute(`
      SELECT COUNT(*) as total_users FROM users WHERE role = 'customer'
    `);
    
    // Recent orders
    const [recentOrders] = await pool.execute(`
      SELECT o.*, u.full_name 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC 
      LIMIT 10
    `);
    
    // Monthly sales
    const [monthlySales] = await pool.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        SUM(total_amount) as monthly_sales,
        COUNT(*) as order_count
      FROM orders 
      WHERE status != 'cancelled'
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month DESC
      LIMIT 6
    `);
    
    res.json({
      stats: {
        totalSales: salesResult[0].total_sales,
        totalOrders: ordersResult[0].total_orders,
        totalProducts: productsResult[0].total_products,
        totalUsers: usersResult[0].total_users
      },
      recentOrders,
      monthlySales
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const [users] = await pool.execute(`
      SELECT id, email, full_name, phone, role, is_active, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, is_active } = req.body;
    
    await pool.execute(`
      UPDATE users SET role = ?, is_active = ? 
      WHERE id = ?
    `, [role, is_active, id]);
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.execute(`
      SELECT o.*, u.full_name, u.email 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC
    `);
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    // Update order status
    await pool.execute(`
      UPDATE orders SET status = ? WHERE id = ?
    `, [status, id]);
    
    // Add to history
    await pool.execute(`
      INSERT INTO order_status_history (order_id, status, notes)
      VALUES (?, ?, ?)
    `, [id, status, notes || `Status updated to ${status}`]);
    
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Create product with images
export const createProductWithImages = async (req, res) => {
  try {
    const { name, description, category_id, is_featured, is_active, variants } = req.body;
    
    // Generate slug from name
    const slug = name.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    
    // Create main product
    const [productResult] = await pool.execute(`
      INSERT INTO products (name, slug, description, category_id, is_featured, is_active) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, slug, description, category_id, is_featured || false, is_active !== false]);

    const productId = productResult.insertId;

    // Create variants
    const variantResults = [];
    for (const variant of JSON.parse(variants)) {
      const sku = `GX-${productId}-${variant.size}-${variant.color}`.toUpperCase().replace(/ /g, '');
      
      const [variantResult] = await pool.execute(`
        INSERT INTO product_variants 
        (product_id, size, color, color_hex, price, discount_price, stock_quantity, sku)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        productId, 
        variant.size, 
        variant.color, 
        variant.color_hex, 
        variant.price, 
        variant.discount_price || null, 
        variant.stock_quantity, 
        sku
      ]);

      variantResults.push({
        id: variantResult.insertId,
        sku: sku
      });
    }

    res.json({ 
      id: productId, 
      message: 'Product created successfully',
      slug: slug,
      variants: variantResults
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle image upload for product variant
export const uploadVariantImages = async (req, res) => {
  try {
    const { product_variant_id } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageResults = [];

    for (const file of files) {
      const imageUrl = `/uploads/${file.filename}`;
      
      // Check if this is the first image for this variant (set as primary)
      const [existingImages] = await pool.execute(
        'SELECT COUNT(*) as count FROM product_images WHERE product_variant_id = ?',
        [product_variant_id]
      );

      const isPrimary = existingImages[0].count === 0;

      const [result] = await pool.execute(
        'INSERT INTO product_images (product_variant_id, image_url, alt_text, is_primary) VALUES (?, ?, ?, ?)',
        [product_variant_id, imageUrl, `Product variant image`, isPrimary]
      );

      imageResults.push({
        id: result.insertId,
        image_url: imageUrl,
        alt_text: `Product variant image`,
        is_primary: isPrimary
      });
    }

    res.json({
      message: 'Variant images uploaded successfully',
      images: imageResults
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create product variant
export const createProductVariant = async (req, res) => {
  try {
    const { product_id, size, color, color_hex, price, discount_price, stock_quantity } = req.body;
    
    // Generate SKU
    const sku = `GX-${product_id}-${size}-${color}`.toUpperCase().replace(/ /g, '');
    
    // Check if variant already exists
    const [existing] = await pool.execute(`
      SELECT id FROM product_variants 
      WHERE product_id = ? AND size = ? AND color = ?
    `, [product_id, size, color]);
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Variant with this size and color already exists' });
    }
    
    const [result] = await pool.execute(`
      INSERT INTO product_variants 
      (product_id, size, color, color_hex, price, discount_price, stock_quantity, sku)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [product_id, size, color, color_hex, price, discount_price || null, stock_quantity, sku]);
    
    res.json({ 
      id: result.insertId, 
      message: 'Product variant created successfully',
      sku: sku
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product variant
export const updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, color, color_hex, price, discount_price, stock_quantity } = req.body;
    
    // Check if variant exists
    const [variants] = await pool.execute(
      'SELECT * FROM product_variants WHERE id = ?',
      [id]
    );
    
    if (variants.length === 0) {
      return res.status(404).json({ error: 'Product variant not found' });
    }
    
    // Check for duplicate size/color combination (excluding current variant)
    const [duplicates] = await pool.execute(`
      SELECT id FROM product_variants 
      WHERE product_id = ? AND size = ? AND color = ? AND id != ?
    `, [variants[0].product_id, size, color, id]);
    
    if (duplicates.length > 0) {
      return res.status(400).json({ error: 'Another variant with this size and color already exists' });
    }
    
    // Update variant
    await pool.execute(`
      UPDATE product_variants 
      SET size = ?, color = ?, color_hex = ?, price = ?, 
          discount_price = ?, stock_quantity = ?
      WHERE id = ?
    `, [size, color, color_hex, price, discount_price || null, stock_quantity, id]);
    
    res.json({ message: 'Product variant updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product variant
export const deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if variant exists
    const [variants] = await pool.execute(
      'SELECT * FROM product_variants WHERE id = ?',
      [id]
    );
    
    if (variants.length === 0) {
      return res.status(404).json({ error: 'Product variant not found' });
    }
    
    // Check if variant is in any orders
    const [orderItems] = await pool.execute(
      'SELECT id FROM order_items WHERE product_variant_id = ? LIMIT 1',
      [id]
    );
    
    if (orderItems.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete variant that has been ordered. Consider setting stock to 0 instead.' 
      });
    }
    
    await pool.execute('DELETE FROM product_variants WHERE id = ?', [id]);
    
    res.json({ message: 'Product variant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products with full details (admin)
export const getAllProducts = async (req, res) => {
  try {
    const [products] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.created_at DESC
    `);
    
    // Get variants for each product
    for (let product of products) {
      const [variants] = await pool.execute(`
        SELECT pv.* 
        FROM product_variants pv 
        WHERE pv.product_id = ?
      `, [product.id]);
      
      product.variants = variants;
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};