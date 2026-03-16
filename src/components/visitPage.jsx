import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const VisitPage = () => {
  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-8xl font-bold mb-16 tracking-tighter ">Visit the Sanctum.</h1>
          <div className="space-y-12">
            <div className="flex gap-8">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin className="text-stone-900 w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-3 tracking-tight">Our Home</h4>
                <p className="text-stone-500 text-lg font-light leading-relaxed">
                  742 Artisan Square, North Loop<br />
                  Portland, OR 97201
                </p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mail className="text-stone-900 w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-3 tracking-tight">Our Email</h4>
                <p className="text-stone-500 text-lg font-light leading-relaxed">
                  info@auracoffee.com
                </p>
              </div>
            </div>

            <div className="flex gap-8">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="text-stone-900 w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-3 tracking-tight">Our Phone Number</h4>
                <p className="text-stone-500 text-lg font-light leading-relaxed">
                  (503) 555-0199
                </p>
              </div>
            </div>
            

            <div className="flex gap-8">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Clock className="text-stone-900 w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-3 tracking-tight">Hours</h4>
                <div className="text-stone-500 text-lg font-light space-y-2">
                  <div className="flex justify-between w-72"><span>Mon - Fri</span> <span className="text-stone-900 font-semibold">7am - 8pm</span></div>
                  <div className="flex justify-between w-72"><span>Saturday</span> <span className="text-stone-900 font-semibold">8am - 9pm</span></div>
                  <div className="flex justify-between w-72"><span>Sunday</span> <span className="text-stone-900 font-semibold">8am - 6pm</span></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}className="bg-stone-200 rounded-[3rem] h-[600px] overflow-hidden shadow-2xl relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.7334759495764!2d-122.6789!3d45.5234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMxJzI0LjIiTiAxMjLCsDQwJzQ0LjAiVw!5e0!3m2!1sen!2sus!4v1615454545454!5m2!1sen!2sus" 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default VisitPage;