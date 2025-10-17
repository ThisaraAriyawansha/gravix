import pool from '../config/database.js';

// Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [cartItems] = await pool.execute(`
      SELECT c.*, pv.size, pv.color, pv.price, pv.discount_price, 
             p.name as product_name, p.slug as product_slug,
             (SELECT image_url FROM product_images 
              WHERE product_variant_id = pv.id AND is_primary = true LIMIT 1) as image
      FROM cart c
      JOIN product_variants pv ON c.product_variant_id = pv.id
      JOIN products p ON pv.product_id = p.id
      WHERE c.user_id = ?
    `, [userId]);
    
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_variant_id, quantity } = req.body;
    
    // Check if variant exists and has stock
    const [variants] = await pool.execute(
      'SELECT stock_quantity FROM product_variants WHERE id = ?',
      [product_variant_id]
    );
    
    if (variants.length === 0) {
      return res.status(404).json({ error: 'Product variant not found' });
    }
    
    const variant = variants[0];
    
    if (variant.stock_quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }
    
    // Check if item already in cart
    const [existing] = await pool.execute(`
      SELECT * FROM cart 
      WHERE user_id = ? AND product_variant_id = ?
    `, [userId, product_variant_id]);
    
    if (existing.length > 0) {
      const newQuantity = existing[0].quantity + quantity;
      
      if (variant.stock_quantity < newQuantity) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      
      // Update quantity
      await pool.execute(`
        UPDATE cart SET quantity = ? 
        WHERE user_id = ? AND product_variant_id = ?
      `, [newQuantity, userId, product_variant_id]);
    } else {
      // Add new item
      await pool.execute(`
        INSERT INTO cart (user_id, product_variant_id, quantity) 
        VALUES (?, ?, ?)
      `, [userId, product_variant_id, quantity]);
    }
    
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;
    
    if (quantity <= 0) {
      await pool.execute(`
        DELETE FROM cart 
        WHERE id = ? AND user_id = ?
      `, [itemId, userId]);
    } else {
      // Check stock
      const [cartItems] = await pool.execute(`
        SELECT c.*, pv.stock_quantity 
        FROM cart c
        JOIN product_variants pv ON c.product_variant_id = pv.id
        WHERE c.id = ? AND c.user_id = ?
      `, [itemId, userId]);
      
      if (cartItems.length === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      
      if (cartItems[0].stock_quantity < quantity) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      
      await pool.execute(`
        UPDATE cart SET quantity = ? 
        WHERE id = ? AND user_id = ?
      `, [quantity, itemId, userId]);
    }
    
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    
    await pool.execute(`
      DELETE FROM cart 
      WHERE id = ? AND user_id = ?
    `, [itemId, userId]);
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    
    await pool.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};