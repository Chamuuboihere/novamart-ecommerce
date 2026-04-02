import React, { useEffect } from 'react';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft } from 'lucide-react';

export const ProductGridPage = ({ title, subtitle, data }) => {
  const { addToCart } = useCart();
  const { requireAuth } = useAuth();

  useEffect(() => window.scrollTo(0, 0), []);

  const handleAddCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(() => addToCart(product));
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            <ArrowLeft size={16} /> Back to Store
          </Link>
          <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '8px' }}>{title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{subtitle}</p>
        </div>

        <div className="arrivals-grid">
          {data.map((item, idx) => (
            <motion.div 
              key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="arrival-card"
            >
              <Link to={`/product/${item.id}`} style={{display:'block', textDecoration:'none', color:'inherit'}}>
                <div className="arrival-img">
                  <img src={item.img} alt={item.name} />
                  <button className="add-to-cart-quick" onClick={(e) => handleAddCart(e, item)}><Plus size={20} /></button>
                </div>
                <div className="arrival-info flex-between mt-3">
                  <h4 style={{fontWeight: 500}}>{item.name}</h4>
                  <p className="price" style={{color: 'var(--text-primary)'}}>{item.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
