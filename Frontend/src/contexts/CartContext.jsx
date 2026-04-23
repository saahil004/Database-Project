import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    setCartItems(prev => {
      const existing = prev.find(cart => cart.menu_item_id === item.menu_item_id);
      if (existing) {
        return prev.map(cart =>
          cart.menu_item_id === item.menu_item_id
            ? { ...cart, quantity: cart.quantity + item.quantity }
            : cart
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (menu_item_id) => {
    setCartItems(prev => prev.filter(cart => cart.menu_item_id !== menu_item_id));
  };

  const updateQuantity = (menu_item_id, quantity) => {
    if (quantity <= 0) {
      removeItem(menu_item_id);
      return;
    }
    setCartItems(prev => prev.map(cart =>
      cart.menu_item_id === menu_item_id ? { ...cart, quantity } : cart
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
