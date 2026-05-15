import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/products.php');
        if (Array.isArray(res.data)) {
            setProducts(res.data);
        } else {
            console.error("Products API didn't return an array", res.data);
            setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart
  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/cart.php?user_id=${user.id}`);
          if (Array.isArray(res.data)) setCart(res.data);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      };
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return alert("Please login first");
    try {
      await axios.post('http://localhost:8000/api/cart.php', {
        user_id: user.id,
        product_id: productId,
        quantity
      });
      // Re-fetch cart
      const res = await axios.get(`http://localhost:8000/api/cart.php?user_id=${user.id}`);
      setCart(res.data);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart.php?cart_id=${cartId}`);
      setCart(prev => prev.filter(item => item.cart_id !== cartId));
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    if (quantity <= 0) return removeFromCart(cartId);
    try {
      await axios.put('http://localhost:8000/api/cart.php', {
        cart_id: cartId,
        quantity
      });
      setCart(prev => prev.map(item => item.cart_id === cartId ? { ...item, quantity } : item));
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ products, loading, cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
