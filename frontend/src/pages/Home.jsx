import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const { products, loading } = useShop();

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-900 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            Discover True <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-300">Elegance</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Curated collections for the modern lifestyle. Experience premium quality with unmatched style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/products" className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-transform transform hover:scale-105 shadow-xl">
              Shop Now <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Electronics', 'Fashion', 'Home & Kitchen'].map((category, index) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-slate-800 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white tracking-wider">{category}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">View All</Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
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
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">{product.title}</h3>
                  <div className="flex items-center text-yellow-400 mb-2">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">{product.rating}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400">${parseFloat(product.price).toFixed(2)}</span>
                    <Link to={`/product/${product.id}`} className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default Home;
