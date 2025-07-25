
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, AlertCircle } from 'lucide-react';

interface CounterData {
  count: number;
}

const TransactionCounter = () => {
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCounter = async () => {
    try {
      const response = await fetch('https://aurora.lnbot.de/api/payment_webhook');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Payment data received:', data);
      
      // Da wir nur die letzte Zahlung bekommen, simulieren wir einen Counter
      // In der Realität würden Sie einen separaten Counter-Endpunkt haben
      if (data.amount && data.received_at) {
        setCounter(prev => prev + 1);
        setError(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching counter:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounter();
    const interval = setInterval(fetchCounter, 15000); // Update every 15 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-4 px-8 py-6 bg-slate-800/30 backdrop-blur-sm border border-cyan-400/20 rounded-2xl"
      >
        <div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse"></div>
        <div className="h-6 bg-slate-700 rounded w-32 animate-pulse"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-4 px-8 py-6 bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl"
      >
        <AlertCircle className="h-6 w-6 text-red-400" />
        <div className="text-center">
          <span className="text-red-400 text-sm font-medium">Counter nicht verfügbar</span>
          <p className="text-red-400/70 text-xs mt-1">Backend-Verbindung fehlgeschlagen</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
      
      <div className="relative flex items-center justify-center gap-6 px-10 py-8 bg-slate-800/40 backdrop-blur-sm border border-cyan-400/30 rounded-2xl overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                x: [0, Math.random() * 100],
                y: [0, Math.random() * 100],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
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

        {/* Icon */}
        <div className="relative">
          <TrendingUp className="h-8 w-8 text-green-400 animate-pulse" />
          <motion.div
            className="absolute inset-0 bg-green-400/20 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Counter Content */}
        <div className="text-center">
          <div className="flex items-baseline gap-2 mb-2">
            <motion.span 
              className="text-4xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
              key={counter}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {counter.toLocaleString()}
            </motion.span>
          </div>
          <p className="text-gray-300 text-sm font-medium">
            Aktive Transaktionen
          </p>
        </div>

        {/* Lightning Icon */}
        <div className="relative">
          <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
          <motion.div
            className="absolute inset-0 bg-yellow-400/20 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCounter;
