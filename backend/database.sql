CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(3, 1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert dummy products
INSERT INTO products (title, description, category, image, price, rating) VALUES
('Premium Wireless Headphones', 'High-quality noise-canceling wireless headphones with 30-hour battery life.', 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 199.99, 4.8),
('Minimalist Smartwatch', 'Sleek and stylish smartwatch with heart rate monitor and GPS.', 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 149.99, 4.5),
('Ergonomic Office Chair', 'Adjustable ergonomic chair for all-day comfort and support.', 'Furniture', 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80', 249.99, 4.6),
('Modern Ceramic Mug', 'Handcrafted ceramic mug, perfect for your morning coffee.', 'Home & Kitchen', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80', 19.99, 4.9),
('Mechanical Gaming Keyboard', 'RGB backlit mechanical keyboard with tactile switches.', 'Electronics', 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80', 89.99, 4.7),
('Classic Aviator Sunglasses', 'Polarized aviator sunglasses with UV protection.', 'Accessories', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', 45.00, 4.4),
('Leather Weekend Bag', 'Premium genuine leather duffel bag for weekend getaways.', 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', 120.00, 4.8),
('Smart Home Speaker', 'Voice-controlled smart speaker with rich sound.', 'Electronics', 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80', 79.99, 4.5),
('Organic Cotton T-Shirt', 'Ultra-soft, breathable, and sustainably sourced cotton tee.', 'Clothing', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', 25.00, 4.3),
('Stainless Steel Water Bottle', 'Insulated water bottle that keeps drinks cold for 24 hours.', 'Sports', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80', 35.00, 4.7),
('Yoga Mat with Alignment Lines', 'Non-slip eco-friendly yoga mat.', 'Sports', 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80', 40.00, 4.6),
('Noise-Canceling Earbuds', 'True wireless earbuds with active noise cancellation.', 'Electronics', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 129.99, 4.8);
