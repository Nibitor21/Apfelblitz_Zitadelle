
import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import MatrixTransactionCounter from '@/components/MatrixTransactionCounter';
import MatrixTransactionList from '@/components/MatrixTransactionList';
import MatrixWalletBalance from '@/components/MatrixWalletBalance';
import MatrixAppleChoice from '@/components/MatrixAppleChoice';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 overflow-x-hidden relative">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="matrix-rain"></div>
      </div>

      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="scanlines"></div>
      </div>

      {/* Hero Section */}
      <HeroBanner />

      {/* Main Content Grid */}
      <div className="relative z-10 px-4 md:px-6 py-16 space-y-20">
        
        {/* The Choice Section */}
        <motion.section 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-green-400 glitch-text">
              THE CHOICE IS YOURS
            </h2>
            <p className="text-green-300 text-lg md:text-xl max-w-3xl mx-auto font-mono">
              In the Matrix, there are only two paths. Which apple will you choose? 
              The decision will determine your destiny in the Bitcoin realm.
            </p>
          </div>
          <MatrixAppleChoice />
        </motion.section>

        {/* System Status Dashboard */}
        <motion.section 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Transaction Counter */}
          <div className="lg:col-span-1">
            <MatrixTransactionCounter />
          </div>

          {/* Wallet Status */}
          <div className="lg:col-span-2">
            <MatrixWalletBalance />
          </div>
        </motion.section>

        {/* Live Transaction Feed */}
        <motion.section 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-green-400 glitch-text">
              TRANSACTION STREAM
            </h2>
            <p className="text-green-300 text-lg md:text-xl max-w-2xl mx-auto font-mono">
              Live feed from the Bitcoin Lightning Network. Every choice leaves a trace.
            </p>
          </div>
          <MatrixTransactionList />
        </motion.section>

        {/* Footer Section */}
        <motion.section 
          className="flex flex-col items-center text-center py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-green-400 mb-4 glitch-text">
              WELCOME TO THE REAL WORLD
            </h3>
            <p className="text-green-300 text-lg md:text-xl max-w-3xl leading-relaxed mb-8 font-mono">
              You've taken your first step into a larger world. These aren't ordinary apples – 
              they're keys to understanding the true nature of digital currency. 
              <br />
              <span className="text-red-400">The Matrix has you...</span> but Bitcoin will set you free.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-green-400 font-mono">
            <span className="matrix-pill">🍎 ORGANIC APPLES</span>
            <span className="matrix-pill">⚡ LIGHTNING NETWORK</span>
            <span className="matrix-pill">₿ BITCOIN ONLY</span>
            <span className="matrix-pill">🕶️ MATRIX APPROVED</span>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
