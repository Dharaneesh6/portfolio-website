import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronRight, Instagram, Facebook, Twitter, Clock, MapPin, Phone, Mail, Star, ArrowRight, Plus, Minus, Trash2, Coffee, Zap } from 'lucide-react';
import { Routes, Route } from "react-router-dom";

import HomePage from './components/homePage.jsx';
import MenuPage from './components/menuPage.jsx';
import CheckoutPage from './components/checkout.jsx';
import StoryPage from './components/storyPage.jsx';
import EventsPage from './components/eventPage.jsx';
import VisitPage from './components/visitPage.jsx';
import Navbar from './components/nav.jsx';
import CartSidebar from './components/sideCart.jsx';
import Footer from './components/footer.jsx';
import Reserve from './components/Reserve.jsx';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [eventData1, setEventDate1] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract hooks to top level (fixes React hooks rule violation)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('aura_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync activePage state with current URL
  useEffect(() => {
    const path = location.pathname.slice(1) || 'home';
    setActivePage(path);
  }, [location.pathname]);

  // Page Transitions Scroll to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Navigate and update active page
  const handleSetPage = (page) => {
    setActivePage(page);
    navigate(page === 'home' ? '/' : `/${page}`);
  };

  const handleEventSelect = (event) => {
    setEventDate1(event);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);



  return (
    <div className="bg-stone-50 text-stone-900 font-sans selection:bg-amber-100">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-stone-900 z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar
        activePage={activePage}
        setActivePage={handleSetPage}
        cartCount={cartCount}
        toggleCart={() => setIsCartOpen(true)}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        updateQty={updateQty}
        removeItem={removeItem}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.35, ease: "easeOut" }}

        >
        <Routes>
          <Route path="/" element={<HomePage  setActivePage={handleSetPage} />} />
          <Route path="/menu" element={<MenuPage addToCart={addToCart}  />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cart} clearCart={() => setCart([])} setActivePage={handleSetPage} />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/events" element={<EventsPage  handleEventSelect={handleEventSelect} />} />
          <Route path="/visit" element={<VisitPage />} />
          <Route path="/reserve" element={<Reserve eventData1={eventData1}/>} />
        </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer setActivePage={handleSetPage} />
    </div>
  );
}
