import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart?.cartItems) || [];
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/ShopNestLogo.png" alt="ShopNest" style={{ height: '38px', width: 'auto', borderRadius: '8px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0, 102, 255, 0.4))' }} />
                    <span style={{ fontWeight: '700', fontSize: '1.4rem', color: '#0066FF' }}>ShopNest</span>
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
                {user ? (
                    <>
                        <li><Link to="/profile">Hi, {user.name}</Link></li>
                        {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
                        <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;