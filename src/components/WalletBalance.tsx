
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Wallet } from 'lucide-react';

interface Balance {
  balance: number;
  wallet_name: string;
}

const WalletBalance = () => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetch('https://testa.apfelblitz.de/api/balance_webhook');
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
    const interval = setInterval(fetchBalances, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {[1, 2].map((i) => (
          <Card key={i} className="bg-slate-800 border-slate-700 animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-6 bg-slate-700 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-700 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-500/30 w-full max-w-4xl">
        <CardContent className="p-6">
          <p className="text-red-400">Error loading balances: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {balances.map((balance, index) => (
        <Card 
          key={balance.wallet_name} 
          className={`
            border-2 transition-all duration-300 hover:scale-105 cursor-pointer
            ${index === 0 
              ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 hover:border-yellow-400' 
              : 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 hover:border-cyan-400'
            }
          `}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-white">
              {index === 0 ? (
                <Wallet className="h-6 w-6 text-yellow-400" />
              ) : (
                <Zap className="h-6 w-6 text-cyan-400 animate-pulse" />
              )}
              <span className="text-sm font-medium text-gray-300">
                {balance.wallet_name.replace('Apfelblitz.de_', '').replace('Apfelblitz.de', 'Main Wallet')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${
                index === 0 ? 'text-yellow-400' : 'text-cyan-400'
              }`}>
                {balance.balance.toLocaleString()}
              </span>
              <span className="text-gray-400 text-sm">sats</span>
            </div>
            <div className={`h-1 rounded-full mt-3 ${
              index === 0 ? 'bg-yellow-500/20' : 'bg-cyan-500/20'
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  index === 0 ? 'bg-yellow-400' : 'bg-cyan-400'
                }`}
                style={{ width: `${Math.min((balance.balance / 1000) * 100, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WalletBalance;
