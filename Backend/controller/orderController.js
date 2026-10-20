const Order = require('../model/order');
const sendemail = require('../utlis/sendemail');

// create a new order
const createOrder = async (req, res) => {
    try {
        const { products, items, totalAmount, address, paymentId } = req.body;
        const orderProducts = products || items;

        if (!orderProducts || orderProducts.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const order = new Order({
            user: req.user._id,
            products: orderProducts,
            totalAmount,
            address,
            paymentId
        });

        await order.save();

        const message = `Dear ${req.user.name},\n\nThank you for your order. Your order has been placed successfully.\n\nOrder Details:\nOrder ID: ${order._id}\nOrder Amount: ${order.totalAmount}\nOrder Address: ${order.address.fullName}, ${order.address.street}, ${order.address.city}, ${order.address.postalcode || order.address.postalCode}, ${order.address.country}\nOrder Status: ${order.status}`;

        await sendemail(req.user.email, 'Order Created', message);
        res.status(201).json({ message: 'Order Created successfully', order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name price imageUrl');
        res.json(orders);
    } catch (error) {
        console.error("Error fetching myOrders:", error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').populate('products.product', 'name price');
        res.json(orders);
    } catch (error) {
        console.error("Error fetching getOrders:", error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id ? req.params.id.trim() : '';
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (order) {
            order.status = status;
            await order.save();
            res.json({ message: `Order status updated`, order });
        }
        else {
            res.status(404).json({ message: `Order not found` });
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: `Error updating order status`, error: error.message });
    }
};

module.exports = { createOrder, myOrders, getOrders, updateOrderStatus };