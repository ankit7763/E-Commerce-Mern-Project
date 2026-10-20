const Order = require('../model/order');
const User = require('../model/User');
const Product = require('../model/Product');



// get admin stats
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        const orders = await Order.find({});
        const toatalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue: toatalRevenueData
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
};

module.exports = { getAdminStats };



