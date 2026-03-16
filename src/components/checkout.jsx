
import { useState } from 'react';
import { motion } from 'framer-motion';

const checkout = async (name, phone, cartItems, setStep) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  try{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ name, phone, items: cartItems, total })
    });
    const data = await res.json();
    console.log("Order successful", data);
    setStep(2);
    return true;
  }catch(err){
    console.error(err);
    alert("Order failed");
    return false;
  }
};

const CheckoutPage = ({ cartItems, clearCart, setActivePage }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="pt-40 pb-24 px-6 max-w-5xl mx-auto">
      {step === 1 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-4xl font-bold mb-10 tracking-tight">Order Details</h2>
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                const success = await checkout(name, phone, cartItems, setStep);
                if (success) {
                  clearCart();
                }
              }}
            >
              <div className="grid gap-6">
                {/* <input required type="text" placeholder="Full Name" className="w-full p-5 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-stone-400 outline-none transition-all" /> */}
                {/* <input required type="tel" placeholder="Phone Number" className="w-full p-5 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-stone-400 outline-none transition-all" /> */}
                <input
 required
 type="text"
 placeholder="Full Name"
 value={name}
 onChange={(e)=>setName(e.target.value)}
 className="w-full p-5 rounded-2xl bg-stone-100"
/>

<input
 required
 type="tel"
 placeholder="Phone Number"
 value={phone}
 onChange={(e)=>setPhone(e.target.value)}
 className="w-full p-5 rounded-2xl bg-stone-100"
/>
                <div className="grid grid-cols-2 gap-6">
                  <select className="p-5 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-stone-400 outline-none appearance-none">
                    <option>ASAP Pickup</option>
                    <option>In 15 mins</option>
                    <option>In 30 mins</option>
                  </select>
                  <input type="text" placeholder="Special Note" className="p-5 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-stone-400 outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-full font-bold text-lg shadow-xl hover:bg-stone-800 transition-all">Confirm & Pay</button>
            </form>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-stone-50 p-10 rounded-[2.5rem] h-fit sticky top-32">
            <h3 className="font-bold mb-8 text-2xl tracking-tight">Summary</h3>
            <div className="space-y-6 mb-8 border-b border-stone-200 pb-8 max-h-60 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={item.image} className="w-12 h-12 object-cover rounded-lg" alt="" />
                    <span className="text-stone-800 font-medium">{item.name} <span className="text-stone-400 text-sm ml-1">x{item.quantity}</span></span>
                  </div>
                  <span className="font-semibold text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-stone-500 font-light">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500 font-light">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold pt-6 text-stone-900">
                <span>Total</span>
                <span className="text-amber-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-stone-50 rounded-[4rem] px-8 shadow-inner"
        >
          <div className="w-24 h-24 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold mb-6 tracking-tight">Your order is brewing.</h2>
          <p className="text-stone-500 mb-12 max-w-md mx-auto text-lg font-light leading-relaxed">
            We've received your order. We'll send a text to your phone when it's ready for pickup at our North Loop sanctuary.
          </p>
          <div className="bg-white p-8 rounded-3xl shadow-sm inline-block mb-12 text-left border border-stone-100">
            <p className="text-[10px] text-stone-400 uppercase font-black tracking-[0.2em] mb-2">Transaction ID</p>
            <p className="font-mono text-xl text-stone-800">#AURA-X{Math.floor(Math.random() * 90000) + 10000}</p>
          </div>
          <br />
          <button 
            onClick={() => { setActivePage('home'); }}
            className="bg-stone-900 text-white px-12 py-5 rounded-full font-bold hover:bg-stone-800 transition-all shadow-lg active:scale-95"
          >
            Return to Store
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CheckoutPage;