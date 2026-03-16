
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EventsPage = ({ handleEventSelect }) => {

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
       // Debug log
      .catch(err => console.error('Failed to load events', err));
  }, []);

const [events, setEvents] = useState([]);

console.log('Fetched events:', events)
const checkIfPast = (eventDate) => {
  const today = new Date();

  const [day, month, year] = eventDate.split("-");
  const formatted = `20${year}-${month}-${day}`;

  const eventTime = new Date(formatted);

  console.log(`Checking event date: ${formatted} against today: ${today.toISOString().split('T')[0]}`);

  return eventTime < today;
};  

const formatDate = (dateData) => {
  const date = new Date(dateData);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });
};

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-stone-900 mb-6">
            Events at Aura
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            More than a café—a community hub for culture and learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">

          {(events || []).map((event) => (           

            <motion.div
              key={event.id}
              whileHover={checkIfPast(event.time) ? {} : { y: -10 }}
             
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100"
            >

              <div className="h-64 relative">
                <img
                  src={event.img}
                  className="w-full h-full object-cover"
                  alt={event.title}
                />

                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg text-stone-950 font-bold flex flex-col items-center">
                  <span className="text-lg leading-none">
                    {formatDate(event.date).split(",")[1]}
                  </span>
                  <span className="text-[10px] uppercase tracking-tighter">
                    {formatDate(event.date).split(",")[0]}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-stone-900 mb-3">
                  {event.title}
                </h3>

                <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                  {event.desc}
                </p>

                <div className="flex items-center gap-2 text-stone-400 text-xs mb-8 uppercase tracking-widest">
                  <Clock size={14} />
                  {event.date}
                </div>
               
               
                <Link
                  to="/reserve"
                  onClick={() => handleEventSelect(event)}
                  className={`w-full py-4 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all block text-center
                    ${checkIfPast(event.time)
                      ? 'border-stone-300 text-stone-300 cursor-not-allowed'
                      : 'border-stone-900 text-stone-900 hover:bg-stone-950 hover:text-white'}`}
                >
                  {checkIfPast(event.time) ? 'Booking Closed' : 'Reserve Spot'}
                </Link>

              </div>

            </motion.div>

          ))}

        </div>
      </div>
    </div>
  );
};


export default EventsPage;