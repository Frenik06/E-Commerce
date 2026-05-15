import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Search, Star, Filter } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const { products, loading } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const location = useLocation();

  let categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category') || 'All';
    setCategory(cat);
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Our Collection</h1>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          </div>
          
          <div className="relative">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Filter className="absolute left-3 top-2.5 text-slate-400" size={20} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col group border border-slate-100 dark:border-slate-700"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900 p-4 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <span className="text-xs font-semibold text-primary-500 mb-1 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.title}</h3>
                <div className="flex items-center text-yellow-400 mb-2">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">{product.rating}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">${parseFloat(product.price).toFixed(2)}</span>
                  <Link to={`/product/${product.id}`} className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-slate-500">
          <p className="text-2xl">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
export default Products;
