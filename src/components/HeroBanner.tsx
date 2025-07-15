
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, Terminal } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Matrix Code Rain Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-sm"
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            {Array.from({ length: Math.floor(Math.random() * 20) + 5 }, (_, j) => (
              <div key={j} style={{ opacity: Math.max(0, 1 - j * 0.1) }}>
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Glitch Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        
        {/* System Boot Message */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="matrix-pill bg-red-900/30 border-red-400 text-red-300 mb-4">
            <Terminal className="h-4 w-4 mr-2" />
            SYSTEM_INITIALIZED // BITCOIN_ZITADELLE_2025
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-tight mb-8 font-mono">
            <span className="text-red-400 glitch-text block mb-4">
              WAKE UP
            </span>
            <span className="text-green-400 glitch-text block">
              NEO
            </span>
          </h1>
          
          <div className="text-2xl md:text-4xl font-mono text-green-300 mb-8">
            THE_MATRIX_HAS_YOU...
          </div>
          
          <motion.div 
            className="flex items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="matrix-line px-6 py-3">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                <span className="text-green-400 font-mono text-xl font-bold">
                  POWERED_BY_LIGHTNING_NETWORK
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* The Choice Introduction */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="matrix-terminal max-w-4xl mx-auto p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Eye className="h-8 w-8 text-green-400 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono">
                THE_CHOICE_IS_COMING
              </h2>
              <Eye className="h-8 w-8 text-red-400 animate-pulse" />
            </div>
            
            <p className="text-green-300 text-lg md:text-xl font-mono leading-relaxed mb-6">
              You've lived in a world of digital illusion. But today, at the Bitcoin Zitadelle Festival, 
              you have a chance to see how deep the rabbit hole goes...
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="matrix-line border-red-500/30 p-4">
                <span className="text-red-400 font-mono font-bold text-lg">🔴 RED APPLE</span>
                <p className="text-red-300 font-mono text-sm mt-2">
                  "Show me the truth"
                </p>
              </div>
              <div className="matrix-line border-green-500/30 p-4">
                <span className="text-green-400 font-mono font-bold text-lg">🟢 GREEN APPLE</span>
                <p className="text-green-300 font-mono text-sm mt-2">
                  "Keep me in blissful ignorance"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Morpheus Quote */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-green-400 font-mono text-xl md:text-2xl italic leading-relaxed">
              "This is your last chance. After this, there is no going back."
            </p>
            <p className="text-green-400/70 font-mono text-sm mt-4">
              - MORPHEUS, THE_MATRIX (1999)
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-green-400 font-mono text-xs mt-2 text-center">
          SCROLL_TO_CONTINUE
        </p>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
