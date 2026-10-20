import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart?.cartItems) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getItemId = (item) => item._id || item.id || item.productId;
    const getItemQty = (item) => item.quantity || item.qty || 1;
    const getItemPrice = (item) => Number(item.price || 0);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQty = (id, currentQty, change) => {
        const newQty = currentQty + change;
        dispatch(updateQuantity({ id, quantity: newQty }));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + (getItemPrice(item) * getItemQty(item)), 0);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0066FF' }}>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#18181b', borderRadius: '12px' }}>
                    <p style={{ fontSize: '1.2rem', color: '#a1a1aa', marginBottom: '16px' }}>Your cart is empty.</p>
                    <Link to="/shop" className="btn">Go Shopping</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    <div style={{ flex: '1 1 550px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {cartItems.map((item) => {
                            const id = getItemId(item);
                            const qty = getItemQty(item);
                            const price = getItemPrice(item);
                            return (
                                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#18181b', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <img src={item.imageUrl || item.image || '/ShopNestLogo.png'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', background: '#09090b' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '4px' }}>{item.name}</h4>
                                        <p style={{ color: '#0066FF', fontWeight: '600' }}>${price.toFixed(2)}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <button onClick={() => handleUpdateQty(id, qty, -1)} style={{ padding: '4px 12px', background: '#27272a', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                                        <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
                                        <button onClick={() => handleUpdateQty(id, qty, 1)} style={{ padding: '4px 12px', background: '#27272a', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                                    </div>
                                    <button onClick={() => handleRemove(id)} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Remove</button>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ flex: '1 1 300px', background: '#18181b', padding: '24px', borderRadius: '12px', height: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ color: '#fff', marginBottom: '16px', fontSize: '1.4rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>
                            <span>Total:</span>
                            <span style={{ color: '#0066FF' }}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button onClick={() => navigate('/checkout')} className="btn" style={{ width: '100%', cursor: 'pointer' }}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;