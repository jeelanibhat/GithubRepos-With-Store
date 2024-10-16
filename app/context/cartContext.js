"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Provide the context to the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Sync cart with localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Helper function to save cart to localStorage and update state
  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Add product to the cart or increase its quantity
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // If product exists, increase its quantity
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      } else {
        // Add new product with quantity 1
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      }
    });
  };

  // Decrease product quantity or remove it if quantity is 1
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);

      if (existingProduct.quantity > 1) {
        // Decrease the quantity
        const updatedCart = prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      } else {
        // Remove product if quantity is 1
        const updatedCart = prevCart.filter((item) => item.id !== productId);
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      }
    });
  };

  // Remove product from cart directly
  const removeCart = (productId) => {
    console.log("cart in removeCart:", productId, cart)
    const updatedCart = cart.filter((item) => item.id !== productId);

    saveCartToLocalStorage(updatedCart);
    setCart(updatedCart)
    return updatedCart
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Use the cart context
export const useCart = () => useContext(CartContext);
