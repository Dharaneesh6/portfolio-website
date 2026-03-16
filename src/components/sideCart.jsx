
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose, cartItems, updateQty, removeItem }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" 
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">Your Bag</h2>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-stone-500 mb-4 font-light">Your bag is empty.</p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/menu');
                    }}
                    className="text-amber-800 font-medium hover:underline"
                  >
                    Browse our coffee &rarr;
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt={item.name} />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold text-stone-900">{item.name}</h4>
                        <p className="font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-stone-500 mb-3">{item.category}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg px-2 py-1 bg-stone-50">
                          <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-amber-800"><Minus className="w-3 h-3" /></button>
                          <span className="mx-3 text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-amber-800"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-stone-400 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-stone-50">
                <div className="flex justify-between mb-4">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="text-xl font-bold text-stone-900">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full bg-stone-900 text-white py-4 rounded-full font-semibold hover:bg-stone-800 transition-all shadow-lg"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;