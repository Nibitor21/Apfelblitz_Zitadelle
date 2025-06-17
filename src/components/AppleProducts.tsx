
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Apple } from 'lucide-react';

const AppleProducts = () => {
  const products = [
    {
      id: 'green',
      name: 'Grüner Apfel',
      image: '/src/assets/Apfelgruen.svg',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30 hover:border-green-400',
      buttonColor: 'bg-green-600 hover:bg-green-500',
      accentColor: 'text-green-400'
    },
    {
      id: 'red',
      name: 'Roter Apfel',
      image: '/src/assets/Apfelrot.svg',
      color: 'from-red-500/20 to-rose-500/20',
      borderColor: 'border-red-500/30 hover:border-red-400',
      buttonColor: 'bg-red-600 hover:bg-red-500',
      accentColor: 'text-red-400'
    }
  ];

  const handlePurchase = (productName: string) => {
    // In a real implementation, this would trigger Lightning payment
    console.log(`Initiating Lightning payment for ${productName}`);
    // For demo purposes, we'll show an alert
    alert(`Lightning-Zahlung für ${productName} wird gestartet...\n\nDies ist eine Demo-Implementierung für das Bitcoin Zitadelle Festival!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      {products.map((product) => (
        <Card 
          key={product.id}
          className={`
            bg-gradient-to-br ${product.color} border-2 ${product.borderColor}
            transition-all duration-300 hover:scale-105 cursor-pointer
            backdrop-blur-sm
          `}
        >
          <CardContent className="p-8 text-center">
            <div className="mb-6 relative">
              <div className="h-32 w-32 mx-auto mb-4 relative">
                <Apple className={`h-full w-full ${product.accentColor} drop-shadow-lg`} />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {product.name}
              </h3>
              <p className="text-gray-300 text-sm">
                Frisch vom Apfelbaum • Bio-Qualität
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">
                  Zahle was du willst
                </p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 ${product.accentColor}`}>
                  <Zap className="h-4 w-4 animate-pulse" />
                  <span className="text-sm font-mono">Lightning Network</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handlePurchase(product.name)}
                className={`
                  w-full ${product.buttonColor} text-white font-semibold py-3 px-6
                  shadow-lg transition-all duration-300 hover:shadow-xl
                  border border-white/20 hover:border-white/40
                `}
              >
                <Zap className="h-5 w-5 mr-2 animate-pulse" />
                Jetzt per Lightning kaufen
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AppleProducts;
