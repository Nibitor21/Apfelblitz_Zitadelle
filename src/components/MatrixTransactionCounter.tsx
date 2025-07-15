
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, AlertTriangle } from 'lucide-react';

interface CounterData {
  tx_count: number;
}

const MatrixTransactionCounter = () => {
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCounter = async () => {
    try {
      const response = await fetch('https://testa.bitcoin-darmstadt.de/api/counter_webhook');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: CounterData = await response.json();
      console.log('Counter data received:', data);
      
      if (typeof data.tx_count === 'number') {
        setCounter(data.tx_count);
        setError(null);
      } else {
        throw new Error('Invalid counter data format');
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
    const interval = setInterval(fetchCounter, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="matrix-terminal p-6"
      >
        <div className="flex items-center justify-center">
          <div className="matrix-loader"></div>
        </div>
        <p className="text-green-400 font-mono text-center mt-4">INITIALIZING...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="matrix-terminal p-6 border-red-500"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse" />
          <span className="text-red-400 font-mono font-bold">SYSTEM ERROR</span>
        </div>
        <p className="text-red-300 font-mono text-sm text-center">
          CONNECTION TO MAINFRAME LOST
        </p>
        <p className="text-red-400/70 font-mono text-xs text-center mt-2">
          {error}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="matrix-terminal p-6 relative overflow-hidden"
    >
      {/* Glitch Effect Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-green-400"
            animate={{
              opacity: [0, 1, 0],
              x: [0, Math.random() * 200],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
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
        <div className="flex items-center gap-3 mb-6">
          <Activity className="h-6 w-6 text-green-400 animate-pulse" />
          <span className="text-green-400 font-mono font-bold text-lg">TRANSACTION_LOG</span>
        </div>

        {/* Counter Display */}
        <div className="text-center">
          <motion.div
            key={counter}
            initial={{ scale: 1.2, opacity: 0, rotateX: 90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-4"
          >
            <span className="text-6xl font-black text-green-400 font-mono glitch-text">
              {counter.toLocaleString()}
            </span>
            <div className="text-green-300 font-mono text-sm mt-2">
              TOTAL_TRANSACTIONS_PROCESSED
            </div>
          </motion.div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-green-400 font-mono text-xs">SYSTEM_ONLINE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatrixTransactionCounter;
