import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching shop products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ width: '100%', padding: '20px 0' }}>
            <h1 style={{ color: '#0066FF', marginBottom: '20px', fontSize: '2.2rem' }}>All Products</h1>
            
            {/* Search and Filters */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        flex: '1 1 300px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #27272a',
                        background: '#18181b',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                
                {categories.length > 1 && (
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid #27272a',
                            background: '#18181b',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                )}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#a1a1aa' }}>Loading shop catalog...</div>
            ) : filteredProducts.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: '#a1a1aa', background: '#18181b', borderRadius: '12px' }}>
                    No products found.
                </div>
            )}
        </div>
    );
};

export default Shop;
