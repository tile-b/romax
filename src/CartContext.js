// src/CartContext.js

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'; // <-- IMPORT useEffect

const CartContext = createContext();
const CART_STORAGE_KEY = 'myShoppingV1';

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // 1. Initialize State from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      // Get the stored string from localStorage
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      
      // If data exists, parse it; otherwise, start with an empty array
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Could not load cart from localStorage", error);
      // Fallback to an empty array if loading fails
      return [];
    }
  });

  // 2. Persist State to localStorage on every change
  useEffect(() => {
    try {
      // Convert the cartItems array to a JSON string and store it
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart to localStorage", error);
    }
  }, [cartItems]); // <-- DEPENDENCY ARRAY: Reruns the effect whenever cartItems changes

  // --- Cart Modification Functions ---

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
        // Add the product (with numeric price) and initial quantity
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      // Add a check to prevent errors if the item is somehow missing (e.g., from an old storage format)
      if (!existingItem) return prevItems;
      
      if (existingItem.quantity === 1) {
        // If quantity is 1, remove the item completely
        return prevItems.filter((item) => item.id !== productId);
      } else {
        // Decrease quantity by 1
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

  // --- Calculations ---
  
  // Calculate total price and total items efficiently
  const { totalItemsInCart, cartTotal } = useMemo(() => {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const totalPrice = cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), // Ensure item.price is treated as a number
      0
    );

    return { totalItemsInCart: totalItems, cartTotal: totalPrice };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    totalItemsInCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}