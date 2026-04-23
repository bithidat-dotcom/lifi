import React, { useState } from 'react';
import { Wifi, Zap, Shield, Check, Menu, X, ArrowRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'packages' | 'dashboard'>('home');
  const [purchasedPackage, setPurchasedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'basic',
      name: 'Photon Lite',
      price: '$4.99',
      duration: '/24h',
      speed: '100 Mbps',
      features: ['Basic browsing', 'Standard support', '1 Device'],
      isPopular: false,
    },
    {
      id: 'pro',
      name: 'Photon Pro',
      price: '$59',
      duration: '/mo',
      speed: '1 Gbps Down/Up',
      features: ['HD Streaming', 'Priority support', 'Unlimited Nodes', 'Low latency'],
      isPopular: true,
    },
    {
      id: 'ultra',
      name: 'Lux Elite',
      price: '$499',
      duration: '/yr',
      speed: '10 Gbps',
      features: ['Enterprise grade', '24/7 Premium support', 'Unlimited Devices', 'Zero interference'],
      isPopular: false,
    },
  ];

  const handlePurchase = (pkgId: string) => {
    setPurchasedPackage(pkgId);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col overflow-x-hidden select-none selection:bg-green-200">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-gray-100 z-50 relative bg-white">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter">LUXNET</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-bold">
          <button 
            onClick={() => setActiveTab('home')}
            className={`transition-colors ${activeTab === 'home' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`transition-colors ${activeTab === 'packages' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'}`}
          >
            Coverage
          </button>
          {purchasedPackage && (
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`transition-colors ${activeTab === 'dashboard' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-400 hover:text-black'}`}
            >
              Devices
            </button>
          )}
          <button 
            onClick={() => setActiveTab('packages')}
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
            <div className="px-6 pt-4 pb-8 flex flex-col gap-4 font-bold text-lg">
              <button 
                onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                className={`text-left py-2 border-b border-gray-50 ${activeTab === 'home' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => { setActiveTab('packages'); setIsMenuOpen(false); }}
                className={`text-left py-2 border-b border-gray-50 ${activeTab === 'packages' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                Coverage
              </button>
              {purchasedPackage && (
                <button 
                  onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }}
                  className={`text-left py-2 border-b border-gray-50 ${activeTab === 'dashboard' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                >
                  Devices
                </button>
              )}
              <button 
                onClick={() => { setActiveTab('packages'); setIsMenuOpen(false); }}
                className="bg-green-500 text-white shadow-lg shadow-green-200 font-bold py-4 px-6 rounded-2xl w-full mt-4 uppercase tracking-widest text-sm"
              >
                My Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 md:px-10 py-10 max-w-[1440px] mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <section className="relative py-20 text-center flex flex-col items-center justify-center">
                <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
                  Connected via <span className="text-green-500">Light</span>
                </h1>
                <p className="text-gray-500 font-bold text-xl md:text-2xl mt-4 mb-12 max-w-2xl mx-auto">
                  Instant connectivity through any light source. No cables, no radio waves.
                </p>
                <button 
                  onClick={() => setActiveTab('packages')}
                  className="bg-green-500 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-green-200 hover:bg-green-600 transition-all uppercase tracking-widest text-sm"
                >
                  View Packages
                </button>
              </section>

              <section className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <div key={pkg.id} className="bg-black text-white p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500 rounded-full blur-3xl opacity-50"></div>
                        <div>
                          <div className="flex justify-start">
                             <span className="text-xs font-black bg-green-500 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Most Popular</span>
                          </div>
                          <h3 className="text-3xl font-black mt-6 tracking-tighter">{pkg.name}</h3>
                          <p className="text-gray-400 font-bold text-sm mt-2">High-speed Li-Fi for intensive work.</p>
                          <div className="mt-8 flex items-baseline tracking-tighter">
                            <span className="text-5xl font-black text-white">{pkg.price}</span>
                            <span className="text-gray-400 font-bold text-xl ml-1 mb-1">{pkg.duration}</span>
                          </div>
                          <ul className="mt-8 space-y-4">
                             {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div> 
                                {feature}
                              </li>
                             ))}
                          </ul>
                        </div>
                        <button 
                          onClick={() => handlePurchase(pkg.id)}
                          className="w-full bg-green-500 text-white font-black py-4 mt-10 rounded-2xl hover:bg-green-400 transition-all uppercase tracking-tighter shadow-lg shadow-green-500/20"
                        >
                          {purchasedPackage === pkg.id ? 'Current Plan' : 'Subscribe'}
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div key={pkg.id} className="bg-white border-2 border-gray-100 p-8 md:p-10 rounded-3xl flex flex-col justify-between hover:border-black transition-all group shadow-sm relative">
                      <div>
                        <div className="flex justify-start">
                           <span className="text-xs font-black bg-gray-100 text-black px-3 py-1 rounded-full uppercase tracking-tighter">
                             {pkg.id === 'basic' ? 'Daily Pass' : 'Annual Plan'}
                           </span>
                        </div>
                        <h3 className="text-3xl font-black mt-6 tracking-tighter">{pkg.name}</h3>
                        <p className="text-gray-400 font-bold text-sm mt-2">
                            {pkg.id === 'basic' ? 'Perfect for guests and public spaces.' : 'Enterprise grade infrastructure.'}
                        </p>
                        <div className="mt-8 flex items-baseline tracking-tighter">
                          <span className="text-5xl font-black text-black">{pkg.price}</span>
                          <span className="text-gray-400 font-bold text-xl ml-1 mb-1">{pkg.duration}</span>
                        </div>
                        <ul className="mt-8 space-y-4">
                           {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-500">
                              <div className="w-1.5 h-1.5 bg-gray-300 group-hover:bg-black rounded-full flex-shrink-0 transition-colors"></div> 
                              {feature}
                            </li>
                           ))}
                        </ul>
                      </div>
                      <button 
                        onClick={() => handlePurchase(pkg.id)}
                        className="w-full bg-white border-2 border-green-500 text-green-600 font-black py-4 mt-10 rounded-2xl group-hover:bg-green-500 group-hover:text-white transition-all uppercase tracking-tighter"
                      >
                        {purchasedPackage === pkg.id ? 'Current Plan' : (pkg.id === 'basic' ? 'Activate Now' : 'Get Enterprise')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'dashboard' && purchasedPackage && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full w-full mx-auto"
            >
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                 
                 {/* Left: Connection Status */}
                 <div className="md:col-span-4 bg-gray-50 rounded-3xl p-8 flex flex-col justify-between border border-gray-100 min-h-[500px]">
                   <div>
                     <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Signal Status</h2>
                     <h1 className="text-4xl font-black mb-8 tracking-tighter leading-none">Connected via Light</h1>
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
                       <span className="text-black">142.5 GB</span> / 250 GB LIMIT
                     </p>
                   </div>
                 </div>

                 {/* Right: Network Actions */}
                 <div className="md:col-span-8 flex flex-col gap-6">
                    <header className="mb-2">
                       <h2 className="text-4xl font-black tracking-tighter">Network Overview</h2>
                       <p className="text-gray-500 font-bold text-lg mt-2">Manage your current connection and devices.</p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                      <div className="bg-white border-2 border-gray-100 p-8 rounded-3xl flex flex-col justify-between hover:border-black transition-all group shadow-sm">
                         <div>
                           <div className="flex items-center justify-between mb-6">
                             <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                <Zap className="text-black group-hover:text-green-500 transition-colors" />
                             </div>
                             <span className="text-xs font-black bg-gray-100 px-3 py-1 rounded-full uppercase">Speed</span>
                           </div>
                           <h3 className="text-3xl font-black tracking-tighter">{packages.find(p => p.id === purchasedPackage)?.speed}</h3>
                           <p className="text-gray-400 font-bold mt-2 text-sm">Download/Upload Sync</p>
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
                           <p className="text-gray-400 font-bold mt-2 text-sm">Zero RF leakage possible</p>
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
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Micro Footer */}
      <footer className="px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 gap-4 mt-auto w-full">
        <span>LuxNet Protocol v4.2 // Photon-Encrypted</span>
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
