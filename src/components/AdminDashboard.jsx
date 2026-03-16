import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Coffee, 
  Calendar, 
  ShoppingBag, 
  LogOut, 
  PlusCircle, 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  DollarSign,
  ChevronRight,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';


// --- Reusable Premium Components ---

const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-3xl ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${colorClass} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600 flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" /> {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
    </div>
  </motion.div>
);

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />}
      <input 
        {...props}
        className={`w-full bg-gray-50/50 border border-gray-200 rounded-2xl p-3 ${Icon ? 'pl-11' : 'px-4'} focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm`}
      />
    </div>
  </div>
);

const Toast = ({ message, isVisible, onClose }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
      >
        <CheckCircle2 className="w-5 h-5 text-green-400" />
        <span className="font-medium">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main Dashboard Component ---

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('products');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
  });

  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    desc: '',
    img: '',
  });

  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const [money, setMoney] = useState(0);
  const [products, setProducts] = useState(0);
  const [events, setEvents] = useState(0);







  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
          navigate('/admin-login');
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
          console.log("api---------",data);
          const total = data.reduce((sum, order) => sum + (order.total || 0), 0);
          setMoney(total);
        }
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reservations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
          navigate('/admin-login');
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setReservations(data);
          console.log("api---------",data);
        }
      } catch (err) {
        console.error('Failed to load reservations', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setProducts(data.length);
          console.log("api---------",data);

        }
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setEvents(data.length);
          console.log("api---------",data);
        }
      } catch (err) {
        console.error('Failed to load events', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
    fetchProduct();
    fetchOrders();
    fetchReservations();
  }, []);


  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(product),
    });
    triggerToast('Product added successfully!');
  };

  const addEvent = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(event),
    });
    triggerToast('Event created successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const menuItems = [
    { id: 'products', label: 'Products', icon: Coffee },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'reservations', label: 'Reservations', icon: Users },
  ];


  return (
    <div className="min-h-screen bg-[#F9F9FB] text-gray-900 font-sans selection:bg-black selection:text-white">
      <Toast isVisible={showToast} message={toastMsg} />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 z-40 hidden lg:flex flex-col p-8">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Coffee className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">AURA COFFEE</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium ${
                activeSection === item.id 
                ? 'bg-black text-white shadow-lg shadow-black/10' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="activePill" className="ml-auto">
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </motion.div>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 font-medium hover:bg-red-50 transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-72 min-h-screen p-8 lg:p-12">
        {/* Navbar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold capitalize">{activeSection}</h1>
            <p className="text-gray-500 mt-1">Manage your store and activities</p>
          </div>
          
          <div className="w-16 h-12 bg-gradient-to-tr from-gray-200 to-gray-50 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center font-bold text-gray-700">
            ADMIN
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Products" value={products > 0 ? products : "0"} icon={Coffee} trend="+12%" colorClass="bg-blue-500" />
          <StatCard title="Active Events" value={events > 0 ? events : "0"} icon={Calendar} trend="+2" colorClass="bg-purple-500" />
          <StatCard title="Total Orders" value={orders.length > 0 ? orders.length : "0"} icon={ShoppingBag} trend="+18%" colorClass="bg-orange-500" />
          <StatCard title="Reservations" value={reservations.length > 0 ? reservations.length : "0"} icon={Users} trend="+0" colorClass="bg-pink-500" />
          <StatCard title="Revenue" value={`₹${money.toFixed(2)}`} icon={DollarSign} trend="+5.4%" colorClass="bg-green-500" />
        </div>
       


        {/* Dynamic Section Rendering */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'products' && (
              <GlassCard className="max-w-3xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-black rounded-2xl text-white">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Add Coffee Product</h2>
                </div>
                <div className='flex justify-end hover:underline outline-1 outline-offset-4 '>
                  <Link to="/products">View All Products</Link>
                </div>

            
                <form onSubmit={addProduct} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField 
                      label="Coffee Name" 
                      placeholder="e.g. Arabica Roast"
                      onChange={(e) => setProduct({ ...product, name: e.target.value })} 
                    />
                    <InputField 
                      label="Category" 
                      placeholder="e.g. Whole Bean"
                      onChange={(e) => setProduct({ ...product, category: e.target.value })} 
                    />
                    <InputField 
                      label="Price (₹)" 
                      placeholder="0.00"
                      type="number"
                      onChange={(e) => setProduct({ ...product, price: e.target.value })} 
                    />
                    <InputField 
                      label="Image URL" 
                      placeholder="https://images.unsplash.com/..."
                      onChange={(e) => setProduct({ ...product, image: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
                    <textarea 
                      placeholder="Tell customers more about this coffee..."
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm"
                    />
                  </div>
                  <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-xl shadow-black/10 active:scale-[0.98]">
                    Add Coffee to Catalog
                  </button>
                </form>
              </GlassCard>
            )}

            {activeSection === 'events' && (
              <GlassCard className="max-w-3xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-purple-600 rounded-2xl text-white">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Create New Event</h2>
                </div>
                <div className='flex justify-end hover:underline outline-1 outline-offset-4 '>
                  <Link to="/events">View All Events</Link>
                </div>
                <form onSubmit={addEvent} className="space-y-6">
                  <InputField 
                    label="Event Title" 
                    placeholder="e.g. Latte Art Workshop"
                    onChange={(e) => setEvent({ ...event, title: e.target.value })} 
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField 
                      label="Date" 
                      type="date"
                      onChange={(e) => setEvent({ ...event, date: e.target.value })} 
                    />
                    <InputField 
                      label="Time" 
                      type="time"
                      onChange={(e) => setEvent({ ...event, time: e.target.value })} 
                    />
                  </div>
                  <InputField 
                    label="Cover Image URL" 
                    onChange={(e) => setEvent({ ...event, img: e.target.value })} 
                  />
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Event Description</label>
                    <textarea 
                      placeholder="Describe what's happening..."
                      onChange={(e) => setEvent({ ...event, desc: e.target.value })}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl p-4 min-h-[100px] focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-sm"
                    />
                  </div>
                  <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-[0.98]">
                    Schedule Event
                  </button>
                </form>
              </GlassCard>
            )}

            {activeSection === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100">
                  <h2 className="text-xl font-bold">Recent Orders</h2>
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="h-24 bg-gray-200 animate-pulse rounded-3xl" />
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="text-gray-300 w-8 h-8" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg">No orders found.</p>
                    <p className="text-gray-400 text-sm">New orders will appear here automatically.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {orders.map((order) => (
                      <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.005 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                            <Users className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{order.name}</h4>
                            <p className="text-sm text-gray-500">{order.phone || 'No phone'}</p>
                          </div>
                        </div>

                        <div className="flex-1 max-w-md">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Items</p>
                          <p className="text-sm text-gray-700 truncate">
                            {Array.isArray(order.items) ? order.items.map(item => {
                               if (typeof item === 'string') return item;
                               return `${item.name || 'Item'} x${item.quantity || 1}`;
                            }).join(', ') : 'Processing...'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-12">
                          <div className="text-right">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total</p>
                            <p className="font-bold text-lg">₹{order.total || 0}</p>
                          </div>
                          <div className="flex items-center gap-4">
                             <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">Paid</span>
                             <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                               <MoreVertical className="w-5 h-5 text-gray-400" />
                             </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}


            {activeSection === 'reservations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100">
                  <h2 className="text-xl font-bold">Recent Reservations</h2>
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="h-24 bg-gray-200 animate-pulse rounded-3xl" />
                    ))}
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="text-gray-300 w-8 h-8" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg">No Reservations found.</p>
                    <p className="text-gray-400 text-sm">New Reservations will appear here automatically.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {reservations.map((reservation) => (
                      <motion.div
                        key={reservation._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.005 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                            <Users className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{reservation.name}</h4>
                            <p className="text-sm text-gray-500">{reservation.email}</p>
                          </div>
                        </div>

                        <div className="flex-1 max-w-md">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Event</p>
                          <p className="text-sm text-gray-700 truncate">
                            {reservation.eventTitle || 'Reservation'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-12">
                          <div className="text-right">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total</p>
                            <p className="font-bold text-lg">₹0</p>
                          </div>
                          <div className="flex items-center gap-4">
                             <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">Free</span>
                             <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                               <MoreVertical className="w-5 h-5 text-gray-400" />
                             </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;