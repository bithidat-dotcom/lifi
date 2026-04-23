import React, { useState } from 'react';
import { 
  Wifi, Zap, Shield, Check, Menu, X, ArrowRight, Lightbulb, 
  CreditCard, Smartphone, Home, Package, User, CheckCircle,
  MapPin, Phone, Save, Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'packages' | 'profile'>('home');
  const [purchasedPackage, setPurchasedPackage] = useState<string | null>(null);
  
  // Profile State
  const [profileData, setProfileData] = useState({ name: '', phone: '', location: '' });
  const [isEditingProfile, setIsEditingProfile] = useState(true);

  // Payment Simulation State
  const [checkoutPackage, setCheckoutPackage] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const packages = [
    {
      id: 'basic',
      name: 'Photon Lite',
      price: '৳700',
      duration: '/mo',
      speed: '5 Gbps',
      features: ['End-to-End Encrypted', '3 Devices Supported', 'Basic Support'],
      isPopular: false,
    },
    {
      id: 'pro',
      name: 'Photon Pro',
      price: '৳2,300',
      duration: '/3mo',
      speed: '25+ Gbps',
      features: ['End-to-End Encrypted', '11 Devices (10+1)', 'Low Latency', 'Priority Support'],
      isPopular: true,
    },
    {
      id: 'ultra',
      name: 'Lux Elite',
      price: '৳9,200',
      duration: '/yr',
      speed: '100-150 Gbps',
      features: ['50/100+ Devices', 'Perfect for Company/Studio', '24/7 Enterprise Support', 'Zero Interference'],
      isPopular: false,
    },
  ];

  const initiatePurchase = (pkgId: string) => {
    setCheckoutPackage(pkgId);
    setPaymentStatus('idle');
  };

  const processPayment = (method: string) => {
    setPaymentStatus('processing');
    
    // Simulate network delay for payment processing
    setTimeout(() => {
      // Transition to success state
      setPaymentStatus('success');
      
      // After showing success animation, close and redirect to profile
      setTimeout(() => {
        setPurchasedPackage(checkoutPackage);
        setPaymentStatus('idle');
        setCheckoutPackage(null);
        setActiveTab('profile');
      }, 1500);
    }, 2500); // 2.5 seconds processing
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col overflow-x-hidden select-none selection:bg-green-200 pb-24 md:pb-0">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 md:py-6 border-b border-gray-100 z-50 relative bg-white">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-white font-black text-lg">Q</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">QUASIFY</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-bold">
          <button 
            onClick={() => setActiveTab('home')}
            className={`transition-colors uppercase tracking-widest text-xs ${activeTab === 'home' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`transition-colors uppercase tracking-widest text-xs ${activeTab === 'packages' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'}`}
          >
            Packages
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`transition-colors uppercase tracking-widest text-xs ${activeTab === 'profile' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'}`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className="bg-green-500 text-white font-bold px-6 py-2 rounded-full shadow-lg shadow-green-200 hover:bg-green-600 transition-all ml-4"
          >
            My Account
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black transition-colors border-2 border-transparent hover:border-black p-1 rounded"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden relative z-40 shadow-xl"
          >
            <div className="px-6 pt-4 pb-8 flex flex-col gap-4 font-bold text-lg uppercase tracking-widest text-sm">
              <button 
                onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                className={`flex items-center text-left py-3 border-b border-gray-50 ${activeTab === 'home' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                <Home className="w-5 h-5 mr-4" /> Home
              </button>
              <button 
                onClick={() => { setActiveTab('packages'); setIsMenuOpen(false); }}
                className={`flex items-center text-left py-3 border-b border-gray-50 ${activeTab === 'packages' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                <Package className="w-5 h-5 mr-4" /> Packages
              </button>
              <button 
                onClick={() => { setActiveTab('profile'); setIsMenuOpen(false); }}
                className={`flex items-center text-left py-3 border-b border-gray-50 ${activeTab === 'profile' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                <User className="w-5 h-5 mr-4" /> Profile
              </button>
              <button 
                onClick={() => { setActiveTab('profile'); setIsMenuOpen(false); }}
                className="bg-green-500 text-white shadow-lg shadow-green-200 font-bold py-4 px-6 rounded-2xl w-full mt-4 flex items-center justify-center"
              >
                My Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-10 py-6 md:py-10 max-w-[1440px] mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <section className="relative w-full aspect-auto md:aspect-video min-h-[60vh] md:min-h-[auto] py-20 px-4 text-center flex flex-col items-center justify-center overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl mb-8 md:mb-12 group">
                <div className="absolute inset-0 z-0 bg-black">
                  <img 
                    src="https://www.tourmyindia.com/states/jammu-kashmir/image/hill-stations-jk2.jpg" 
                    alt="Home Banner" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="relative z-10 w-full px-4 sm:px-6">
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 md:mb-8 tracking-tighter text-white">
                    Connected via <span className="text-green-400">Light</span>
                  </h1>
                  <p className="text-gray-200 font-bold text-lg sm:text-xl md:text-2xl mt-2 md:mt-4 mb-8 md:mb-12 max-w-2xl mx-auto">
                    Instant connectivity through any light source. No cables, no radio waves.
                  </p>
                  <button 
                    onClick={() => setActiveTab('packages')}
                    className="bg-green-500 text-white font-black px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-xl shadow-green-500/20 hover:bg-green-400 transition-all uppercase tracking-widest text-xs md:text-sm"
                  >
                    View Packages
                  </button>
                </div>
              </section>

              <section className="mt-8 md:mt-16 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { title: 'Lightning Fast', desc: 'Speeds up to 100x faster than traditional WiFi networks using visible light.' },
                    { title: 'Ultra Secure', desc: 'Light cannot pass through walls, making your network inherently secure from outside hacking.' },
                    { title: 'Zero Interference', desc: 'No radio frequency interference. Works perfectly in RF-restricted environments.' }
                  ].map((feature, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 p-8 flex flex-col justify-between hover:border-black transition-all group shadow-sm rounded-3xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-black text-sm uppercase tracking-tight text-gray-400 group-hover:text-black transition-colors">Feature 0{i + 1}</span>
                      </div>
                      <h3 className="text-2xl font-black mb-3 tracking-tighter">{feature.title}</h3>
                      <p className="text-gray-500 font-bold text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'packages' && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col w-full"
            >
              <header className="mb-10 text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Choose Your Package</h2>
                <p className="text-gray-500 font-bold text-lg mt-4 max-w-2xl">Instant connectivity through any light source. Select the plan that matches your needs.</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-stretch">
                {packages.map((pkg) => {
                  if (pkg.isPopular) {
                    return (
                      <div key={pkg.id} className="bg-black text-white p-6 md:p-10 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500 rounded-full blur-3xl opacity-50"></div>
                        <div>
                          <div className="flex justify-start">
                             <span className="text-xs font-black bg-green-500 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Most Popular</span>
                          </div>
                          <h3 className="text-3xl font-black mt-6 tracking-tighter">{pkg.name}</h3>
                          <p className="text-gray-400 font-bold text-sm mt-2">Ultra speeds for up to {pkg.features[1].split(' ')[0]} devices.</p>
                          <div className="mt-8 flex items-baseline tracking-tighter">
                            <span className="text-4xl md:text-5xl font-black text-white">{pkg.price}</span>
                            <span className="text-gray-400 font-bold text-xl ml-1 mb-1">{pkg.duration}</span>
                          </div>
                          <p className="mt-2 font-black text-green-400 text-xl tracking-tight">{pkg.speed}</p>
                          <ul className="mt-6 space-y-4">
                             {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div> 
                                {feature}
                              </li>
                             ))}
                          </ul>
                        </div>
                        <button 
                          onClick={() => purchasedPackage === pkg.id ? setActiveTab('profile') : initiatePurchase(pkg.id)}
                          className={`w-full font-black py-4 mt-8 rounded-2xl transition-all uppercase tracking-tighter shadow-lg ${
                            purchasedPackage === pkg.id 
                            ? 'bg-white text-black hover:bg-gray-200 shadow-white/10' 
                            : 'bg-green-500 text-white hover:bg-green-400 shadow-green-500/20'
                          }`}
                        >
                          {purchasedPackage === pkg.id ? 'Active Plan' : 'Subscribe'}
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div key={pkg.id} className="bg-white border-2 border-gray-100 p-6 md:p-10 rounded-3xl flex flex-col justify-between hover:border-black transition-all group shadow-sm relative">
                      <div>
                        <div className="flex justify-start">
                           <span className="text-xs font-black bg-gray-100 text-black px-3 py-1 rounded-full uppercase tracking-tighter">
                             {pkg.id === 'basic' ? 'Starter Plan' : 'Enterprise Plan'}
                           </span>
                        </div>
                        <h3 className="text-3xl font-black mt-6 tracking-tighter">{pkg.name}</h3>
                        <p className="text-gray-400 font-bold text-sm mt-2">
                            {pkg.id === 'basic' ? 'Perfect for home basics.' : 'Company/Studio high performance.'}
                        </p>
                        <div className="mt-8 flex items-baseline tracking-tighter">
                          <span className="text-4xl md:text-5xl font-black text-black">{pkg.price}</span>
                          <span className="text-gray-400 font-bold text-xl ml-1 mb-1">{pkg.duration}</span>
                        </div>
                        <p className="mt-2 font-black text-black text-xl tracking-tight">{pkg.speed}</p>
                        <ul className="mt-6 space-y-4">
                           {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-500">
                              <div className="w-1.5 h-1.5 bg-gray-300 group-hover:bg-black rounded-full flex-shrink-0 transition-colors"></div> 
                              {feature}
                            </li>
                           ))}
                        </ul>
                      </div>
                      <button 
                        onClick={() => purchasedPackage === pkg.id ? setActiveTab('profile') : initiatePurchase(pkg.id)}
                        className={`w-full font-black py-4 mt-8 rounded-2xl transition-all uppercase tracking-tighter border-2 ${
                          purchasedPackage === pkg.id 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white border-green-500 text-green-600 group-hover:bg-green-500 group-hover:text-white'
                        }`}
                      >
                        {purchasedPackage === pkg.id ? 'Active Plan' : (pkg.id === 'basic' ? 'Activate Now' : 'Get Enterprise')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full w-full mx-auto"
            >
               <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-full">
                 
                 {/* Left Column: Personal Profile */}
                 <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-gray-100 shadow-sm relative">
                       <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-black uppercase tracking-widest">Personal Details</h2>
                          <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="text-gray-400 hover:text-black transition-colors outline-none">
                             {isEditingProfile ? <X className="w-5 h-5"/> : <Edit2 className="w-5 h-5"/>}
                          </button>
                       </div>

                       {isEditingProfile ? (
                         <div className="space-y-4">
                           <div>
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Full Name</label>
                             <input type="text" placeholder="Your Name" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-black outline-none font-bold placeholder:text-gray-300" />
                           </div>
                           <div>
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Mobile Number</label>
                             <input type="tel" placeholder="e.g. 017XXXXXXX" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-black outline-none font-bold placeholder:text-gray-300" />
                           </div>
                           <div>
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Location / Place</label>
                             <input type="text" placeholder="Your City or Address" value={profileData.location} onChange={e => setProfileData({...profileData, location: e.target.value})} className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-black outline-none font-bold placeholder:text-gray-300" />
                           </div>
                           <button onClick={() => setIsEditingProfile(false)} className="w-full bg-black text-white font-bold py-3 uppercase tracking-tighter text-sm rounded-xl mt-4 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                             <Save className="w-4 h-4" /> Save Profile
                           </button>
                         </div>
                       ) : (
                         <div className="space-y-6">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-gray-400" /></div>
                             <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</p>
                               <p className="font-bold text-base bg-white">{profileData.name || 'Not set'}</p>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center"><Phone className="w-5 h-5 text-gray-400" /></div>
                             <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile Number</p>
                               <p className="font-bold text-base">{profileData.phone || 'Not set'}</p>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center"><MapPin className="w-5 h-5 text-gray-400" /></div>
                             <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                               <p className="font-bold text-base">{profileData.location || 'Not set'}</p>
                             </div>
                           </div>
                         </div>
                       )}
                    </div>

                    {purchasedPackage && (
                      <div className="bg-gray-50 rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-gray-100 flex-1">
                        <div>
                          <h2 className="text-xs md:text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Signal Status</h2>
                          <h1 className="text-3xl md:text-4xl font-black mb-6 md:mb-8 tracking-tighter leading-none">Connected via Light</h1>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gray-500">Transmitter ID</span>
                              <span className="font-mono font-bold text-black">LX-9904-B</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gray-500">Signal Strength</span>
                              <span className="font-bold text-green-500">98% Optimal</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gray-500">Latency</span>
                              <span className="font-bold text-black underline decoration-green-500 decoration-2 underline-offset-4">0.8 ms</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-black text-sm uppercase tracking-tight">Current Usage</span>
                          </div>
                          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full w-2/3"></div>
                          </div>
                          <p className="mt-4 text-xs font-bold text-gray-400 uppercase">
                            <span className="text-black">142.5 GB</span> / ∞ LIMIT
                          </p>
                        </div>
                      </div>
                    )}
                 </div>

                 {/* Right Column: Network Actions & Subscription status */}
                 <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-4 md:gap-6">
                    <header className="mb-2">
                       <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Profile Overview</h2>
                       <p className="text-gray-500 font-bold text-base md:text-lg mt-2">Manage your current connection and devices.</p>
                    </header>

                    {purchasedPackage ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                        <div className="bg-white border-2 border-gray-100 p-8 rounded-3xl flex flex-col justify-between hover:border-black transition-all group shadow-sm">
                           <div>
                             <div className="flex items-center justify-between mb-6">
                               <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                  <Zap className="text-black group-hover:text-green-500 transition-colors" />
                               </div>
                               <span className="text-xs font-black bg-gray-100 px-3 py-1 rounded-full uppercase">Current Speed</span>
                             </div>
                             <h3 className="text-3xl font-black tracking-tighter">{packages.find(p => p.id === purchasedPackage)?.speed}</h3>
                             <p className="text-gray-400 font-bold mt-2 text-sm">{packages.find(p => p.id === purchasedPackage)?.features[1]}</p>
                           </div>
                        </div>

                        <div className="bg-white border-2 border-gray-100 p-8 rounded-3xl flex flex-col justify-between hover:border-black transition-all group shadow-sm">
                           <div>
                             <div className="flex items-center justify-between mb-6">
                               <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                  <Shield className="text-black group-hover:text-green-500 transition-colors" />
                               </div>
                               <span className="text-xs font-black bg-gray-100 px-3 py-1 rounded-full uppercase">Security</span>
                             </div>
                             <h3 className="text-3xl font-black tracking-tighter">Photon-Secured</h3>
                             <p className="text-gray-400 font-bold mt-2 text-sm">End-to-End Encrypted</p>
                           </div>
                        </div>

                        <div className="sm:col-span-2 bg-black text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 group">
                           <div className="flex-1">
                             <h3 className="text-2xl font-black tracking-tighter">Upgrade required?</h3>
                             <p className="text-gray-400 font-bold mt-2">Change your plan at any time to get higher speeds or more capability.</p>
                           </div>
                           <button 
                             onClick={() => setActiveTab('packages')}
                             className="w-full sm:w-auto whitespace-nowrap px-8 py-4 rounded-2xl text-green-500 font-black uppercase tracking-tighter border-2 border-green-500 hover:bg-green-500 hover:text-white transition-colors"
                           >
                             View Plans
                           </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-8 md:p-12 rounded-3xl flex flex-col items-center justify-center text-center flex-1">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                          <Package className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter mb-2">No Active Connection</h3>
                        <p className="text-gray-500 font-bold mb-8 max-w-md">You haven't bought a package yet. Check out our packages to get connected instantly via Light.</p>
                        <button 
                             onClick={() => setActiveTab('packages')}
                             className="bg-green-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-green-500/20 hover:bg-green-400 transition-all uppercase tracking-widest text-sm"
                           >
                             Browse Packages
                        </button>
                      </div>
                    )}
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Payment Checkout Modal Overlay */}
      <AnimatePresence>
        {checkoutPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => paymentStatus === 'idle' && setCheckoutPackage(null)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors disabled:opacity-50"
                disabled={paymentStatus !== 'idle'}
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-3xl font-black mb-2 tracking-tighter">Checkout</h2>
              
              {paymentStatus === 'idle' && (
                <>
                  <p className="text-gray-500 font-bold text-sm mb-8">Select your preferred payment gateway.</p>
                  <div className="flex flex-col gap-4">
                    {/* bKash Payment Method */}
                    <button 
                      onClick={() => processPayment('bkash')} 
                      className="w-full flex items-center justify-between p-5 border-2 border-gray-200 rounded-2xl hover:border-[#E2136E] hover:bg-pink-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <Smartphone className="w-6 h-6 text-gray-400 group-hover:text-[#E2136E] transition-colors" />
                        <span className="font-black text-xl tracking-tighter group-hover:text-[#E2136E] transition-colors uppercase">bKash</span>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#E2136E]" />
                    </button>
                    
                    {/* Nagad Payment Method */}
                    <button 
                      onClick={() => processPayment('nagad')} 
                      className="w-full flex items-center justify-between p-5 border-2 border-gray-200 rounded-2xl hover:border-[#ED1C24] hover:bg-red-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <Smartphone className="w-6 h-6 text-gray-400 group-hover:text-[#ED1C24] transition-colors" />
                        <span className="font-black text-xl tracking-tighter group-hover:text-[#ED1C24] transition-colors uppercase">Nagad</span>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#ED1C24]" />
                    </button>
                    
                    {/* Card Payment Method */}
                    <button 
                      onClick={() => processPayment('card')} 
                      className="w-full flex items-center justify-between p-5 border-2 border-gray-200 rounded-2xl hover:border-black transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="font-black text-xl tracking-tighter transition-colors uppercase">Card / Visa</span>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-black" />
                    </button>
                  </div>
                </>
              )}

              {paymentStatus === 'processing' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-16 h-16 border-4 border-gray-100 border-t-green-500 rounded-full animate-spin mb-6"></div>
                  <p className="font-black text-xl tracking-tighter animate-pulse">Processing Payment...</p>
                  <p className="text-gray-400 font-bold text-sm mt-2">Connecting to secure gateway</p>
                </motion.div>
              )}

              {paymentStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                  <p className="font-black text-2xl tracking-tighter text-green-500">Payment Successful!</p>
                  <p className="text-gray-400 font-bold text-sm mt-2">Activating your LiFi connection...</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-8 pt-4 pb-6 flex justify-between items-center z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.08)] rounded-t-[2rem]">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-black scale-110' : 'text-gray-400 hover:text-black'}`}
        >
          <Home className="w-6 h-6" strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('packages')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'packages' ? 'text-black scale-110' : 'text-gray-400 hover:text-black'}`}
        >
          <Package className="w-6 h-6" strokeWidth={activeTab === 'packages' ? 2.5 : 2} />
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Packages</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'profile' ? 'text-black scale-110' : 'text-gray-400 hover:text-black'}`}
        >
          <User className="w-6 h-6" strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Profile</span>
        </button>
      </div>

      {/* Micro Footer */}
      <footer className="px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 gap-4 mt-auto w-full md:mb-0">
        <span>Quasify Protocol v4.2 // Photon-Encrypted</span>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <span className="hover:text-black cursor-pointer transition-colors">Compliance</span>
          <span className="hover:text-black cursor-pointer transition-colors">Safety Standards</span>
          <span className="hover:text-black cursor-pointer transition-colors">Privacy Matrix</span>
        </div>
        <span className="text-black font-black flex items-center gap-2">System Online <span className="text-green-500 text-[10px]">●</span></span>
      </footer>
    </div>
  );
}
