
import React from 'react';
import { motion } from 'framer-motion';
import MatrixTransactionCounter from './MatrixTransactionCounter';
import MatrixWalletBalance from './MatrixWalletBalance';
import MatrixTransactionList from './MatrixTransactionList';

const NetworkStatsSection = () => {
  return (
    <motion.section 
      className="px-4 md:px-6 py-20 bg-gradient-to-b from-black via-green-950/5 to-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
            LIVE NETWORK STATUS
          </h2>
          <p className="text-green-300/70 text-lg max-w-2xl mx-auto">
            Real-time data flowing through the Lightning Network
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {/* Transaction Counter - Featured */}
          <motion.div
            className="xl:col-span-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <MatrixTransactionCounter />
          </motion.div>

          {/* Wallet Balances - Takes up more space */}
          <motion.div
            className="lg:col-span-1 xl:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-full">
              <MatrixWalletBalance />
            </div>
          </motion.div>
        </div>

        {/* Transaction Feed - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <MatrixTransactionList />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NetworkStatsSection;
