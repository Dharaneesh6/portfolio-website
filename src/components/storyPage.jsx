
import { motion } from 'framer-motion';

const StoryPage = () => {
  const timeline = [
    { year: '2012', title: 'First Roastery', desc: 'Starting in a garage in Seattle with a single vintage 1kg roaster.' },
    { year: '2016', title: 'First Coffee Bar', desc: 'Opening our flagship Aura Bar, focused on direct interaction and transparency.' },
    { year: '2020', title: 'Geisha Series', desc: 'Awarded "Best Specialty Espresso" for our seasonal Panamanian Geisha roast.' },
    { year: '2024', title: 'Global Collective', desc: 'Establishing our direct-trade hub connecting 50+ farms globally.' },
  ];

  return (
    <div className="bg-stone-950 text-white">
      {/* Hero */}
      <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Roastery" />
        <div className=" text-center px-6">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">Our Story</h1>
          <p className="text-amber-600 uppercase tracking-widest font-bold">A Decade of Dedication</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h2 className="text-4xl font-bold mb-8">Rooted in Passion</h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-6">
              Aura Coffee began with a simple observation: the world was moving too fast, and the soulful craft of coffee was being left behind. We sought to create a "Third Space" that wasn't just about the drink, but the atmosphere of creation.
            </p>
            <p className="text-stone-400 text-lg leading-relaxed">
              Every bean we roast is treated with the reverence it deserves. We roast lighter to highlight the terroir, ensuring the story of the land is present in every cup.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600" className="rounded-2xl h-64 w-full object-cover" alt="Beans" />
            <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600" className="rounded-2xl h-64 w-full object-cover mt-12" alt="Barista" />
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-stone-800 pt-24">
          <h2 className="text-4xl font-bold mb-16 text-center">Milestones</h2>
          <div className="relative border-l border-amber-800/50 ml-6 pl-10 space-y-16 py-10">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[53px] top-0 w-6 h-6 rounded-full bg-amber-600 border-4 border-stone-950" />
                <span className="text-amber-600 font-bold text-xl mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-stone-500 max-w-xl">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};



export default StoryPage;