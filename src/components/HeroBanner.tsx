
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Bitcoin } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>
      
      {/* Animated lightning bolts */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              repeatDelay: 3
            }}
          >
            <Zap className="h-6 w-6 text-cyan-400" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Bitcoin Zitadelle Banner placeholder */}
        <motion.div 
          className="mb-8 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className="w-full max-w-2xl mx-auto h-32 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-lg flex items-center justify-center border-2 border-yellow-400/50 shadow-2xl backdrop-blur-sm">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-black mb-2">
                BITCOIN ZITADELLE
              </h1>
              <p className="text-black/80 text-lg font-semibold">
                Festival 2025
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Äpfel gegen Sats
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Frische Bio-Äpfel bezahlen mit{' '}
          <span className="text-cyan-400 font-semibold inline-flex items-center gap-2">
            Lightning Network
            <Zap className="h-6 w-6 animate-pulse" />
          </span>
        </motion.p>

        {/* Feature badges */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {[
            { icon: Zap, text: 'Instant Payment', color: 'text-cyan-400 border-cyan-400/30' },
            { icon: Bitcoin, text: 'Bitcoin Only', color: 'text-yellow-400 border-yellow-400/30' },
          ].map((badge, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-black/30 backdrop-blur-sm ${badge.color}`}
            >
              <badge.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
};

export default HeroBanner;
