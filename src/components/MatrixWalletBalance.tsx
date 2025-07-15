
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Database, AlertTriangle } from 'lucide-react';

interface Balance {
  balance: number;
  wallet_name: string;
}

const MatrixWalletBalance = () => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetch('https://testa.bitcoin-darmstadt.de/api/balance_webhook');
        if (!response.ok) {
          throw new Error('Failed to access wallet matrix');
        }
        const data = await response.json();
        setBalances(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching wallet balances:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
    const interval = setInterval(fetchBalances, 20000); // Update every 20 seconds
    return () => clearInterval(interval);
  }, []);

  const formatWalletName = (name: string) => {
    return name.replace('Apfelblitz.de_', '').replace('Apfelblitz.de', 'MAINFRAME').toUpperCase();
  };

  const getWalletConfig = (name: string, index: number) => {
    if (name.toLowerCase().includes('red') || name.toLowerCase().includes('rot')) {
      return {
        color: 'text-red-400',
        borderColor: 'border-red-500/50',
        bgGlow: 'bg-red-900/20',
        pill: '🔴 RED_PILL',
        description: 'CHOICE_OF_TRUTH'
      };
    } else if (name.toLowerCase().includes('green') || name.toLowerCase().includes('grün')) {
      return {
        color: 'text-green-400',
        borderColor: 'border-green-500/50',
        bgGlow: 'bg-green-900/20',
        pill: '🟢 GREEN_PILL',
        description: 'CHOICE_OF_BLISS'
      };
    } else {
      return {
        color: 'text-blue-400',
        borderColor: 'border-blue-500/50',
        bgGlow: 'bg-blue-900/20',
        pill: '🔵 UNKNOWN',
        description: 'CLASSIFIED_WALLET'
      };
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="matrix-terminal p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="matrix-loader"></div>
              <span className="text-green-400 font-mono">ACCESSING_WALLET_{i}</span>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-green-900/30 rounded animate-pulse"></div>
              <div className="h-8 bg-green-900/30 rounded animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="matrix-terminal p-6 border-red-500 w-full"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse" />
          <span className="text-red-400 font-mono font-bold">WALLET_ACCESS_DENIED</span>
        </div>
        <p className="text-red-300 font-mono text-sm text-center">{error}</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <AnimatePresence>
        {balances.map((balance, index) => {
          const config = getWalletConfig(balance.wallet_name, index);
          
          return (
            <motion.div
              key={balance.wallet_name}
              initial={{ opacity: 0, y: 30, rotateY: -90 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -30, rotateY: 90 }}
              transition={{ 
                delay: index * 0.2, 
                type: "spring", 
                stiffness: 200 
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredWallet(balance.wallet_name)}
              onHoverEnd={() => setHoveredWallet(null)}
              className={`matrix-terminal ${config.borderColor} ${config.bgGlow} p-6 relative overflow-hidden group cursor-pointer`}
            >
              {/* Matrix Data Flow Background */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-px h-full ${config.color.replace('text-', 'bg-')}`}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [0, Math.random() * 100],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Database className={`h-6 w-6 ${config.color} animate-pulse`} />
                    <span className={`${config.color} font-mono font-bold text-lg`}>
                      WALLET_STATUS
                    </span>
                  </div>
                  
                  <motion.div
                    animate={hoveredWallet === balance.wallet_name ? { rotate: 360 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Wallet className={`h-5 w-5 ${config.color}`} />
                  </motion.div>
                </div>

                {/* Wallet Info */}
                <div className="mb-6">
                  <div className={`text-sm font-mono ${config.color}/70 mb-2`}>
                    WALLET_ID: {formatWalletName(balance.wallet_name)}
                  </div>
                  <div className="matrix-pill bg-black/50 border-white/20 text-white/70 text-xs">
                    {config.pill}
                  </div>
                  <div className={`text-xs font-mono ${config.color}/50 mt-1`}>
                    {config.description}
                  </div>
                </div>

                {/* Balance Display */}
                <div className="text-center">
                  <motion.div
                    key={balance.balance}
                    initial={{ scale: 1.2, opacity: 0, rotateX: 90 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mb-4"
                  >
                    <span className={`text-4xl font-black ${config.color} font-mono glitch-text`}>
                      {balance.balance.toLocaleString()}
                    </span>
                    <div className={`${config.color}/70 font-mono text-sm mt-1`}>
                      SATOSHI_UNITS
                    </div>
                  </motion.div>

                  {/* USD Equivalent */}
                  <p className={`${config.color}/50 font-mono text-sm mb-4`}>
                    FIAT_EQUIV: ${(balance.balance * 0.0004).toFixed(2)}_USD
                  </p>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className={`w-2 h-2 ${config.color.replace('text-', 'bg-')} rounded-full`}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className={`${config.color}/80 font-mono text-xs`}>
                      ONLINE_SYNCHRONIZED
                    </span>
                  </div>
                  
                  <div className={`${config.color}/40 font-mono text-xs`}>
                    LAST_SYNC: NOW
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default MatrixWalletBalance;
