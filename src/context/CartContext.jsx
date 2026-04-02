import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Basic unique ID for each individual cart entry to allow duplicate items correctly
    setCartItems([...cartItems, { ...product, cartId: Date.now() + Math.random() }]);
    setCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  return (
    <CartContext.Provider value={{ cartOpen, setCartOpen, cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
