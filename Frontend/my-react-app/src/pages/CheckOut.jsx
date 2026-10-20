import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import '../styles/auth.css';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart?.cartItems) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        fullName: '', street: '', city: '', postalCode: '', country: ''
    });

    const totalPrice = cartItems ? cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * (item.quantity || item.qty || 1)), 0) : 0;

    const getFormattedOrderPayload = (paymentId) => {
        const formattedProducts = cartItems.map((item) => ({
            product: item._id || item.id || item.productId,
            quantity: Number(item.quantity || item.qty || 1),
            price: Number(item.price || 0)
        }));

        const formattedAddress = {
            fullName: address.fullName,
            street: address.street,
            city: address.city,
            postalcode: address.postalCode,
            postalCode: address.postalCode,
            country: address.country
        };

        return {
            items: formattedProducts,
            products: formattedProducts,
            totalAmount: totalPrice,
            address: formattedAddress,
            paymentId
        };
    };

    const handlePayment = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty! Please add items to cart first.");
            navigate('/shop');
            return;
        }

        try {
            const orderRes = await fetch('/api/payment/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: totalPrice })
            });

            if (!orderRes.ok) {
                const fallback = window.confirm("Razorpay backend is not configured or failed. Do you want to use Bypass Mode to place a direct Test Order?");
                if (fallback) {
                    return bypassPayment();
                } else {
                    return alert("Payment failed to initialize");
                }
            }

            const orderData = await orderRes.json();

            const options = {
                key: 'rzp_test_dummykey123',
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'ShopNest',
                description: 'Test Transaction',
                order_id: orderData.id,
                handler: async function (response) {
                    const verifyRes = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response)
                    });
                    if (verifyRes.ok) {
                        const saveOrderRes = await fetch('/api/orders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${user?.token}`
                            },
                            body: JSON.stringify(getFormattedOrderPayload(response.razorpay_payment_id))
                        });

                        if (saveOrderRes.ok) {
                            dispatch(clearCart());
                            navigate('/ordersuccess');
                        } else {
                            const err = await saveOrderRes.json().catch(() => ({}));
                            alert(`Order saving failed: ${err.message || saveOrderRes.statusText}`);
                        }
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: address.fullName,
                    email: user?.email,
                    contact: '9999999999'
                },
                theme: {
                    color: '#f97316'
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error(error);
            const fallback = window.confirm("Payment error encountered. Place order using Bypass Mode?");
            if (fallback) {
                bypassPayment();
            }
        }
    };

    const bypassPayment = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty! Please add items to cart first.");
            navigate('/shop');
            return;
        }

        try {
            if (!user || !user.token) {
                alert("Please login first");
                navigate('/login');
                return;
            }

            const saveOrderRes = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(getFormattedOrderPayload('bypass_txn_' + Date.now()))
            });

            if (saveOrderRes.ok) {
                dispatch(clearCart());
                navigate('/ordersuccess');
            } else {
                const err = await saveOrderRes.json().catch(() => ({}));
                alert(`Order creation failed: ${err.message || saveOrderRes.statusText}`);
            }
        } catch (err) {
            console.error(err);
            alert("Bypass payment error: " + err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login first");
            navigate('/login');
            return;
        }
        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty! Please add items to cart first.");
            navigate('/shop');
            return;
        }
        handlePayment();
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form" style={{ maxWidth: '480px' }}>
                <h2>Checkout</h2>
                <h4 style={{ color: '#a1a1aa', textAlign: 'center', marginBottom: '10px', fontWeight: '400' }}>Shipping Address</h4>

                <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
                <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />

                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px' }}>Total to Pay: ${totalPrice.toFixed(2)}</p>
                    <button type="submit" className="btn" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginBottom: '10px' }}>Pay Now (Razorpay)</button>
                    <button type="button" onClick={bypassPayment} className="btn" style={{ width: '100%', padding: '12px', fontSize: '0.95rem', backgroundColor: '#3f3f46' }}>⚡ Bypass Payment (Test Order)</button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
