# Full-Stack Modern E-Commerce Website

This is a visually stunning, responsive, and professional e-commerce platform designed for a placement portfolio.

## Technologies Used
- **Frontend:** React.js (Vite), Tailwind CSS, Framer Motion, Lucide React, React Router, Context API
- **Backend:** Core PHP, REST-like API endpoints
- **Database:** MySQL

## Prerequisites
- **Node.js:** For running the frontend development server.
- **XAMPP / WAMP / MAMP:** Or any local server environment with PHP and MySQL support.

## Setup Instructions

### 1. Database Setup
1. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin).
2. Create a database named `ecommerce_db` if you haven't already.
3. Import the `backend/database.sql` file. This script will create the necessary tables (`users`, `products`, `cart`) and insert dummy products.

### 2. Backend Setup
1. Move the `backend` folder to your local server's document root (e.g., `htdocs` for XAMPP, `www` for WAMP). 
   - *Alternatively, you can run the built-in PHP server by navigating to the `backend` folder in your terminal and running:* 
     `php -S localhost:8000`
2. Open `backend/config/db.php` and verify your MySQL credentials (default is `root` with no password).

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL (usually `http://localhost:5173`) in your browser.

## Features
- Premium glassmorphism and soft shadow UI
- Dark / Light mode toggle
- Responsive design for Desktop, Tablet, and Mobile
- Smooth page transitions and hover effects with Framer Motion
- Working product catalog and shopping cart (synced with PHP/MySQL backend)
- User Authentication (Registration and Login)

## Deployment Guidance
- **Frontend:** Build the project using `npm run build`. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages.
- **Backend & Database:** Upload the PHP files to a shared hosting provider (like Hostinger, GoDaddy, or Heroku with PHP support). Import the `database.sql` to your remote MySQL server and update `backend/config/db.php` with the new remote credentials.
