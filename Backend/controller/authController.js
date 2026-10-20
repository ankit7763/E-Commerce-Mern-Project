const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utlis/sendemail');



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const cleanEmail = email ? email.trim().toLowerCase() : '';
        const cleanPassword = password ? password.trim() : '';
        const cleanName = name ? name.trim() : '';

        const existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(cleanPassword, salt);

        const user = await User.create({ name: cleanName, email: cleanEmail, password: hashpassword });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const cleanEmail = email ? email.trim().toLowerCase() : '';
        const cleanPassword = password ? password.trim() : '';

        const user = await User.findOne({ email: cleanEmail });
        if (user && (await bcrypt.compare(cleanPassword, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')

        res.json(users)
    }
    catch (error) {
        res.status(500).json({ message: 'server Error' })
    }
};

module.exports = { registerUser, loginUser, getUsers };
