import pool from '../config/database.js';

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

// Create product variant
export const createProductVariant = async (req, res) => {
  try {
    const { product_id, size, color, color_hex, price, discount_price, stock_quantity } = req.body;
    
    const sku = `${product_id}-${size}-${color}`.toUpperCase();
    
    const [result] = await pool.execute(`
      INSERT INTO product_variants (product_id, size, color, color_hex, price, discount_price, stock_quantity, sku)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [product_id, size, color, color_hex, price, discount_price, stock_quantity, sku]);
    
    res.json({ id: result.insertId, message: 'Product variant created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};