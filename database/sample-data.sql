USE gravix_store;

-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
('Men', 'men', 'Premium men''s clothing collection'),
('Women', 'women', 'Elegant women''s fashion collection'),
('Kids', 'kids', 'Comfortable kids apparel collection');

-- Insert Admin User (password: admin123)
INSERT INTO users (email, password, full_name, role) VALUES
('admin@gravix.com', '$2b$10$ExampleHashForAdmin123', 'Gravix Admin', 'admin'),
('john.customer@example.com', '$2b$10$ExampleHashForCustomer123', 'John Doe', 'customer'),
('jane.smith@example.com', '$2b$10$ExampleHashForCustomer456', 'Jane Smith', 'customer');

-- Insert Sample Products
INSERT INTO products (name, slug, description, category_id, is_featured) VALUES
('Premium Cotton T-Shirt', 'premium-cotton-tshirt', 'High-quality cotton t-shirt for everyday comfort. Made from 100% organic cotton.', 1, TRUE),
('Classic Denim Jeans', 'classic-denim-jeans', 'Vintage style denim jeans with perfect fit. Comfortable and durable for daily wear.', 1, TRUE),
('Elegance Summer Dress', 'elegance-summer-dress', 'Light and comfortable summer dress with elegant design. Perfect for warm weather.', 2, TRUE),
('Sports Performance Shorts', 'sports-performance-shorts', 'Breathable and flexible shorts for sports activities. Quick-dry material.', 1, FALSE),
('Kids Playful T-Shirt', 'kids-playful-tshirt', 'Colorful and comfortable t-shirt for kids. Made from soft, child-friendly fabric.', 3, TRUE);

-- Insert Product Variants (Different prices for sizes)
INSERT INTO product_variants (product_id, size, color, color_hex, price, discount_price, stock_quantity, sku) VALUES
-- T-Shirt variants
(1, 'S', 'Black', '#000000', 29.99, 24.99, 50, 'TSHIRT-BLK-S'),
(1, 'M', 'Black', '#000000', 31.99, 26.99, 45, 'TSHIRT-BLK-M'),
(1, 'L', 'Black', '#000000', 33.99, 28.99, 40, 'TSHIRT-BLK-L'),
(1, 'XL', 'Black', '#000000', 35.99, 30.99, 35, 'TSHIRT-BLK-XL'),
(1, 'S', 'White', '#FFFFFF', 29.99, 24.99, 55, 'TSHIRT-WHT-S'),
(1, 'M', 'White', '#FFFFFF', 31.99, 26.99, 50, 'TSHIRT-WHT-M'),
(1, 'L', 'White', '#FFFFFF', 33.99, 28.99, 45, 'TSHIRT-WHT-L'),

-- Jeans variants
(2, '30', 'Blue', '#1E3A8A', 89.99, 79.99, 30, 'JEANS-BLU-30'),
(2, '32', 'Blue', '#1E3A8A', 89.99, 79.99, 25, 'JEANS-BLU-32'),
(2, '34', 'Blue', '#1E3A8A', 89.99, 79.99, 20, 'JEANS-BLU-34'),
(2, '36', 'Blue', '#1E3A8A', 89.99, 79.99, 15, 'JEANS-BLU-36'),

-- Dress variants
(3, 'S', 'Red', '#DC2626', 65.99, 55.99, 15, 'DRESS-RED-S'),
(3, 'M', 'Red', '#DC2626', 67.99, 57.99, 12, 'DRESS-RED-M'),
(3, 'L', 'Red', '#DC2626', 69.99, 59.99, 10, 'DRESS-RED-L'),
(3, 'S', 'Navy', '#1E3A8A', 65.99, 55.99, 18, 'DRESS-NAV-S'),

-- Shorts variants
(4, 'M', 'Gray', '#6B7280', 35.99, NULL, 25, 'SHORTS-GRY-M'),
(4, 'L', 'Gray', '#6B7280', 37.99, NULL, 20, 'SHORTS-GRY-L'),
(4, 'XL', 'Gray', '#6B7280', 39.99, NULL, 15, 'SHORTS-GRY-XL'),

-- Kids T-Shirt variants
(5, 'XS', 'Blue', '#3B82F6', 19.99, 15.99, 40, 'KIDS-BLU-XS'),
(5, 'S', 'Blue', '#3B82F6', 21.99, 17.99, 35, 'KIDS-BLU-S'),
(5, 'M', 'Blue', '#3B82F6', 23.99, 19.99, 30, 'KIDS-BLU-M');

-- Insert Sample Product Images
INSERT INTO product_images (product_variant_id, image_url, is_primary, alt_text) VALUES
(1, '/images/tshirt-black-1.jpg', TRUE, 'Black Cotton T-Shirt front view'),
(1, '/images/tshirt-black-2.jpg', FALSE, 'Black Cotton T-Shirt side view'),
(2, '/images/tshirt-black-1.jpg', TRUE, 'Black Cotton T-Shirt front view'),
(5, '/images/tshirt-white-1.jpg', TRUE, 'White Cotton T-Shirt front view'),
(8, '/images/jeans-blue-1.jpg', TRUE, 'Classic Blue Jeans front view'),
(12, '/images/dress-red-1.jpg', TRUE, 'Red Summer Dress front view'),
(16, '/images/shorts-gray-1.jpg', TRUE, 'Gray Sports Shorts front view'),
(19, '/images/kids-tshirt-blue-1.jpg', TRUE, 'Blue Kids T-Shirt front view');

-- Insert Sample Orders
INSERT INTO orders (user_id, order_number, total_amount, status, shipping_address, customer_name, customer_phone, customer_email, payment_method, payment_status) VALUES
(2, 'ORD-2024-1001', 104.97, 'delivered', '{"firstName":"John","lastName":"Doe","address":"123 Main St","city":"New York","state":"NY","postalCode":"10001","country":"United States"}', 'John Doe', '+1234567890', 'john.customer@example.com', 'card', 'paid'),
(2, 'ORD-2024-1002', 79.99, 'shipped', '{"firstName":"John","lastName":"Doe","address":"123 Main St","city":"New York","state":"NY","postalCode":"10001","country":"United States"}', 'John Doe', '+1234567890', 'john.customer@example.com', 'paypal', 'paid'),
(3, 'ORD-2024-1003', 57.99, 'processing', '{"firstName":"Jane","lastName":"Smith","address":"456 Oak Ave","city":"Los Angeles","state":"CA","postalCode":"90210","country":"United States"}', 'Jane Smith', '+1987654321', 'jane.smith@example.com', 'card', 'paid');

-- Insert Sample Order Items
INSERT INTO order_items (order_id, product_variant_id, product_name, size, color, quantity, unit_price, total_price) VALUES
(1, 2, 'Premium Cotton T-Shirt', 'M', 'Black', 2, 26.99, 53.98),
(1, 9, 'Classic Denim Jeans', '32', 'Blue', 1, 79.99, 79.99),
(2, 9, 'Classic Denim Jeans', '32', 'Blue', 1, 79.99, 79.99),
(3, 13, 'Elegance Summer Dress', 'M', 'Red', 1, 57.99, 57.99);

-- Insert Sample Order Status History
INSERT INTO order_status_history (order_id, status, notes) VALUES
(1, 'pending', 'Order placed successfully'),
(1, 'confirmed', 'Payment received and order confirmed'),
(1, 'processing', 'Order is being processed in warehouse'),
(1, 'shipped', 'Order shipped via FedEx'),
(1, 'delivered', 'Order delivered successfully'),
(2, 'pending', 'Order placed successfully'),
(2, 'confirmed', 'Payment received and order confirmed'),
(2, 'processing', 'Order is being processed in warehouse'),
(2, 'shipped', 'Order shipped via UPS'),
(3, 'pending', 'Order placed successfully'),
(3, 'confirmed', 'Payment received and order confirmed'),
(3, 'processing', 'Order is being processed in warehouse');