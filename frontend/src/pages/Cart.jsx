import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useShop();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Please Login</h2>
        <p className="text-slate-500 mb-8">You need to be logged in to view your cart.</p>
        <Link to="/login" className="px-8 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700">
          Login Now
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="px-8 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-slate-900 dark:text-white">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3 space-y-6">
          {cart.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.cart_id} 
              className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-lg bg-slate-50 dark:bg-slate-900 p-2" />
              <div className="ml-6 flex-grow">
                <Link to={`/product/${item.product_id}`} className="text-lg font-bold hover:text-primary-500 line-clamp-1">{item.title}</Link>
                <p className="text-primary-600 font-bold mt-1">${parseFloat(item.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 dark:border-slate-600 rounded-lg">
                  <button onClick={() => updateQuantity(item.cart_id, item.quantity - 1)} className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg">-</button>
                  <span className="px-3 font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cart_id, item.quantity + 1)} className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg">+</button>
                </div>
                <button onClick={() => removeFromCart(item.cart_id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900 dark:text-white">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-semibold text-slate-900 dark:text-white">${(cartTotal * 0.05).toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-8 flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <span className="text-3xl font-black text-primary-600">${(cartTotal * 1.05).toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center shadow-xl">
              Proceed to Checkout <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
