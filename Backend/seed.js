const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/order');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const adminUser1 = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });

        const adminUser2 = await User.create({
            name: 'Admin User',
            email: 'admin@shopnest.com',
            password: hashedPassword,
            role: 'admin'
        });

        const ankitUser = await User.create({
            name: 'Ankit Kr',
            email: 'ankitkrrjk77@gmail.com',
            password: hashedPassword,
            role: 'admin'
        });

        const user1 = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: hashedPassword,
            role: 'user'
        });

        const user2 = await User.create({
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: hashedPassword,
            role: 'user'
        });

        const products = [
            {
                name: 'Wireless Noise-Cancelling Headphones',
                description: 'Immersive sound experience with advanced active noise cancellation.',
                price: 299.99,
                category: 'Electronics',
                stock: 15,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                ratings: 4.8,
                numReviews: 24
            },
            {
                name: 'Minimalist Modern Chair',
                description: 'A stylish and comfortable addition to any contemporary living room.',
                price: 150.00,
                category: 'Furniture',
                stock: 30,
                imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                ratings: 4.2,
                numReviews: 12
            },
            {
                name: 'Professional DSLR Camera',
                description: 'Capture stunning moments with high-resolution clarity and speed.',
                price: 1199.99,
                category: 'Electronics',
                stock: 8,
                imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                ratings: 4.9,
                numReviews: 50
            },
            {
                name: 'Classic White Sneakers',
                description: 'Versatile and comfortable, a staple for any casual outfit.',
                price: 85.00,
                category: 'Clothing',
                stock: 50,
                imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                ratings: 4.5,
                numReviews: 89
            }
        ];

        const createdProducts = await Product.insertMany(products);

        await Order.create({
            user: ankitUser._id,
            products: [{ product: createdProducts[0]._id, quantity: 1, price: 299.99 }],
            totalAmount: 299.99,
            address: { fullName: 'Ankit Kr', street: 'Karond', city: 'Bhopal', postalcode: '462022', country: 'India' },
            paymentId: 'bypass_txn_seed_1',
            status: 'delivered'
        });

        await Order.create({
            user: user1._id,
            products: [{ product: createdProducts[1]._id, quantity: 2, price: 150.00 }],
            totalAmount: 300.00,
            address: { fullName: 'John Doe', street: '123 Main St', city: 'New York', postalcode: '10001', country: 'USA' },
            paymentId: 'bypass_txn_seed_2',
            status: 'pending'
        });

        console.log('✅ Data & Orders Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error with data import: ${error.message}`);
        process.exit(1);
    }
};

importData();