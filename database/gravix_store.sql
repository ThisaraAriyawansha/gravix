-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2025 at 05:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gravix_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_variant_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_variant_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 7, 1, '2025-10-17 08:31:10', '2025-10-17 08:31:10'),
(2, 2, 14, 1, '2025-10-17 08:34:50', '2025-10-17 08:34:50'),
(3, 1, 24, 5, '2025-10-20 04:15:46', '2025-10-20 04:15:46'),
(4, 1, 1, 3, '2025-10-20 04:16:00', '2025-10-25 13:24:17'),
(5, 4, 1, 7, '2025-10-20 11:44:45', '2025-10-20 14:39:54'),
(6, 4, 4, 4, '2025-10-20 11:52:07', '2025-10-20 11:52:07'),
(7, 4, 2, 4, '2025-10-20 11:52:18', '2025-10-20 11:52:18'),
(8, 4, 3, 4, '2025-10-20 11:52:26', '2025-10-20 11:52:26'),
(9, 4, 33, 5, '2025-10-20 12:01:49', '2025-10-20 14:39:48'),
(10, 4, 15, 1, '2025-10-20 14:33:02', '2025-10-20 14:33:02'),
(11, 4, 16, 2, '2025-10-20 14:33:15', '2025-10-20 14:40:06'),
(12, 4, 32, 1, '2025-10-20 14:39:46', '2025-10-20 14:39:46'),
(13, 4, 5, 2, '2025-10-20 14:39:56', '2025-10-31 03:28:17'),
(14, 4, 12, 2, '2025-10-20 14:40:02', '2025-10-20 14:40:30'),
(15, 4, 11, 1, '2025-10-20 14:41:32', '2025-10-20 14:41:32'),
(16, 4, 31, 2, '2025-10-22 10:19:48', '2025-10-22 13:41:51'),
(17, 4, 24, 1, '2025-10-22 13:47:25', '2025-10-22 13:47:25'),
(18, 1, 32, 6, '2025-10-22 14:08:15', '2025-10-25 09:04:00'),
(19, 1, 4, 2, '2025-10-25 09:02:40', '2025-10-25 09:02:46'),
(20, 1, 5, 1, '2025-10-25 09:02:50', '2025-10-25 09:02:50'),
(21, 1, 33, 5, '2025-10-25 09:04:05', '2025-10-25 09:04:05'),
(22, 1, 16, 1, '2025-10-25 09:05:06', '2025-10-25 09:05:06'),
(23, 1, 17, 1, '2025-10-25 09:05:11', '2025-10-25 09:05:11'),
(24, 1, 18, 1, '2025-10-25 09:05:16', '2025-10-25 09:05:16'),
(25, 1, 20, 5, '2025-10-25 09:05:33', '2025-10-25 09:05:33');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `is_active`, `created_at`) VALUES
(1, 'Men', 'men', 'Premium men\'s clothing collection', NULL, NULL, 1, '2025-10-17 07:39:49'),
(2, 'Women', 'women', 'Elegant women\'s fashion collection', NULL, NULL, 1, '2025-10-17 07:39:49'),
(3, 'Kids', 'kids', 'Comfortable kids apparel collection', NULL, NULL, 1, '2025-10-17 07:39:49');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `shipping_address` text NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `payment_method` enum('card','paypal','cod','CashOnDelivery') DEFAULT 'card',
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_number`, `total_amount`, `status`, `shipping_address`, `customer_name`, `customer_phone`, `customer_email`, `payment_method`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 2, 'ORD-2024-1001', 104.97, 'confirmed', '{\"firstName\":\"John\",\"lastName\":\"Doe\",\"address\":\"123 Main St\",\"city\":\"New York\",\"state\":\"NY\",\"postalCode\":\"10001\",\"country\":\"United States\"}', 'John Doe', '+1234567890', 'john.customer@example.com', 'card', 'paid', '2025-10-17 07:39:49', '2025-10-20 08:48:07'),
(2, 2, 'ORD-2024-1002', 79.99, 'delivered', '{\"firstName\":\"John\",\"lastName\":\"Doe\",\"address\":\"123 Main St\",\"city\":\"New York\",\"state\":\"NY\",\"postalCode\":\"10001\",\"country\":\"United States\"}', 'John Doe', '+1234567890', 'john.customer@example.com', 'paypal', 'paid', '2025-10-17 07:39:49', '2025-10-17 14:38:46'),
(3, 3, 'ORD-2024-1003', 57.99, 'cancelled', '{\"firstName\":\"Jane\",\"lastName\":\"Smith\",\"address\":\"456 Oak Ave\",\"city\":\"Los Angeles\",\"state\":\"CA\",\"postalCode\":\"90210\",\"country\":\"United States\"}', 'Jane Smith', '+1987654321', 'jane.smith@example.com', 'card', 'paid', '2025-10-17 07:39:49', '2025-10-17 14:38:50'),
(4, 1, 'ORD-1760933911083', 1553.98, 'confirmed', '{\"firstName\":\"Manoj\",\"lastName\":\"Herath\",\"address\":\"22/24 B\",\"city\":\"Matara\",\"state\":\"ABC\",\"postalCode\":\"8100\",\"country\":\"United States\"}', 'Manoj Herath', '0765566754', 'manoj@gmail.com', 'paypal', 'pending', '2025-10-20 04:18:31', '2025-10-20 08:52:39'),
(5, 1, 'ORD-1760933944740', 1553.98, 'cancelled', '{\"firstName\":\"aaa\",\"lastName\":\"aa\",\"address\":\"aaa\",\"city\":\"aa\",\"state\":\"aa\",\"postalCode\":\"11\",\"country\":\"Canada\"}', 'aaa aa', '0765566543', 'AAAAA@gmail.com', 'card', 'pending', '2025-10-20 04:19:04', '2025-10-20 08:52:41'),
(6, 4, 'ORD-1760972184842', 1087.74, 'pending', '{\"firstName\":\"Thisara\",\"lastName\":\"Ariyawansha\",\"address\":\"23/23 B\",\"city\":\"Matara\",\"state\":\"Southern\",\"postalCode\":\"81000\",\"country\":\"Sri Lanka\"}', 'Thisara Ariyawansha', '0765544321', 'thisara@gmail.com', 'paypal', 'pending', '2025-10-20 14:56:24', '2025-10-20 14:56:24'),
(7, 4, 'ORD-1760972703513', 1087.74, 'pending', '{\"firstName\":\"aa\",\"lastName\":\"aa\",\"address\":\"aa\",\"city\":\"aaa\",\"state\":\"aaa\",\"postalCode\":\"11\",\"country\":\"aaa\"}', 'aa aa', '0765566783', 'AAAAA@gmail.com', 'paypal', 'pending', '2025-10-20 15:05:03', '2025-10-20 15:05:03'),
(8, 4, 'ORD-1761127798379', 1087.74, 'pending', '{\"firstName\":\"AA\",\"lastName\":\"AAA\",\"address\":\"aa\",\"city\":\"aaa\",\"state\":\"aa\",\"postalCode\":\"12\",\"country\":\"aaa\"}', 'AA AAA', '0769417154', 'abc@gmail.com', 'paypal', 'pending', '2025-10-22 10:09:58', '2025-10-22 10:09:58'),
(9, 4, 'ORD-1761128353952', 443.91, 'pending', '{\"firstName\":\"AA\",\"lastName\":\"AAA\",\"address\":\"aa\",\"city\":\"aaa\",\"state\":\"aa\",\"postalCode\":\"12\",\"country\":\"aaa\"}', 'AA AAA', '0769417154', 'abc@gmail.com', 'paypal', 'pending', '2025-10-22 10:19:13', '2025-10-22 10:19:13'),
(10, 4, 'ORD-1761128573300', 15.00, 'pending', '{\"firstName\":\"Thisara\",\"lastName\":\"Ariyawansha\",\"address\":\"aaa\",\"city\":\"aaa\",\"state\":\"aa\",\"postalCode\":\"8100\",\"country\":\"Sri Lanka\"}', 'Thisara Ariyawansha', '0769977896', 'thisara@gmail.com', '', 'pending', '2025-10-22 10:22:53', '2025-10-22 10:22:53'),
(11, 4, 'ORD-1761140826086', 30.00, 'pending', '{\"firstName\":\"Thisara\",\"lastName\":\"Ariyawansha\",\"address\":\"12/23\",\"city\":\"Matara\",\"state\":\"Southern\",\"postalCode\":\"81000\",\"country\":\"Sri Lanka\"}', 'Thisara Ariyawansha', '0765544321', 'thisara@gmail.com', '', 'pending', '2025-10-22 13:47:06', '2025-10-22 13:47:06'),
(12, 4, 'ORD-1761140962836', 300.00, 'delivered', '{\"firstName\":\"Thisara\",\"lastName\":\"Ariyawansha\",\"address\":\"12/12 C\",\"city\":\"Matara\",\"state\":\"Southern\",\"postalCode\":\"81000\",\"country\":\"Sri Lanka\"}', 'Thisara Ariyawansha', '0754455654', 'thisara2001@gmail.com', 'CashOnDelivery', 'pending', '2025-10-22 13:49:22', '2025-10-31 03:23:32');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_variant_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `size` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_variant_id`, `product_name`, `size`, `color`, `quantity`, `unit_price`, `total_price`) VALUES
(1, 1, 2, 'Premium Cotton T-Shirt', 'M', 'Black', 2, 26.99, 53.98),
(2, 1, 9, 'Classic Denim Jeans', '32', 'Blue', 1, 79.99, 79.99),
(3, 2, 9, 'Classic Denim Jeans', '32', 'Blue', 1, 79.99, 79.99),
(4, 3, 13, 'Elegance Summer Dress', 'M', 'Red', 1, 57.99, 57.99),
(5, 9, 1, 'Premium Cotton T-Shirt', 'S', 'Black', 3, 24.99, 74.97),
(6, 9, 12, 'Elegance Summer Dress', 'S', 'Red', 2, 55.99, 111.98),
(7, 9, 11, 'Classic Denim Jeans', '36', 'Blue', 1, 79.99, 79.99),
(8, 9, 32, 'Flowy Maxi Skirt', 'S', 'Brown', 1, 20.00, 20.00),
(9, 9, 16, 'Sports Performance Shorts', 'M', 'Gray', 1, 35.99, 35.99),
(10, 9, 5, 'Premium Cotton T-Shirt', 'S', 'White', 1, 24.99, 24.99),
(11, 9, 33, 'Flowy Maxi Skirt', 'M', 'Blue', 1, 40.00, 40.00),
(12, 9, 15, 'Elegance Summer Dress', 'S', 'Navy', 1, 55.99, 55.99),
(13, 10, 31, 'Chic Crop Top', 'S', 'Green', 1, 15.00, 15.00),
(14, 11, 31, 'Chic Crop Top', 'S', 'Green', 2, 15.00, 30.00),
(15, 12, 24, 'Elegant Silk Blouse', 'L', 'Gray', 1, 300.00, 300.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_status_history`
--

CREATE TABLE `order_status_history` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `status` enum('pending','confirmed','processing','shipped','delivered','cancelled') NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_status_history`
--

INSERT INTO `order_status_history` (`id`, `order_id`, `status`, `notes`, `created_at`) VALUES
(1, 1, 'pending', 'Order placed successfully', '2025-10-17 07:39:49'),
(2, 1, 'confirmed', 'Payment received and order confirmed', '2025-10-17 07:39:49'),
(3, 1, 'processing', 'Order is being processed in warehouse', '2025-10-17 07:39:49'),
(4, 1, 'shipped', 'Order shipped via FedEx', '2025-10-17 07:39:49'),
(5, 1, 'delivered', 'Order delivered successfully', '2025-10-17 07:39:49'),
(6, 2, 'pending', 'Order placed successfully', '2025-10-17 07:39:49'),
(7, 2, 'confirmed', 'Payment received and order confirmed', '2025-10-17 07:39:49'),
(8, 2, 'processing', 'Order is being processed in warehouse', '2025-10-17 07:39:49'),
(9, 2, 'shipped', 'Order shipped via UPS', '2025-10-17 07:39:49'),
(10, 3, 'pending', 'Order placed successfully', '2025-10-17 07:39:49'),
(11, 3, 'confirmed', 'Payment received and order confirmed', '2025-10-17 07:39:49'),
(12, 3, 'processing', 'Order is being processed in warehouse', '2025-10-17 07:39:49'),
(13, 2, 'delivered', 'Status updated to delivered', '2025-10-17 14:38:46'),
(14, 3, 'cancelled', 'Status updated to cancelled', '2025-10-17 14:38:50'),
(15, 1, 'cancelled', 'Status updated to cancelled', '2025-10-20 04:00:11'),
(16, 1, 'confirmed', 'Status updated to confirmed', '2025-10-20 04:14:18'),
(17, 1, 'processing', 'Status updated to processing', '2025-10-20 04:14:21'),
(18, 1, 'shipped', 'Status updated to shipped', '2025-10-20 04:14:24'),
(19, 1, 'delivered', 'Status updated to delivered', '2025-10-20 04:14:27'),
(20, 1, 'confirmed', 'Status updated to confirmed', '2025-10-20 08:48:07'),
(21, 4, 'confirmed', 'Status updated to confirmed', '2025-10-20 08:52:39'),
(22, 5, 'cancelled', 'Status updated to cancelled', '2025-10-20 08:52:41'),
(23, 9, 'pending', 'Order created successfully', '2025-10-22 10:19:13'),
(24, 10, 'pending', 'Order created successfully', '2025-10-22 10:22:53'),
(25, 11, 'pending', 'Order created successfully', '2025-10-22 13:47:06'),
(26, 12, 'pending', 'Order created successfully', '2025-10-22 13:49:22'),
(27, 12, 'confirmed', 'Status updated to confirmed', '2025-10-31 03:23:26'),
(28, 12, 'processing', 'Status updated to processing', '2025-10-31 03:23:28'),
(29, 12, 'shipped', 'Status updated to shipped', '2025-10-31 03:23:30'),
(30, 12, 'delivered', 'Status updated to delivered', '2025-10-31 03:23:32');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `description`, `category_id`, `is_active`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 'Premium Cotton T-Shirt', 'premium-cotton-t-shirt', 'High-quality cotton t-shirt for everyday comfort. Made from 100% organic cotton.', 1, 1, 1, '2025-10-17 07:39:49', '2025-10-20 09:34:38'),
(2, 'Classic Denim Jeans', 'classic-denim-jeans', 'Vintage style denim jeans with perfect fit. Comfortable and durable for daily wear.', 1, 1, 1, '2025-10-17 07:39:49', '2025-10-20 09:00:00'),
(3, 'Elegance Summer Dress', 'elegance-summer-dress', 'Light and comfortable summer dress with elegant design. Perfect for warm weather.', 2, 1, 1, '2025-10-17 07:39:49', '2025-10-20 08:18:57'),
(4, 'Sports Performance Shorts', 'sports-performance-shorts', 'Breathable and flexible shorts for sports activities. Quick-dry material.', 1, 1, 1, '2025-10-17 07:39:49', '2025-10-20 08:20:10'),
(5, 'Kids Playful T-Shirt', 'kids-playful-t-shirt', 'Colorful and comfortable t-shirt for kids. Made from soft, child-friendly fabric.', 3, 1, 1, '2025-10-17 07:39:49', '2025-10-20 10:21:16'),
(8, 'Elegant Silk Blouse', 'elegant-silk-blouse', 'A lightweight, soft silk blouse with a relaxed fit, perfect for office or casual outings.', 2, 1, 1, '2025-10-17 15:08:31', '2025-10-20 10:24:46'),
(14, 'Chic Crop Top', 'chic-crop-top', 'Trendy crop top with short sleeves, ideal for pairing with high-waist jeans or skirts.', 2, 1, 1, '2025-10-20 11:00:34', '2025-10-20 11:00:34'),
(15, 'Flowy Maxi Skirt', 'flowy-maxi-skirt', 'Lightweight, airy skirt that moves gracefully with every step.', 2, 1, 1, '2025-10-20 11:03:34', '2025-10-20 11:03:34'),
(16, 'T-Shirt', 't-shirt', 'Soft 100% cotton tee perfect for everyday wear.', 1, 1, 1, '2025-10-31 03:22:30', '2025-10-31 03:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_variant_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `alt_text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_variant_id`, `image_url`, `is_primary`, `alt_text`) VALUES
(12, 1, '/uploads/product-1760952874348-248832113.jpg', 1, 'Product image Raven-Black-Crew-Neck-T-Shirt-06.jpg'),
(13, 2, '/uploads/product-1760955144922-930099022.jpg', 0, 'Product image Raven-Black-Crew-Neck-T-Shirt-06.jpg'),
(14, 3, '/uploads/product-1760955161646-153108235.jpg', 0, 'Product image Raven-Black-Crew-Neck-T-Shirt-06.jpg'),
(15, 4, '/uploads/product-1760955169039-801059606.jpg', 0, 'Product image Raven-Black-Crew-Neck-T-Shirt-06.jpg'),
(16, 5, '/uploads/product-1760955212583-623750741.jpeg', 0, 'Product image 227321802--1--1730889738.jpeg'),
(17, 6, '/uploads/product-1760955218741-444043891.jpeg', 0, 'Product image 227321802--1--1730889738.jpeg'),
(18, 7, '/uploads/product-1760955223490-34532893.jpeg', 0, 'Product image 227321802--1--1730889738.jpeg'),
(19, 8, '/uploads/product-1760955378914-893385484.jpg', 1, 'Product image MT31-Mens-Blue-Denim-Jeans__33041.jpg'),
(20, 9, '/uploads/product-1760955386427-879598266.jpg', 0, 'Product image MT31-Mens-Blue-Denim-Jeans__33041.jpg'),
(21, 10, '/uploads/product-1760955403472-535909837.jpg', 0, 'Product image MT31-Mens-Blue-Denim-Jeans__33041.jpg'),
(22, 11, '/uploads/product-1760955407374-167291196.jpg', 0, 'Product image MT31-Mens-Blue-Denim-Jeans__33041.jpg'),
(23, 12, '/uploads/product-1760955518941-307304850.jpg', 1, 'Product image 61gN8QqEtGL._UF894,1000_QL80_.jpg'),
(24, 13, '/uploads/product-1760955526380-736312490.jpg', 0, 'Product image 61gN8QqEtGL._UF894,1000_QL80_.jpg'),
(25, 14, '/uploads/product-1760955531555-627680459.jpg', 0, 'Product image 61gN8QqEtGL._UF894,1000_QL80_.jpg'),
(26, 15, '/uploads/product-1760955552240-213676711.jpg', 0, 'Product image 51DxLKg2RoL._AC_UF894,1000_QL80_.jpg'),
(30, 19, '/uploads/product-1760955679587-764741382.jpg', 1, 'Product image hugo_kids_hugo_t_shirt_electric_blue_1-870x1110.jpg'),
(31, 20, '/uploads/product-1760955685972-73833428.jpg', 0, 'Product image hugo_kids_hugo_t_shirt_electric_blue_1-870x1110.jpg'),
(32, 21, '/uploads/product-1760955689996-232320060.jpg', 0, 'Product image hugo_kids_hugo_t_shirt_electric_blue_1-870x1110.jpg'),
(33, 24, '/uploads/product-1760955884318-965334877.webp', 1, 'Product image Luxury_25mmSilk_Cowl_Neck_Blouse_Elegant_Draped_Long_Sleeve_Top_Silver_Grey.webp'),
(34, 25, '/uploads/product-1760955892162-260361023.jpg', 0, 'Product image green-26.jpg'),
(35, 26, '/uploads/product-1760955903977-901443759.jpeg', 0, 'Product image images.jpeg'),
(37, 31, '/uploads/product-1760958102769-321305055.webp', 1, 'Product image SLAY0271_1880x.webp'),
(38, 32, '/uploads/product-1760958241605-106478078.webp', 1, 'Product image DduXGgpS_4ce1e2ad73174bbfbf01211e571d0201.webp'),
(39, 33, '/uploads/product-1760958430215-592909678.jpg', 0, 'Product image 71HvTOM5oCL._UY1000_.jpg'),
(40, 34, '/uploads/product-1760958807179-716244964.webp', 0, 'Product image 1_4b6e9cb9-a164-4425-a88b-9d4c6a323e6f.webp'),
(41, 35, '/uploads/product-1760959096880-67852163.webp', 0, 'Product image 1_7707c743-8062-4ff1-afc6-202174e487e5.webp'),
(43, 17, '/uploads/product-1761398169850-853410683.jpg', 0, 'Product image q4wkmhrvf9_rvca,fg_1669_frt1.jpg'),
(44, 18, '/uploads/product-1761398179419-72980803.jpg', 0, 'Product image q4wkmhrvf9_rvca,fg_1669_frt1.jpg'),
(47, 16, '/uploads/product-1761398424921-386589652.jpg', 1, 'Product image z4wkwdrvf1_rvca,w_0714_dtl3.jpg'),
(48, 36, '/uploads/product-1761398438483-370427216.webp', 1, 'Product image Arrival5-ShortsWhiteA2A1M-WBBM-0394.webp'),
(49, 37, '/uploads/product-1761880963873-839981611.jpg', 1, 'Product image Cotton-White-Crew-Neck-T-Shirt-02.jpg'),
(50, 38, '/uploads/product-1761880974545-97668152.webp', 0, 'Product image model-classic-cotton-tee.webp');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `color_hex` varchar(7) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `sku` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `size`, `color`, `color_hex`, `price`, `discount_price`, `stock_quantity`, `sku`, `created_at`) VALUES
(1, 1, 'S', 'Black', '#000000', 29.99, 24.99, 47, 'TSHIRT-BLK-S', '2025-10-17 07:39:49'),
(2, 1, 'M', 'Black', '#000000', 31.99, 26.99, 45, 'TSHIRT-BLK-M', '2025-10-17 07:39:49'),
(3, 1, 'L', 'Black', '#000000', 33.99, 28.99, 40, 'TSHIRT-BLK-L', '2025-10-17 07:39:49'),
(4, 1, 'XL', 'Black', '#000000', 35.99, 30.99, 35, 'TSHIRT-BLK-XL', '2025-10-17 07:39:49'),
(5, 1, 'S', 'White', '#FFFFFF', 29.99, 24.99, 54, 'TSHIRT-WHT-S', '2025-10-17 07:39:49'),
(6, 1, 'M', 'White', '#FFFFFF', 31.99, 26.99, 50, 'TSHIRT-WHT-M', '2025-10-17 07:39:49'),
(7, 1, 'L', 'White', '#FFFFFF', 33.99, 28.99, 45, 'TSHIRT-WHT-L', '2025-10-17 07:39:49'),
(8, 2, '30', 'Blue', '#1E3A8A', 89.99, 79.99, 30, 'JEANS-BLU-30', '2025-10-17 07:39:49'),
(9, 2, '32', 'Blue', '#1E3A8A', 89.99, 79.99, 25, 'JEANS-BLU-32', '2025-10-17 07:39:49'),
(10, 2, '34', 'Blue', '#1E3A8A', 89.99, 79.99, 20, 'JEANS-BLU-34', '2025-10-17 07:39:49'),
(11, 2, '36', 'Blue', '#1E3A8A', 89.99, 79.99, 14, 'JEANS-BLU-36', '2025-10-17 07:39:49'),
(12, 3, 'S', 'Red', '#DC2626', 65.99, 55.99, 13, 'DRESS-RED-S', '2025-10-17 07:39:49'),
(13, 3, 'M', 'Red', '#DC2626', 67.99, 57.99, 12, 'DRESS-RED-M', '2025-10-17 07:39:49'),
(14, 3, 'L', 'Red', '#DC2626', 69.99, 59.99, 10, 'DRESS-RED-L', '2025-10-17 07:39:49'),
(15, 3, 'S', 'Navy', '#1E3A8A', 65.99, 55.99, 17, 'DRESS-NAV-S', '2025-10-17 07:39:49'),
(16, 4, 'M', 'Gray', '#6B7280', 35.99, NULL, 24, 'SHORTS-GRY-M', '2025-10-17 07:39:49'),
(17, 4, 'L', 'Gray', '#6B7280', 37.99, NULL, 20, 'SHORTS-GRY-L', '2025-10-17 07:39:49'),
(18, 4, 'XL', 'Gray', '#6B7280', 39.99, NULL, 15, 'SHORTS-GRY-XL', '2025-10-17 07:39:49'),
(19, 5, 'XS', 'Blue', '#3B82F6', 19.99, 15.99, 40, 'KIDS-BLU-XS', '2025-10-17 07:39:49'),
(20, 5, 'S', 'Blue', '#3B82F6', 21.99, 17.99, 35, 'KIDS-BLU-S', '2025-10-17 07:39:49'),
(21, 5, 'M', 'Blue', '#3B82F6', 23.99, 19.99, 30, 'KIDS-BLU-M', '2025-10-17 07:39:49'),
(24, 8, 'L', 'Gray', '#6B7280', 350.00, 300.00, 99, 'GX-8-L-GRAY', '2025-10-17 15:08:31'),
(25, 8, 'M', 'Green', '#16A34A', 400.00, 300.00, 50, 'GX-8-M-GREEN', '2025-10-17 15:08:31'),
(26, 8, 'XS', 'Brown', '#78350F', 100.00, 200.00, 40, 'GX-8-XS-BROWN', '2025-10-20 03:57:30'),
(31, 14, 'S', 'Green', '#16A34A', 20.00, 15.00, 1, 'GX-14-S-GREEN', '2025-10-20 11:00:34'),
(32, 15, 'S', 'Brown', '#78350F', 30.00, 20.00, 9, 'GX-15-S-BROWN', '2025-10-20 11:03:34'),
(33, 15, 'M', 'Blue', '#2563EB', 50.00, 40.00, 9, 'GX-15-M-BLUE', '2025-10-20 11:06:02'),
(34, 14, 'S', 'White', '#FFFFFF', 25.00, 20.00, 20, 'GX-14-S-WHITE', '2025-10-20 11:13:19'),
(35, 14, 'S', 'Black', '#000000', 20.00, 15.00, 40, 'GX-14-S-BLACK', '2025-10-20 11:18:09'),
(36, 4, 'XXL', 'White', '#FFFFFF', 55.00, 50.00, 20, 'GX-4-XXL-WHITE', '2025-10-25 13:18:08'),
(37, 16, 'M', 'White', '#FFFFFF', 20.00, 15.00, 10, 'GX-16-M-WHITE', '2025-10-31 03:22:30'),
(38, 16, 'M', 'Black', '#000000', 30.00, 20.00, 30, 'GX-16-M-BLACK', '2025-10-31 03:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar_url` varchar(500) DEFAULT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `full_name`, `phone`, `avatar_url`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'admin@gmail.com', '$2y$12$MxU5s1UR3U38fEuLguVkO.T8RJ9lYdW6WR/AkvTxoxfnYzu/wExyC', 'Gravix Admin', '0765544521', NULL, 'admin', 1, '2025-10-17 07:39:49', '2025-10-31 03:25:16'),
(2, 'john.customer@example.com', '$2y$12$MxU5s1UR3U38fEuLguVkO.T8RJ9lYdW6WR/AkvTxoxfnYzu/wExyC', 'John Doe', NULL, NULL, 'customer', 1, '2025-10-17 07:39:49', '2025-10-20 08:57:30'),
(3, 'jane.smith@example.com', '$2b$10$ExampleHashForCustomer456', 'Jane Smith', NULL, NULL, 'customer', 1, '2025-10-17 07:39:49', '2025-10-20 07:20:45'),
(4, 'thisara@gmail.com', '$2a$10$l2JRWxXGfVPlsMUuti2BuOgL/KO8m5z06XEccsz/O0vpyBTk//HvK', 'Thisara ', '07566778367', NULL, 'customer', 1, '2025-10-20 11:43:49', '2025-10-22 12:01:30'),
(5, 'abc@gmail.com', '$2a$10$Hnn00P0.ipntkEedYAsY9ODnWzxOdq66bbDFALJoCdAHIdf3QYqBK', 'abc', '0765544323', NULL, 'customer', 1, '2025-10-22 13:17:56', '2025-10-31 03:25:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_item` (`user_id`,`product_variant_id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- Indexes for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_status_history`
--
ALTER TABLE `order_status_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`);

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`);

--
-- Constraints for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `user_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
