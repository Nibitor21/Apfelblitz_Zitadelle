
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Bitcoin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TransactionCounter from './TransactionCounter';

const HeroBanner = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Floating Lightning Bolts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              rotate: [0, 360],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              repeatDelay: 2
            }}
          >
            <Zap className="h-4 w-4 text-cyan-400/60" />
          </motion.div>
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        
        {/* Bitcoin Zitadelle Badge */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-lg">Bitcoin Zitadelle Festival 2025</span>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
              Lightning Fast
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl">
              Apple Trading
            </span>
          </h1>
          
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-20"></div>
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-full">
              <Zap className="h-6 w-6 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-semibold text-xl">Powered by Bitcoin Lightning Network</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-20"></div>
          </motion.div>
        </motion.div>

        {/* Transaction Counter */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <TransactionCounter />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
          >
            <Bitcoin className="mr-2 h-5 w-5" />
            <span>Live Transaktionen</span>
          </Button>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
