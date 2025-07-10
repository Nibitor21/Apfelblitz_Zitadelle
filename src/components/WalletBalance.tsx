import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Wallet, DollarSign, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Balance {
  balance: number;
  wallet_name: string;
}

const WalletBalance = () => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5013/api/balance_webhook');
        if (!response.ok) {
          throw new Error('Failed to fetch balances');
        }
        const data = await response.json();
        setBalances(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching balances:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
    const interval = setInterval(fetchBalances, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatWalletName = (name: string) => {
    return name.replace('Apfelblitz.de_', '').replace('Apfelblitz.de', 'Main Wallet');
  };

  const getWalletConfig = (index: number) => {
    const configs = [
      {
        gradient: 'from-amber-400 via-yellow-500 to-orange-600',
        icon: Wallet,
        iconColor: 'text-amber-400',
        shadowColor: 'shadow-amber-500/25',
        borderGlow: 'hover:shadow-amber-400/40',
        particles: 'bg-amber-400/30',
        accentIcon: DollarSign
      },
      {
        gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
        icon: Zap,
        iconColor: 'text-cyan-400',
        shadowColor: 'shadow-cyan-500/25',
        borderGlow: 'hover:shadow-cyan-400/40',
        particles: 'bg-cyan-400/30',
        accentIcon: Sparkles
      }
    ];
    return configs[index % configs.length];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse"></div>
                  <div className="h-6 bg-slate-700 rounded w-32 animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-12 bg-slate-700 rounded w-40 mb-4 animate-pulse"></div>
              </CardContent>
            </Card>
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
        className="w-full max-w-6xl"
      >
        <Card className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border-2 border-red-500/30 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <Zap className="h-12 w-12 text-red-400 mx-auto animate-pulse" />
            </div>
            <p className="text-red-400 text-lg font-medium">Error loading wallet balances</p>
            <p className="text-gray-400 text-sm mt-2">{error}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
      <AnimatePresence>
        {balances.map((balance, index) => {
          const config = getWalletConfig(index);
          const Icon = config.icon;
          const AccentIcon = config.accentIcon;
          
          return (
            <motion.div
              key={balance.wallet_name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ 
                delay: index * 0.1, 
                type: "spring", 
                stiffness: 200, 
                damping: 20 
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(balance.wallet_name)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group cursor-pointer"
            >
              <Card className={`
                relative overflow-hidden bg-gradient-to-br ${config.gradient}
                border-0 ${config.shadowColor} shadow-xl ${config.borderGlow}
                transition-all duration-500 backdrop-blur-sm
              `}>
                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 ${config.particles} rounded-full opacity-60`}
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
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

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>

                <CardHeader className="pb-6 relative z-10">
                  <CardTitle className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Icon className={`h-10 w-10 ${config.iconColor} ${index === 1 ? 'animate-pulse' : ''}`} />
                        {hoveredCard === balance.wallet_name && (
                          <motion.div
                            className={`absolute inset-0 ${config.iconColor.replace('text-', 'bg-')}/20 rounded-full`}
                            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <div>
                        <span className="text-xl font-bold text-white">
                          {formatWalletName(balance.wallet_name)}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Sparkles className="h-4 w-4 text-white/70" />
                          <span className="text-white/70 text-sm">Live Balance</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={hoveredCard === balance.wallet_name ? { rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <AccentIcon className="h-7 w-7 text-white/70" />
                    </motion.div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 pb-8">
                  {/* Balance Display */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-3">
                      <motion.span 
                        className="text-5xl font-black text-white drop-shadow-xl"
                        key={balance.balance}
                        initial={{ scale: 1.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {balance.balance.toLocaleString()}
                      </motion.span>
                      <span className="text-white/80 text-xl font-semibold">sats</span>
                    </div>
                    
                    {/* USD Equivalent */}
                    <p className="text-white/70 text-base font-medium">
                      ≈ ${(balance.balance * 0.0004).toFixed(2)} USD
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-white/80 text-sm font-medium">Online & Synced</span>
                    </div>
                    
                    <div className="text-white/60 text-xs">
                      Aktualisiert: jetzt
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default WalletBalance;
