
import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '@/components/HeroBanner';
import WalletBalance from '@/components/WalletBalance';
import TransactionTable from '@/components/TransactionTable';
import AppleProducts from '@/components/AppleProducts';
import { Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <HeroBanner />

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-6 py-16 space-y-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        
        {/* Apple Products & Lightning Payment Section */}
        <motion.section 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-red-400 bg-clip-text text-transparent">
              Wähle deinen Apfel
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Frisch geerntet und direkt verfügbar. Bezahle einfach per Lightning Network.
            </p>
          </div>
          <AppleProducts />
        </motion.section>

        {/* Wallet Balance Section */}
        <motion.section 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              Wallet Status
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Live-Überblick über die aktuellen Wallet-Bestände der Apfelverkäufer.
            </p>
          </div>
          <WalletBalance />
        </motion.section>

        {/* Transactions Section */}
        <motion.section 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Live Transaktionen
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Verfolge alle Lightning-Zahlungen in Echtzeit. Jede Transaktion wird sofort angezeigt.
            </p>
          </div>
          <TransactionTable />
        </motion.section>

        {/* Footer Section */}
        <motion.section 
          className="flex flex-col items-center text-center py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Zap className="h-10 w-10 text-cyan-400 animate-pulse" />
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Bitcoin Zitadelle Festival 2025
            </h3>
            <Zap className="h-10 w-10 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
            Eine digitale Kunstinstallation, die das Potenzial von Bitcoin und Lightning Network 
            für den alltäglichen Handel demonstriert. Erlebe die Zukunft des Geldes – 
            schnell, günstig und ohne Grenzen.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>🍎 Frische Bio-Äpfel</span>
            <span>⚡ Lightning Network</span>
            <span>🎨 Digital Art Installation</span>
            <span>🏰 Bitcoin Zitadelle</span>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
