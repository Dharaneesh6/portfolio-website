import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { NavLink } from "react-router-dom";

const Navbar = ({ activePage, setActivePage, cartCount, toggleCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



    return (
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <button onClick={() => setActivePage('home')} className={`text-2xl font-bold tracking-tighter transition-colors ${!scrolled && (activePage === 'home' || activePage === 'story') ? 'text-white' : 'text-stone-900'}`}>
              AURA<span className="font-light">COFFEE</span>
            </button>
            
            <div className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  to={link.id === "home" ? "/" : `/${link.id}`}
                  onClick={() => setActivePage(link.id)}
                  className={`text-sm font-medium transition-colors ${!scrolled && (activePage === 'home' || activePage === 'story') ? 'text-white/80 hover:text-white' : 'text-stone-600 hover:text-stone-900'} ${activePage === link.id ? 'underline underline-offset-4' : ''}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
  
          <div className="flex items-center gap-4">
            <button onClick={toggleCart} className="relative p-2">
              <ShoppingBag className={`w-6 h-6 ${!scrolled && activePage === 'home' ? 'text-white' : 'text-stone-900'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className={`w-6 h-6 ${!scrolled && activePage === 'home' ? 'text-white' : 'text-stone-900'}`} />}
            </button>
          </div>
        </div>
  
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 ">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    to={link.id === "home" ? "/" : `/${link.id}`}
                    onClick={() => { setActivePage(link.id); setMobileMenuOpen(false); }}
                    className="text-left text-lg font-medium text-stone-800"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
}

const navLinks = [
  { id: 'home', name: 'Home' },
    { id: 'menu', name: 'Coffee Menu' },
    { id: 'story', name: 'Our Story' },
    { id: 'events', name: 'Events' },
    { name: 'Visit', id: 'visit' }
  ];

export default Navbar;