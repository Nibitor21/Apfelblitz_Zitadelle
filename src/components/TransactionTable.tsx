
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp } from 'lucide-react';

interface Transaction {
  amount: number;
  received_at: string;
}

const TransactionTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://testa.apfelblitz.de/api/payment_webhook');
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 15000); // Refresh every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700 w-full max-w-4xl">
        <CardHeader>
          <div className="h-6 bg-slate-700 rounded w-1/3 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-800 rounded animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-500/30 w-full max-w-4xl">
        <CardContent className="p-6">
          <p className="text-red-400">Error loading transactions: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <TrendingUp className="h-6 w-6 text-green-400" />
          Live Transaktionen
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            <Zap className="h-3 w-3 mr-1 animate-pulse" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Warte auf erste Lightning-Zahlung...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 10).map((transaction, index) => (
              <div 
                key={`${transaction.received_at}-${index}`}
                className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-400 font-mono text-lg font-bold">
                    {transaction.amount.toLocaleString()} sats
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  {formatDate(transaction.received_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
