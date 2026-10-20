const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require('../middleware/adminMiddleware');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct
} = require("../controller/productController");
const multer = require('multer');
const upload = multer({ dest: 'upload/' });


const router = express.Router();

// all products
router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);
// duplicate product
router.route('/:id/duplicate')
    .post(protect, admin, upload.single('image'), duplicateProduct)
    .put(protect, admin, upload.single('image'), duplicateProduct);
// specific product
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
