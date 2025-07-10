import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface Transaction {
  amount: number;
  received_at: string;
}

const TransactionTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 5;
  const maxTransactions = 210;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://testa.apfelblitz.de/api/payment_webhook');
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data: Transaction = await response.json();

        // Duplikat-Prüfung über Timestamp
        setTransactions(prev => {
          const alreadyExists = prev.some(tx => tx.received_at === data.received_at);
          if (alreadyExists) return prev;

          const updated = [data, ...prev];
          return updated.slice(0, maxTransactions); // Liste begrenzen
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 15000);
    return () => clearInterval(interval);
  }, []);

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const transactionDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - transactionDate.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Just now (less than 1 minute)
    if (diffInSeconds < 60) {
      return "Gerade eben";
    }

    // Less than 1 hour
    if (diffInMinutes < 60) {
      return `vor ${diffInMinutes} Min`;
    }

    // Today (same day)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (transactionDate >= todayStart) {
      return "Heute";
    }

    // Yesterday
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    if (transactionDate >= yesterdayStart) {
      return "Gestern";
    }

    // This week (within 7 days)
    if (diffInDays <= 7) {
      return "Diese Woche";
    }

    // This month (same month and year)
    if (transactionDate.getMonth() === now.getMonth() && 
        transactionDate.getFullYear() === now.getFullYear()) {
      return "Diesen Monat";
    }

    // Older than this month - show actual date
    return transactionDate.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const startIndex = currentPage * transactionsPerPage;
  const currentTransactions = transactions.slice(startIndex, startIndex + transactionsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700 w-full max-w-4xl backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="h-6 bg-slate-700 rounded w-1/3 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg animate-pulse">
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
      <Card className="bg-red-900/20 border-red-500/30 w-full max-w-4xl backdrop-blur-sm">
        <CardContent className="p-6">
          <p className="text-red-400">Error loading transactions: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm w-full max-w-4xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-white text-xl font-bold">
          <TrendingUp className="h-6 w-6 text-cyan-400" />
          Live Transaktionen
          <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            <Zap className="h-3 w-3 mr-1 animate-pulse" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Zap className="h-16 w-16 mx-auto mb-6 opacity-50" />
            <p className="text-lg">Warte auf erste Lightning-Zahlung...</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {currentTransactions.map((transaction, index) => (
                <div 
                  key={`${transaction.received_at}-${startIndex + index}`}
                  className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-cyan-400 font-mono text-lg font-bold">
                      {transaction.amount.toLocaleString()} sats
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {formatRelativeTime(transaction.received_at)}
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Zurück
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    Seite {currentPage + 1} von {totalPages}
                  </span>
                </div>
                
                <Button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white disabled:opacity-30"
                >
                  Weiter
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
