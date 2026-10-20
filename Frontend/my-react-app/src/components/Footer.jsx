import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#09090b',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '40px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/ShopNestLogo.png" alt="ShopNest Logo" style={{ height: '36px', width: 'auto', borderRadius: '6px' }} />
          <div>
            <h3 style={{ color: '#0066FF', margin: 0, fontSize: '1.2rem' }}>ShopNest</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Premium E-Commerce Platform.</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/about" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>About Us</Link>
          <Link to="/return" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Return Policy</Link>
          <Link to="/disclaimer" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Disclaimer</Link>
        </div>
        
        <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;