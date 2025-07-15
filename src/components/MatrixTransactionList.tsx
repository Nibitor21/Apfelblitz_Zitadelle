
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MessageSquare, Clock } from 'lucide-react';

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
        throw new Error('Failed to fetch transaction stream');
      }
      const data: Transaction[] = await response.json();
      console.log('Transaction stream received:', data);
      
      setTransactions(data.slice(0, 5)); // Keep only latest 5
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const transactionDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - transactionDate.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInSeconds < 60) return "JUST_NOW";
    if (diffInMinutes < 60) return diffInMinutes === 1 ? "1_MIN_AGO" : `${diffInMinutes}_MIN_AGO`;
    if (diffInHours < 24) return diffInHours === 1 ? "1_HOUR_AGO" : `${diffInHours}_HOURS_AGO`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? "YESTERDAY" : `${diffInDays}_DAYS_AGO`;
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 15000); // Update every 15 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="matrix-terminal p-6 w-full max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="matrix-loader"></div>
          <span className="text-green-400 font-mono font-bold">ACCESSING_TRANSACTION_STREAM...</span>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="matrix-line animate-pulse">
              <div className="h-4 bg-green-900/30 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matrix-terminal p-6 w-full max-w-4xl border-red-500">
        <div className="text-center">
          <span className="text-red-400 font-mono">STREAM_CONNECTION_FAILED</span>
          <p className="text-red-300 font-mono text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="matrix-terminal p-6 w-full max-w-4xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-green-400 font-mono font-bold">LIVE_TRANSACTION_FEED</div>
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
        <div className="text-green-400 font-mono text-sm">
          LAST_UPDATE: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        <AnimatePresence>
          {transactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Clock className="h-12 w-12 text-green-400/50 mx-auto mb-4 animate-pulse" />
              <p className="text-green-400 font-mono">WAITING_FOR_FIRST_TRANSACTION...</p>
              <p className="text-green-400/70 font-mono text-sm mt-2">THE_MATRIX_IS_READY</p>
            </motion.div>
          ) : (
            transactions.map((transaction, index) => (
              <motion.div
                key={`${transaction.received_at}-${index}`}
                initial={{ opacity: 0, x: -50, rotateX: -90 }}
                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                exit={{ opacity: 0, x: 50, rotateX: 90 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                className="matrix-line hover:bg-green-900/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between p-4">
                  {/* Left side - Amount and badges */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
                      <span className="text-green-400 font-mono font-bold text-lg">
                        {transaction.amount.toLocaleString()}_SATS
                      </span>
                    </div>
                    
                    {transaction.is_zap && (
                      <span className="matrix-pill bg-purple-900/50 border-purple-400 text-purple-300">
                        ZAP
                      </span>
                    )}
                    
                    {transaction.comment && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3 text-green-400" />
                        <span className="text-green-300 font-mono text-sm max-w-xs truncate">
                          "{transaction.comment}"
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right side - Time */}
                  <div className="text-green-400/70 font-mono text-sm">
                    {formatRelativeTime(transaction.received_at)}
                  </div>
                </div>

                {/* Matrix-style data flow effect */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-green-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: index * 0.1 }}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Footer */}
      <div className="mt-6 pt-4 border-t border-green-900/30">
        <div className="text-green-400/70 font-mono text-xs text-center">
          END_OF_STREAM // PRESS_F5_TO_REFRESH // FOLLOW_THE_WHITE_RABBIT
        </div>
      </div>
    </div>
  );
};

export default MatrixTransactionList;
