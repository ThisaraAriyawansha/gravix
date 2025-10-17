-- Useful Queries for GRAVIX Store

-- 1. Get all active products with their variants and primary images
SELECT 
    p.id,
    p.name,
    p.slug,
    p.description,
    c.name as category_name,
    pv.size,
    pv.color,
    pv.price,
    pv.discount_price,
    pv.stock_quantity,
    pi.image_url as primary_image
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_images pi ON pv.id = pi.product_variant_id AND pi.is_primary = true
WHERE p.is_active = true AND pv.stock_quantity > 0
ORDER BY p.created_at DESC;

-- 2. Get product details with all variants and images
SELECT 
    p.*,
    c.name as category_name,
    pv.id as variant_id,
    pv.size,
    pv.color,
    pv.color_hex,
    pv.price,
    pv.discount_price,
    pv.stock_quantity,
    pv.sku,
    pi.image_url,
    pi.is_primary,
    pi.alt_text
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_images pi ON pv.id = pi.product_variant_id
WHERE p.slug = 'premium-cotton-tshirt'
AND p.is_active = true
ORDER BY pv.size, pv.color;

-- 3. Get user cart with product information
SELECT 
    c.id as cart_item_id,
    c.quantity,
    p.name as product_name,
    p.slug as product_slug,
    pv.size,
    pv.color,
    pv.price,
    pv.discount_price,
    (pv.discount_price OR pv.price) * c.quantity as item_total,
    pi.image_url
FROM cart c
JOIN product_variants pv ON c.product_variant_id = pv.id
JOIN products p ON pv.product_id = p.id
LEFT JOIN product_images pi ON pv.id = pi.product_variant_id AND pi.is_primary = true
WHERE c.user_id = 2;

-- 4. Get order details with items and status history
SELECT 
    o.*,
    oi.product_name,
    oi.size,
    oi.color,
    oi.quantity,
    oi.unit_price,
    oi.total_price,
    osh.status as history_status,
    osh.notes as history_notes,
    osh.created_at as status_date
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN order_status_history osh ON o.id = osh.order_id
WHERE o.id = 1
ORDER BY osh.created_at ASC;

-- 5. Sales report by product
SELECT 
    p.name as product_name,
    pv.size,
    pv.color,
    SUM(oi.quantity) as total_sold,
    SUM(oi.total_price) as total_revenue,
    AVG(oi.unit_price) as average_price
FROM order_items oi
JOIN product_variants pv ON oi.product_variant_id = pv.id
JOIN products p ON pv.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'delivered'
GROUP BY p.name, pv.size, pv.color
ORDER BY total_revenue DESC;

-- 6. Low stock alert
SELECT 
    p.name as product_name,
    pv.size,
    pv.color,
    pv.stock_quantity,
    pv.sku
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
WHERE pv.stock_quantity < 10
AND p.is_active = true
ORDER BY pv.stock_quantity ASC;

-- 7. Customer order history
SELECT 
    u.full_name,
    u.email,
    o.order_number,
    o.total_amount,
    o.status,
    o.created_at,
    COUNT(oi.id) as item_count
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE u.id = 2
GROUP BY o.id
ORDER BY o.created_at DESC;

-- 8. Monthly sales report
SELECT 
    YEAR(o.created_at) as year,
    MONTH(o.created_at) as month,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_sales,
    AVG(o.total_amount) as average_order_value
FROM orders o
WHERE o.status = 'delivered'
GROUP BY YEAR(o.created_at), MONTH(o.created_at)
ORDER BY year DESC, month DESC;

-- 9. Popular products (best sellers)
SELECT 
    p.name as product_name,
    pv.size,
    pv.color,
    SUM(oi.quantity) as total_quantity_sold,
    SUM(oi.total_price) as total_revenue
FROM order_items oi
JOIN product_variants pv ON oi.product_variant_id = pv.id
JOIN products p ON pv.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'delivered'
GROUP BY p.name, pv.size, pv.color
ORDER BY total_quantity_sold DESC
LIMIT 10;

-- 10. User activity report
SELECT 
    u.full_name,
    u.email,
    u.created_at as registration_date,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_spent,
    MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'delivered'
WHERE u.role = 'customer'
GROUP BY u.id
ORDER BY total_spent DESC;