
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Apple, Copy, CheckCircle, QrCode } from 'lucide-react';

const AppleProducts = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedApple, setSelectedApple] = useState('');
  const [copied, setCopied] = useState(false);
  
  const lnurl = "LNURL1DP68GURN8GHJ7MRWVFHHGTNYV5HKCMN4WFK8QT65F4ZHX7R8QHRT9U";
  const lightningUrl = `lightning:${lnurl}`;

  const products = [
    {
      id: 'green',
      name: 'Grüner Apfel',
      description: 'Frisch & Knackig',
      image: '/src/assets/Apfelgruen.svg',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30 hover:border-green-400/50',
      buttonColor: 'bg-green-600 hover:bg-green-500',
      accentColor: 'text-green-400',
      badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    {
      id: 'red',
      name: 'Roter Apfel',
      description: 'Süß & Saftig',
      image: '/src/assets/Apfelrot.svg',
      color: 'from-red-500/20 to-rose-500/20',
      borderColor: 'border-red-500/30 hover:border-red-400/50',
      buttonColor: 'bg-red-600 hover:bg-red-500',
      accentColor: 'text-red-400',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
  ];

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

  const handlePurchase = (productName: string) => {
    setSelectedApple(productName);
    setShowPaymentModal(true);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setSelectedApple('');
  };

  return (
    <div className="w-full max-w-6xl">
      {/* Apple Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {products.map((product) => (
          <Card 
            key={product.id}
            className={`
              bg-gradient-to-br ${product.color} border-2 ${product.borderColor}
              transition-all duration-300 hover:scale-[1.02] cursor-pointer
              backdrop-blur-sm shadow-lg hover:shadow-xl
            `}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Apple Icon */}
                <div className="flex-shrink-0">
                  <Apple className={`h-16 w-16 ${product.accentColor} drop-shadow-lg`} />
                </div>
                
                {/* Product Info */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  
                  <Badge className={`${product.badgeColor} mb-3`}>
                    {product.description}
                  </Badge>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    Bio-Qualität • Regional • Frisch
                  </p>
                  
                  <div className="text-center mb-4">
                    <p className="text-gray-400 text-sm mb-2">
                      Zahle was du willst
                    </p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 ${product.accentColor} border border-current/20`}>
                      <Zap className="h-4 w-4 animate-pulse" />
                      <span className="text-sm font-mono font-bold">Lightning</span>
                    </div>
                  </div>
                </div>
                
                {/* Lightning Button */}
                <div className="flex-shrink-0">
                  <Button 
                    onClick={() => handlePurchase(product.name)}
                    className={`
                      ${product.buttonColor} text-white font-bold p-4 rounded-full
                      shadow-lg transition-all duration-300 hover:shadow-xl
                      border border-white/20 hover:border-white/40
                    `}
                    size="icon"
                  >
                    <Zap className="h-6 w-6 animate-pulse" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 backdrop-blur-sm w-full max-w-2xl hover:border-amber-400/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-amber-400 animate-pulse" />
                  <h2 className="text-2xl font-bold text-white">Lightning Payment</h2>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    <QrCode className="h-3 w-3 mr-1" />
                    LNURL
                  </Badge>
                </div>
                <Button
                  onClick={closeModal}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedApple}
                </h3>
                <p className="text-gray-300">
                  Zahle was du willst • Lightning Network
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 mb-6">
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
        </div>
      )}
    </div>
  );
};

export default AppleProducts;
