import pool from '../config/database.js';

// Create order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shipping_address, payment_method, customer_name, customer_phone, customer_email } = req.body;

    // Get user cart
    const [cartItems] = await pool.execute(`
      SELECT c.*, pv.price, pv.discount_price, pv.stock_quantity, p.name as product_name
      FROM cart c
      JOIN product_variants pv ON c.product_variant_id = pv.id
      JOIN products p ON pv.product_id = p.id
      WHERE c.user_id = ?
    `, [userId]);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Check stock and calculate total
    let totalAmount = 0;
    for (const item of cartItems) {
      if (item.stock_quantity < item.quantity) {
        return res.status(400).json({ 
          error: `Not enough stock for ${item.product_name} (${item.size})` 
        });
      }
      
      const price = item.discount_price || item.price;
      totalAmount += price * item.quantity;
    }

    // Generate order number
    const orderNumber = 'ORD-' + Date.now();

    // Create order
    const [orderResult] = await pool.execute(`
      INSERT INTO orders (user_id, order_number, total_amount, shipping_address, 
                         customer_name, customer_phone, customer_email, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [userId, orderNumber, totalAmount, JSON.stringify(shipping_address), 
        customer_name, customer_phone, customer_email, payment_method]);

    const orderId = orderResult.insertId;

    // Create order items and update stock
    for (const item of cartItems) {
      const finalPrice = item.discount_price || item.price;
      
      await pool.execute(`
        INSERT INTO order_items (order_id, product_variant_id, product_name, 
                               size, color, quantity, unit_price, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [orderId, item.product_variant_id, item.product_name, 
          item.size, item.color, item.quantity, finalPrice, finalPrice * item.quantity]);

      // Update stock
      await pool.execute(`
        UPDATE product_variants 
        SET stock_quantity = stock_quantity - ? 
        WHERE id = ?
      `, [item.quantity, item.product_variant_id]);
    }

    // Clear cart
    await pool.execute('DELETE FROM cart WHERE user_id = ?', [userId]);

    // Add to order history
    await pool.execute(`
      INSERT INTO order_status_history (order_id, status, notes)
      VALUES (?, 'pending', 'Order created successfully')
    `, [orderId]);

    res.json({ 
      message: 'Order created successfully', 
      orderId, 
      orderNumber,
      totalAmount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [orders] = await pool.execute(`
      SELECT o.*, 
             (SELECT status FROM order_status_history 
              WHERE order_id = o.id ORDER BY created_at DESC LIMIT 1) as current_status
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `, [userId]);
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order details
export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Get order
    const [orders] = await pool.execute(`
      SELECT o.* FROM orders o 
      WHERE o.id = ? AND (o.user_id = ? OR ? = 'admin')
    `, [id, userId, req.user.role]);
    
    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const order = orders[0];
    
    // Get order items
    const [items] = await pool.execute(`
      SELECT oi.* FROM order_items oi 
      WHERE oi.order_id = ?
    `, [id]);
    
    // Get status history
    const [history] = await pool.execute(`
      SELECT * FROM order_status_history 
      WHERE order_id = ? 
      ORDER BY created_at ASC
    `, [id]);
    
    order.items = items;
    order.history = history;
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};