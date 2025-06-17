
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Copy, QrCode, CheckCircle } from 'lucide-react';

const PaymentModal = () => {
  const [copied, setCopied] = useState(false);
  const lnurl = "LNURL1DP68GURN8GHJ7MRWVFHHGTNYV5HKCMN4WFK8QT65F4ZHX7R8QHRT9U";
  const lightningUrl = `lightning:${lnurl}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openLightningWallet = () => {
    window.location.href = lightningUrl;
  };

  return (
    <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 backdrop-blur-sm w-full max-w-4xl hover:border-amber-400/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-white text-xl font-bold">
          <Zap className="h-6 w-6 text-amber-400 animate-pulse" />
          Lightning Payment
          <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <QrCode className="h-3 w-3 mr-1" />
            LNURL
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Zahle was du willst
          </h3>
          <p className="text-gray-300 text-lg">
            Nutze diese LNURL für Lightning-Zahlungen
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">LNURL:</span>
            <Button
              onClick={() => copyToClipboard(lnurl)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="bg-slate-900/50 rounded p-3 mb-4">
            <code className="text-amber-400 font-mono text-sm break-all">
              {lnurl}
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={openLightningWallet}
              className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-amber-500/20 hover:border-amber-400/40"
            >
              <Zap className="h-5 w-5 mr-2 animate-pulse" />
              In Wallet öffnen
            </Button>
            
            <Button
              onClick={() => copyToClipboard(lnurl)}
              variant="outline"
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400/50 font-semibold py-3 px-6 transition-all duration-300"
            >
              <Copy className="h-5 w-5 mr-2" />
              LNURL kopieren
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <Zap className="h-4 w-4 text-amber-400" />
          <span>Unterstützt alle Lightning Network Wallets</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentModal;
