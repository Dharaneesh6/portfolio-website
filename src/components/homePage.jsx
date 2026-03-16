import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight,ChevronRight,Coffee,Zap,Star } from 'lucide-react';



const HomePage = ({ setActivePage }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products', err));
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Coffee Hero"
          />
        </div>
        <motion.div 
          className="relative z-10 px-6 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="text-amber-400 font-medium tracking-[0.3em] uppercase text-xs mb-6 block">The Pursuit of Purity</span>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
            <span className="text-amber-400">Crafted  </span>Coffee<br />Perfect   Moments
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the zenith of specialty roasting. Sourced globally from ethical estates, roasted locally in small batches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setActivePage('menu')} className="bg-white text-stone-900 px-10 py-4 rounded-full font-semibold hover:bg-stone-100 transition-all flex items-center justify-center gap-2 group">
              Explore Coffee <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setActivePage('story')} className="backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
              Our Craft Story
            </button>
          </div>
        </motion.div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-none">The Signature Series.</h2>
              <p className="text-stone-500 mt-6 text-xl font-light">Curated flavors that define our identity.</p>
            </div>
            <button onClick={() => setActivePage('menu')} className="text-amber-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all underline underline-offset-8">
              View Full Menu <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 shadow-sm">
            {(products || []).slice(0, 6).map((product, i) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-xl"
                onClick={() => setActivePage('menu')}
              > 
              <div className="h-80 overflow-hidden">
                 <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={product.name} />
              </div>
              <div className="p-6 bg-white h-full flex flex-col">
                <h3 className="text-2xl font-bold text-stone-900">{product.name}</h3>
                <p className="text-stone-500 text-sm mt-2 uppercase tracking-widest">{product.category}</p>
                <p className="text-stone-900 font-semibold mt-3 text-lg">${product.price.toFixed(2)}</p>
              </div>  
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambiance */}
      <section className="py-24 bg-stone-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-4">
              <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg" alt="Cafe ambiance" />
              <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg" alt="Cafe ambiance" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">A Space to Breathe, Create, and Connect</h2>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              Designed with a blend of industrial chic and warm rustic elements, our shop provides the perfect backdrop for your morning ritual or afternoon brainstorming session.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                  <h4 className="font-bold">Natural Light</h4>
                  <p className="text-sm text-stone-500">Floor to ceiling windows.</p>
              </div>
              <div>
                  <h4 className="font-bold">Cozy Seating</h4>
                  <p className="text-sm text-stone-500">Velvet sofas & oak tables.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                  <div className="space-y-12">
                    <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">Direct Trade Philosophy</span>
                    <h2 className="text-5xl font-black leading-tight">Harvested with Purpose. Roasted with Precision.</h2>
                    <p className="text-stone-400 text-xl font-light leading-relaxed">
                      We travel to the highlands of Ethiopia and the volcanic slopes of Guatemala twice a year. No middle-men. No compromises. Just pure, ethical, single-origin excellence.
                    </p>
                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">100%</h4>
                        <p className="text-stone-500 text-sm uppercase tracking-widest font-bold">Compostable Packaging</p>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">88+</h4>
                        <p className="text-stone-500 text-sm uppercase tracking-widest font-bold">Cupping Score Avg</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1000" className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="" />
                    <div className="absolute -bottom-10 -left-10 bg-amber-600 p-10 rounded-3xl hidden md:block">
                      <Coffee size={40} className="mb-4" />
                      <p className="font-black text-xl leading-tight">Fresh Roasted<br/>Twice Weekly</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Philosophy Section */}
                  <section className="py-32 px-6 bg-stone-950 text-white overflow-hidden">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                      <div className="lg:w-1/2 relative">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          className="relative z-10 rounded-2xl overflow-hidden"
                        >
                          <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800" className="w-full h-[600px] object-cover" alt="Coffee Pour" />
                        </motion.div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 border-2 border-amber-600/30 rounded-2xl -z-0" />
                      </div>
                      <div className="lg:w-1/2">
                        <span className="text-amber-600 uppercase tracking-widest font-bold text-sm block mb-6">Our Philosophy</span>
                        <h2 className="text-5xl font-bold mb-8 leading-tight">The Art of the Single Origin</h2>
                        <p className="text-stone-400 text-lg font-light leading-relaxed mb-8">
                          We believe coffee is a sensory journey. From the volcanic soils of Central America to the highlands of Ethiopia, we partner directly with farmers who prioritize regenerative agriculture and unparalleled quality.
                        </p>
                        <div className="space-y-6">
                          {[
                            { icon: <Coffee size={24}/>, title: 'Ethically Sourced', desc: 'Direct trade relationships ensure 100% fair compensation.' },
                            { icon: <Zap size={24}/>, title: 'Micro-Roasted', desc: 'Small batch roasting preserves the delicate terpene profile.' },
                          ].map((item, i) => (
                            <div key={i} className="flex gap-6">
                              <div className="bg-amber-700/20 p-4 rounded-lg text-amber-600 h-fit">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                <p className="text-stone-500 font-light">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
            
                  <section className="py-24 px-6 bg-stone-100">
  <div className="max-w-7xl mx-auto">

    <h2 className="text-4xl font-bold text-center mb-16 text-stone-900">
      What Our Customers Say
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* Testimonial 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <div className="flex justify-center mb-4">
          {[1,2,3,4,5].map(i => (
            <Star key={i} fill="#b45309" className="text-amber-700 w-4 h-4 mx-1"/>
          ))}
        </div>

        <p className="text-stone-700 italic mb-6">
          "The best espresso I’ve ever had. The atmosphere and quality are unmatched."
        </p>

        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
          className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
        />

        <h5 className="font-semibold text-stone-900">Emma Wilson</h5>
        <p className="text-sm text-stone-500">Coffee Lover</p>
      </div>


      {/* Testimonial 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <div className="flex justify-center mb-4">
          {[1,2,3,4,5].map(i => (
            <Star key={i} fill="#b45309" className="text-amber-700 w-4 h-4 mx-1"/>
          ))}
        </div>

        <p className="text-stone-700 italic mb-6">
          "Aura Coffee has the smoothest cold brew in town. I visit almost every day."
        </p>

        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
          className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
        />

        <h5 className="font-semibold text-stone-900">Michael Reed</h5>
        <p className="text-sm text-stone-500">Regular Customer</p>
      </div>


      {/* Testimonial 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <div className="flex justify-center mb-4">
          {[1,2,3,4,5].map(i => (
            <Star key={i} fill="#b45309" className="text-amber-700 w-4 h-4 mx-1"/>
          ))}
        </div>

        <p className="text-stone-700 italic mb-6">
          "The pastries are amazing and the staff are incredibly friendly."
        </p>

        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200"
          className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
        />

        <h5 className="font-semibold text-stone-900">Sophia Lee</h5>
        <p className="text-sm text-stone-500">Food Blogger</p>
      </div>


      {/* Testimonial 4 */}
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <div className="flex justify-center mb-4">
          {[1,2,3,4,5].map(i => (
            <Star key={i} fill="#b45309" className="text-amber-700 w-4 h-4 mx-1"/>
          ))}
        </div>

        <p className="text-stone-700 italic mb-6">
          "A perfect place to relax and enjoy a beautifully crafted latte."
        </p>

        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
          className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
        />

        <h5 className="font-semibold text-stone-900">Daniel Carter</h5>
        <p className="text-sm text-stone-500">Designer</p>
      </div>

    </div>
  </div>
</section>

    </div>
  );
};

export default HomePage;