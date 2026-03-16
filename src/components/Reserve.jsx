import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';


const ReservationPage = ({ eventData1 }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const eventData = eventData1 || null;
  
  // State to manage the "Success" view
  const [isBooked, setIsBooked] = useState(false);

  if (!eventData) {
    return (
      <div className="pt-40 text-center">
        <p className="mb-4 text-stone-500">No event selected.</p>
        <button onClick={() => navigate('/')} className="text-stone-900 font-bold underline">Go Back</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingDetails = {
        id: Date.now(),
        eventTitle: eventData.title,
        eventDate: eventData.date,
        userName: name,
        userEmail: email,
        bookedAt: new Date().toISOString(),
      };

      const existingBookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
      existingBookings.push(bookingDetails);
      localStorage.setItem('aura_bookings', JSON.stringify(existingBookings));

      await fetch(`${import.meta.env.VITE_API_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          eventTitle: eventData.title,
        }),
      });

      setIsBooked(true);
    } catch (err) {
      console.error("Reservation failed:", err);
      alert("Something went wrong");
    }
  };

  // Success View
  if (isBooked) {
    return (
      <div className="pt-32 pb-24 bg-stone-50 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-sm border border-stone-100 text-center">
          <div className="flex justify-center mb-6 text-green-500">
            <CheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-2">Spot Reserved!</h2>
          <p className="text-stone-500 mb-8">You're all set for <span className="text-stone-900 font-semibold">{eventData.title}</span>. We've sent a confirmation to your email.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 bg-stone-950 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  // Booking Form View
  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Side: Event Details */}
        <div className="space-y-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="rounded-3xl overflow-hidden h-64 shadow-lg">
            <img src={eventData.img} alt={eventData.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">{eventData.date}</span>
            <h1 className="text-4xl font-bold text-stone-900 mt-2 mb-4">{eventData.title}</h1>
            <p className="text-stone-500 leading-relaxed">{eventData.desc}</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 self-start">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Your Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-400 font-bold mb-2">Full Name</label>
              {/* <input name="fullName" required type="text" className="w-full p-4 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-stone-900 outline-none" placeholder="John Doe" /> */}
              <input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full p-4 rounded-xl bg-stone-50"
placeholder="John Doe"
required
/>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-400 font-bold mb-2">Email Address</label>
              {/* <input type="email" className="w-full p-4 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-stone-900 outline-none" placeholder="john@aura.com" /> */}
            <input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-4 rounded-xl bg-stone-50"
placeholder="john@aura.com"
required
/>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full py-5 bg-stone-950 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-all">
                Confirm Free Reservation
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ReservationPage;