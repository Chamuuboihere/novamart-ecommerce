import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { setCartOpen, cartItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-left">
          <button className="mobile-menu-btn"><Menu size={24} /></button>
          <Link to="/" className="brand">
            <span className="brand-icon"><ShoppingBag size={24} color="var(--accent-1)" /></span>
            <span className="brand-name gradient-text">NovaMart</span>
          </Link>
        </div>
        
        <div className="nav-center">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search products, categories..." />
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/#categories" className="nav-link">Categories</Link>
          </div>
          
          <div className="nav-actions">
            {user ? (
              <Link to="/profile" style={{textDecoration:'none', display:'flex', alignItems:'center', gap:'10px', background: 'var(--surface-glass)', padding: '6px 16px 6px 12px', borderRadius: '30px', border: '1px solid var(--border-color)'}}>
                <div style={{background: 'var(--accent-1)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <User size={16} color="#fff" />
                </div>
                <span style={{fontWeight:600, fontSize:'0.9rem', color:'white'}}>{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="btn-primary" style={{padding: '8px 18px', fontSize: '0.9rem', textDecoration: 'none'}}>Login / Signup</Link>
            )}
            <button className="icon-btn cart-btn" onClick={() => setCartOpen(true)}>
              <ShoppingCart size={22} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
