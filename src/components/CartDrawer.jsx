import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartOpen, setCartOpen, cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => {
    // Basic formatting removal for summation assuming prices like "$299"
    const val = parseInt(item.price.replace(/[^0-9]/g, ''));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="cart-overlay" 
            onClick={() => setCartOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-drawer glass-panel"
          >
            <div className="cart-header">
              <h2>Your Cart <span className="cart-count">({cartItems.length})</span></h2>
              <button className="icon-btn" onClick={() => setCartOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="empty-cart flex-center flex-col">
                  <p>Your cart is empty.</p>
                  <button className="btn-secondary mt-3" onClick={() => setCartOpen(false)}>Continue Shopping</button>
                </div>
              ) : (
                <div className="cart-items">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, margin: 0 }}
                        key={item.cartId} 
                        className="cart-item"
                      >
                        <div className="cart-item-img">
                          <img src={item.img} alt={item.name} />
                        </div>
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p className="price">{item.price}</p>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <button className="btn-primary w-full flex-center mt-3">
                  Checkout <ArrowRight size={20} style={{marginLeft: '8px'}} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
