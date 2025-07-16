
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MessageSquare, Clock, Wallet } from 'lucide-react';

interface Transaction {
  amount: number;
  received_at: string;
  comment?: string;
  lnurlp: string;
  is_zap: boolean;
}

const MatrixTransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('https://testa.bitcoin-darmstadt.de/api/payment_webhook_list');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Transaction[] = await response.json();
      
      // Sort by received_at and take latest 5
      const sortedData = data
        .sort((a, b) => new Date(b.received_at).getTime() - new Date(a.received_at).getTime())
        .slice(0, 5);
      
      setTransactions(sortedData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transaction data');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const transactionDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - transactionDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return "long ago";
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="matrix-terminal p-6 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="matrix-loader"></div>
          <span className="text-green-400 font-mono font-bold">Loading transaction stream...</span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="matrix-line animate-pulse">
              <div className="h-6 bg-green-900/30 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matrix-terminal p-6 w-full max-w-4xl mx-auto border-red-500/50">
        <div className="text-center">
          <span className="text-red-400 font-mono font-bold">Connection Error</span>
          <p className="text-red-300 font-mono text-sm mt-2">{error}</p>
          <button 
            onClick={fetchTransactions}
            className="mt-4 px-4 py-2 bg-red-900/30 border border-red-500/50 text-red-400 rounded hover:bg-red-900/50 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="matrix-terminal p-6 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-green-400 font-mono">
          RECENT TRANSACTIONS
        </h3>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-green-400 font-mono text-sm">LIVE</span>
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {transactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Clock className="h-12 w-12 text-green-400/50 mx-auto mb-4" />
              <p className="text-green-400 font-mono">Waiting for first transaction...</p>
              <p className="text-green-400/70 font-mono text-sm mt-2">The network is ready</p>
            </motion.div>
          ) : (
            transactions.map((tx, index) => (
              <motion.div
                key={`${tx.received_at}-${index}`}
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="matrix-line hover:bg-green-900/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between p-4">
                  {/* Left Side - Main Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400 group-hover:animate-pulse" />
                      <span className="text-green-400 font-mono font-bold text-lg">
                        {tx.amount.toLocaleString()}
                      </span>
                      <span className="text-green-400 font-mono text-sm opacity-70">
                        sats
                      </span>
                    </div>
                    
                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      {tx.is_zap && (
                        <span className="matrix-pill bg-purple-900/50 border-purple-400 text-purple-300 text-xs">
                          ⚡ ZAP
                        </span>
                      )}
                      
                      {tx.comment && (
                        <div className="flex items-center gap-1 max-w-[200px]">
                          <MessageSquare className="h-3 w-3 text-green-400" />
                          <span className="text-green-300 font-mono text-sm truncate">
                            {tx.comment}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side - Time */}
                  <div className="text-green-400/70 font-mono text-sm text-right">
                    {formatTimeAgo(tx.received_at)}
                  </div>
                </div>

                {/* Animated Bottom Border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-green-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-green-900/30 text-center">
        <p className="text-green-400/70 font-mono text-xs">
          Auto-refresh every 30s • Last update: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default MatrixTransactionList;
