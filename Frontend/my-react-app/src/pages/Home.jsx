import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProducts(data.slice(0, 8)); // Featured products
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products from backend:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="home-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '60px 20px', borderRadius: '16px', textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#0066FF' }}>Welcome to ShopNest</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Discover the best products at unbeatable prices.</p>
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: '#f8fafc' }}>Featured Products</h2>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading products...</div>
            ) : products.length > 0 ? (
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
                    {products.map((product) => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', background: '#1e293b', borderRadius: '12px' }}>
                    No products found in backend.
                </div>
            )}
        </div>
    );
};

export default Home;