
import { Instagram, Facebook, Twitter } from 'lucide-react';


const Footer = ({ setActivePage }) => (
 <footer className="bg-white border-t border-stone-100 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="max-w-sm">
              <span className="text-3xl font-bold tracking-tighter mb-6 block">AURA<span className="font-light">COFFEE</span></span>
              <p className="text-stone-500 font-light leading-relaxed">
                Elevating the coffee experience through architectural precision and small-batch dedication since 2012.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="hover:text-amber-500 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-amber-500 transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-amber-500 transition-colors"><Twitter size={20} /></a>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">
              <div className="space-y-4">
                <p className="font-bold text-xs uppercase tracking-widest text-stone-400">Company</p>
                <div className="flex flex-col gap-2 text-stone-600 font-light">
                  <button className="text-left hover:text-stone-900">About Us</button>
                  <button className="text-left hover:text-stone-900">Careers</button>
                  <button className="text-left hover:text-stone-900">Press</button>
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-xs uppercase tracking-widest text-stone-400">Coffee</p>
                <div className="flex flex-col gap-2 text-stone-600 font-light">
                  <button className="text-left hover:text-stone-900">Subscriptions</button>
                  <button className="text-left hover:text-stone-900">Wholesale</button>
                  <button className="text-left hover:text-stone-900">Brewing Guide</button>
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-xs uppercase tracking-widest text-stone-400">Connect</p>
                <div className="flex flex-col gap-2 text-stone-600 font-light">
                  <button className="text-left hover:text-stone-900">Instagram</button>
                  <button className="text-left hover:text-stone-900">Twitter</button>
                  <button className="text-left hover:text-stone-900">Support</button>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-stone-50 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-stone-400 text-xs tracking-tight">© 2023 Aura Roasters International. All rights reserved.</p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
               <button className="hover:text-stone-900">Privacy</button>
               <button className="hover:text-stone-900">Terms</button>
               <button className="hover:text-stone-900">Accessibility</button>
            </div>
          </div>
        </div>
      </footer>
);

export default Footer;