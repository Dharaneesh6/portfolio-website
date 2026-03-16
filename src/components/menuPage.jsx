
import { useState,useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const MenuPage = ({ addToCart }) => {




  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const categories = ['All', ...new Set((products || []).map(p => p.category))];
  const filtered = filter === 'All' ? (products || []) : (products || []).filter(p => p.category === filter);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products', err));
  }, []);

  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-20 text-center">
        <h1 className="text-5xl md:text-8xl font-bold text-stone-900 tracking-tighter mb-8">Taste the Craft.</h1>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-stone-900 text-white shadow-xl' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div 
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 flex flex-col hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-72 overflow-hidden relative group">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-stone-900 shadow-sm">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-stone-900 mb-3 tracking-tight">{item.name}</h3>
                  <p className="text-stone-500 text-base leading-relaxed font-light">{item.description}</p>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="mt-auto w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-stone-800 transition-all active:scale-95"
                >
                  <Plus className="w-5 h-5" /> Add to Bag
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenuPage;