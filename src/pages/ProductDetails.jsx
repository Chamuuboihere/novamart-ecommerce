import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Shield, Truck, Package, Heart } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, setCartOpen } = useCart();
  const { requireAuth } = useAuth();

  useEffect(() => {
    window.scrollTo(0,0);
    const p = getProductById(id);
    setProduct(p);
  }, [id]);

  if (!product) {
    return <div className="product-not-found" style={{padding:'200px 0', textAlign:'center'}}><h2>Product Not Found</h2></div>;
  }

  const handleAddCart = () => {
    requireAuth(() => addToCart(product));
  };

  const handleBuyNow = () => {
    requireAuth(() => {
      addToCart(product);
      setCartOpen(true);
    });
  };

  return (
    <div className="pd-container">
      <div className="container pd-grid">
        {/* Breadcrumbs */}
        <div className="pd-breadcrumbs">
          <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to Store</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        {/* Layout */}
        <div className="pd-main">
          {/* Image Section */}
          <div className="pd-image-section">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="pd-main-img-card glass-panel"
            >
              <img src={product.img} alt={product.name} />
              <button className="icon-btn wishlist-btn"><Heart size={24} /></button>
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            className="pd-info-section"
          >
            <span className="badge">{product.category}</span>
            <h1 className="pd-title">{product.name}</h1>
            
            <div className="pd-rating flex-center" style={{justifyContent: 'flex-start', gap: '8px', marginBottom: '24px'}}>
              <div style={{display:'flex', color:'#fbbf24'}}>
                <Star size={18} fill="#fbbf24"/><Star size={18} fill="#fbbf24"/><Star size={18} fill="#fbbf24"/><Star size={18} fill="#fbbf24"/><Star size={18} fill="#fbbf24"/>
              </div>
              <span style={{color:'var(--text-primary)', fontWeight:600}}>{product.rating}</span>
              <span style={{color:'var(--text-secondary)'}}>({product.reviews} Reviews)</span>
            </div>

            <p className="pd-price gradient-text">{product.price}</p>
            
            <p className="pd-description">{product.description}</p>

            <div className="pd-features">
              <div className="feature">
                <Truck size={20} color="var(--accent-1)" />
                <span>Free Next-Day Delivery</span>
              </div>
              <div className="feature">
                <Shield size={20} color="var(--accent-2)" />
                <span>1-Year Lifetime Warranty</span>
              </div>
              <div className="feature">
                <Package size={20} color="var(--accent-1)" />
                <span>Premium Quality Packaging</span>
              </div>
            </div>

            <div className="pd-actions">
              <button className="btn-secondary flex-1" onClick={handleAddCart}>Add to Cart</button>
              <button className="btn-primary flex-1" onClick={handleBuyNow}>Buy It Now</button>
            </div>
            
            <div className="pd-pay">
              <p>Guaranteed Safe Checkout. Shop with Confidence.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
