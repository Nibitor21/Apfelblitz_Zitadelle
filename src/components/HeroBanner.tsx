
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Signal } from 'lucide-react';
import MatrixText from './MatrixText';

const HeroBanner = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Subtle Matrix Rain Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs"
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            {Array.from({ length: Math.floor(Math.random() * 15) + 5 }, (_, j) => (
              <div key={j} style={{ opacity: Math.max(0, 1 - j * 0.15) }}>
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        
        {/* Matrix Text Header with smooth animation */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <MatrixText 
            text="WELCOME, PLEB"
            className="text-2xl md:text-3xl tracking-wider mb-4 min-h-0 flex"
            initialDelay={500}
            letterInterval={120}
            letterAnimationDuration={600}
          />
        </motion.div>

        {/* Main Title with Matrix effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.0 }}
          className="mb-8"
        >
          <div className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <MatrixText 
              text="TAKE CONTROL."
              className="block text-green-400 mb-2 min-h-0 flex justify-center"
              initialDelay={2500}
              letterInterval={100}
              letterAnimationDuration={400}
            />
            <MatrixText 
              text="UNPLUG GRACEFULLY."
              className="block text-white min-h-0 flex justify-center"
              initialDelay={4000}
              letterInterval={100}
              letterAnimationDuration={400}
            />
          </div>
          
          <motion.p 
            className="text-lg md:text-xl text-green-300/80 max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 1 }}
          >
            No banks. No borders. Just you and the signal.
          </motion.p>
        </motion.div>

        {/* Tech Badge */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 7 }}
        >
          <div className="inline-flex items-center gap-3 matrix-terminal px-6 py-3">
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-green-400 font-mono text-sm font-bold">
              ⚡ pwrd by Lightning & Nostr
            </span>
            <Signal className="h-5 w-5 text-green-400" />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 7.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 197, 94, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 min-w-[200px]"
          >
            ENTER THE MARKET
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 197, 94, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-green-500 text-green-400 hover:bg-green-500/10 font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 min-w-[200px]"
          >
            LEARN MORE
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-green-400 font-mono text-xs mt-2 text-center">
          scroll_down
        </p>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
