import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

const ProductCard = ({ product }) => {
    const productId = product?._id || product?.id;

    return (
        <div className="product-card">
            <Link to={`/product/${productId}`} className="product-card-link">
                <div className="product-image-wrapper">
                    <img 
                        src={product?.image || product?.imageUrl || '/ShopNestLogo.png'} 
                        alt={product?.name || 'Product'} 
                        className="product-image" 
                    />
                </div>
                <div className="product-info">
                    <h3 className="product-name">{product?.name || 'Product Name'}</h3>
                    <p className="product-price">
                        ${typeof product?.price === 'number' ? product.price.toFixed(2) : (product?.price || '0.00')}
                    </p>
                    <span className="view-details-text">View Details</span>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
 