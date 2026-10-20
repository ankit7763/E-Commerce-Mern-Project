const Product = require('../model/Product');
const imagekit = require('../config/imagekit');
const fs = require('fs');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error in getProducts:", error);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id ? req.params.id.trim() : '';
        const product = await Product.findById(productId);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error in getProductById:", error);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body || {};
        let imageUrl = '';
        if (req.file) {
            const fileStream = fs.createReadStream(req.file.path);
            const result = await imagekit.upload({
                file: fileStream,
                fileName: req.file.originalname || 'product_image.jpg'
            });
            console.log("ImageKit upload result:", result);
            imageUrl = result.url;
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error in createProduct:", error);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id ? req.params.id.trim() : '';
        console.log("updateProduct req.body:", req.body);
        console.log("updateProduct req.file:", req.file);

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, description, price, category, stock } = req.body || {};

        let imageUrl = existingProduct.imageUrl;
        if (req.file) {
            const fileStream = fs.createReadStream(req.file.path);
            const result = await imagekit.upload({
                file: fileStream,
                fileName: req.file.originalname || 'product_image.jpg'
            });
            console.log("ImageKit upload result:", result);
            imageUrl = result.url;
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }

        if (name !== undefined && name !== '') existingProduct.name = name;
        if (description !== undefined && description !== '') existingProduct.description = description;
        if (price !== undefined && price !== '') existingProduct.price = Number(price);
        if (category !== undefined && category !== '') existingProduct.category = category;
        if (stock !== undefined && stock !== '') existingProduct.stock = Number(stock);
        existingProduct.imageUrl = imageUrl;

        const savedProduct = await existingProduct.save();
        res.json(savedProduct);
    }
    catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// delete product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id ? req.params.id.trim() : '';
        const product = await Product.findById(productId);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// duplicate product
const duplicateProduct = async (req, res) => {
    try {
        const productId = req.params.id ? req.params.id.trim() : '';
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, description, price, category, stock } = req.body || {};

        let imageUrl = product.imageUrl;
        if (req.file) {
            const fileStream = fs.createReadStream(req.file.path);
            const result = await imagekit.upload({
                file: fileStream,
                fileName: req.file.originalname || 'product_image.jpg'
            });
            imageUrl = result.url;
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }

        const newProduct = new Product({
            name: name || `${product.name} (Copy)`,
            description: description || product.description,
            price: price !== undefined && price !== '' ? Number(price) : product.price,
            category: category || product.category,
            stock: stock !== undefined && stock !== '' ? Number(stock) : product.stock,
            imageUrl: imageUrl,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error in duplicateProduct:", error);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct
}
