# 🛒 ShopNest - Full-Stack MERN E-Commerce Platform

ShopNest is a modern, responsive full-stack E-Commerce application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It provides seamless user authentication, product catalog browsing, detailed product views, interactive shopping cart management, and order handling.

---

## 🚀 Features

### 👤 Authentication & User Management
- **User Registration & Login** powered by JWT (JSON Web Tokens) and bcrypt password hashing.
- **Context-based Auth State** for persistent session management.
- **Email Notification System** for user onboarding using Nodemailer.

### 🛍️ Product Catalog & Shopping Experience
- **Home Page**: Displays featured products fetched directly from the backend.
- **Shop Catalog**: Full product listing with interactive search and category filtering.
- **Product Detail Page**: Detailed view with product image, pricing, stock status, and description.
- **Shopping Cart**: State management powered by **Redux Toolkit** with `localStorage` persistence.

### ⚙️ Backend & API Architecture
- **RESTful API Routes** for Authentication (`/api/auth`), Products (`/api/products`), Orders (`/api/orders`), and Analytics (`/api/analytics`).
- **MongoDB & Mongoose Schema Validation** for users, products, and orders.
- **Database Seeding Script** (`seed.js`) to quickly populate initial test data.

---

## 🔑 Demo & Admin Credentials

If you populate your database using `node seed.js`, you can log in with the following pre-configured credentials:

| Role | Email / Username | Password | Features & Access |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | `admin@example.com` | `password123` | Admin Dashboard (`/admin`), Manage Products (`/admin/products`), Add Products (`/admin/add-product`), Manage Orders (`/admin/orders`), User Directory (`/admin/users`) |
| **👤 User (Customer)** | `john@example.com` | `password123` | Product Shopping, Cart, Checkout (`/checkout`), Order History & Profile (`/profile`) |
| **👤 User (Customer 2)** | `jane@example.com` | `password123` | Standard Customer Account |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **React Router DOM** (Client-side Routing)
- **Redux Toolkit** (Cart State Management)
- **Vanilla CSS** (Custom Styling & Responsive Dark Theme)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose ORM**
- **JWT (JsonWebToken)** & **Bcrypt.js**
- **Nodemailer** (Email Services)
- **Multer** & **ImageKit** (Media File Handling)

---

## 📁 Project Structure

```text
Mern E-Commerce Project/
├── Backend/
│   ├── config/             # DB & ImageKit Config
│   ├── controller/         # Auth, Product, Order & Analytics Controllers
│   ├── middleware/         # Auth & Admin Route Protection
│   ├── model/              # User, Product, and Order Mongoose Schemas
│   ├── routes/             # Express API Routes
│   ├── utlis/              # Email Sending Helper
│   ├── index.js            # Express App Server Entry Point
│   ├── seed.js             # Database Seeder Script
│   └── package.json
│
├── Frontend/
│   ├── my-react-app/
│   │   ├── src/
│   │   │   ├── components/  # Navbar, Footer, ProductCard
│   │   │   ├── context/     # AuthContext
│   │   │   ├── pages/       # Home, Shop, ProductDetail, Login, Register, About, etc.
│   │   │   ├── redux/       # Redux Store & cartSlice
│   │   │   ├── styles/      # Global & Component CSS
│   │   │   ├── App.jsx      # Main Application Router
│   │   │   └── main.jsx
│   │   └── package.json
│   └── package.json
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v16+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster)

---

### 1️⃣ Setup Backend

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shopnest-project
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
4. *(Optional)* Seed the database with sample data:
   ```bash
   node seed.js
   ```
5. Start the backend server:
   ```bash
   npm run dev
   # or
   node index.js
   ```
   The backend will run on `http://localhost:5000`.

---

### 2️⃣ Setup Frontend

1. Navigate to the `Frontend/my-react-app` directory:
   ```bash
   cd Frontend/my-react-app
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
