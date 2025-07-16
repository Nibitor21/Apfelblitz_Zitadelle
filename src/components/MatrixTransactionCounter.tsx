
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Activity, AlertTriangle } from 'lucide-react';

interface CounterData {
  tx_count: number;
}

const MatrixTransactionCounter = () => {
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Smooth counter animation
  const springCounter = useSpring(0, { stiffness: 100, damping: 30 });
  const displayCounter = useTransform(springCounter, (value) => Math.round(value));

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
    const interval = setInterval(fetchCounter, 10000);
    return () => clearInterval(interval);
  }, []);

  // Animate counter smoothly when it changes
  useEffect(() => {
    springCounter.set(counter);
  }, [counter, springCounter]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="matrix-terminal p-6 h-full"
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="matrix-loader mb-4"></div>
            <p className="text-green-400 font-mono">INITIALIZING...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="matrix-terminal p-6 border-red-500 h-full"
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <AlertTriangle className="h-8 w-8 text-red-400 animate-pulse mb-4" />
          <span className="text-red-400 font-mono font-bold text-lg mb-2">SYSTEM ERROR</span>
          <p className="text-red-300 font-mono text-sm">
            CONNECTION TO MAINFRAME LOST
          </p>
          <p className="text-red-400/70 font-mono text-xs mt-2">
            {error}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="matrix-terminal p-6 relative overflow-hidden h-full"
    >
      {/* Glitch Effect Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-green-400"
            animate={{
              opacity: [0, 1, 0],
              x: [0, Math.random() * 100],
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

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Activity className="h-6 w-6 text-green-400 animate-pulse" />
          <span className="text-green-400 font-mono font-bold text-lg">TX_LOG</span>
        </div>

        {/* Counter Display */}
        <div className="flex-1 flex flex-col justify-center text-center">
          <motion.div
            className="mb-4"
          >
            <motion.span className="text-4xl md:text-5xl lg:text-6xl font-black text-green-400 font-mono glitch-text">
              {displayCounter}
            </motion.span>
            <div className="text-green-300 font-mono text-sm mt-2">
              TOTAL_TRANSACTIONS
            </div>
          </motion.div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2">
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
