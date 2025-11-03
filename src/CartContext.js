import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'myShoppingV1';

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Could not load cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart to localStorage", error);
    }
  }, [cartItems]);

  // --- Cart functions ---
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (!existingItem) return prevItems;
      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      } else {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // --- Calculations ---
  const { totalItemsInCart, cartTotal } = useMemo(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return { totalItemsInCart: totalItems, cartTotal: totalPrice };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItemsInCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
