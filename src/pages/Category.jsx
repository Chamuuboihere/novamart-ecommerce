import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ShoppingBag, Plus } from 'lucide-react';

const Category = () => {
  const { name } = useParams();
  const categoryProducts = getProductsByCategory(name);
  const { addToCart } = useCart();
  const { requireAuth } = useAuth();
  const categoryName = decodeURIComponent(name);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [name]);

  const handleAddCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(() => addToCart(product));
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Category Header */}
        <div style={{ marginBottom: '40px' }}>
          <Link to="/#categories" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '8px' }}>
            {categoryName}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Explore our curated catalog of {categoryProducts.length} premium items.
          </p>
        </div>

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="arrivals-grid">
            {categoryProducts.map((item, idx) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.05 }} 
                className="arrival-card"
              >
                <Link to={`/product/${item.id}`} style={{display:'block', textDecoration:'none', color:'inherit'}}>
                  <div className="arrival-img">
                    <img src={item.img} alt={item.name} />
                    <button className="add-to-cart-quick" onClick={(e) => handleAddCart(e, item)}>
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="arrival-info flex-between mt-3">
                    <h4 style={{fontWeight: 500}}>{item.name}</h4>
                    <p className="price" style={{color: 'var(--text-primary)'}}>{item.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '100px 0', textAlign: 'center', background: 'var(--surface-glass)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <ShoppingBag size={48} color="var(--text-secondary)" style={{ margin: '0 auto 16px' }} />
            <h2>No items found.</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>We are currently out of stock in this category. Check back soon!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Category;
