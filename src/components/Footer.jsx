import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Globe, Mail, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-icon"><ShoppingBag size={24} color="var(--accent-1)" /></span>
            <span className="brand-name gradient-text">NovaMart</span>
          </div>
          <p className="footer-desc">The ultimate platform for next-gen premium goods. Shop the future, today.</p>
          <div className="social-links">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><Mail size={20} /></a>
            <a href="#"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/#categories">Categories</Link></li>
            <li><Link to="/best-sellers">Best Sellers</Link></li>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/weekly-deals">Weekly Deals</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><Link to="/order-tracking">Order Tracking</Link></li>
            <li><Link to="/returns">Returns & Refunds</Link></li>
            <li><Link to="/help-center">Help Center</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Stay in the Loop</h4>
          <p>Get exclusive offers and news.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button className="btn-primary" style={{padding: '12px 16px'}}>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NovaMart Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
