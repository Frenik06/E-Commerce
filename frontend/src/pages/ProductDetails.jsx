import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useShop();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products.php?id=${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }
    setAdding(true);
    await addToCart(product.id, quantity);
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
      </div>
    );
  }

  if (!product || product.error) {
    return (
      <div className="text-center py-24 text-slate-500 text-2xl">Product not found.</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-semibold">
        <ArrowLeft size={20} className="mr-2" /> Back to Products
      </Link>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-10 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={product.image} 
            alt={product.title} 
            className="max-h-96 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <span className="text-sm font-bold text-primary-500 tracking-widest uppercase mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-center text-yellow-400 mb-6">
            <Star fill="currentColor" size={20} />
            <span className="ml-2 text-slate-600 dark:text-slate-300 font-semibold">{product.rating} Rating</span>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>
          
          <div className="text-4xl font-black text-slate-900 dark:text-white mb-8">
            ${parseFloat(product.price).toFixed(2)}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-xl font-bold hover:text-primary-500">-</button>
              <span className="px-4 py-3 text-xl font-bold border-x-2 border-slate-200 dark:border-slate-700 w-16 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-xl font-bold hover:text-primary-500">+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={adding}
              className={`flex-1 py-4 rounded-xl flex items-center justify-center font-bold text-lg transition-all shadow-lg ${
                adding ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105'
              }`}
            >
              <ShoppingCart className="mr-2" size={24} />
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
