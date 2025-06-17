
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Apple } from 'lucide-react';

const AppleProducts = () => {
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

  const handlePurchase = (productName: string) => {
    console.log(`Initiating Lightning payment for ${productName}`);
    alert(`Lightning-Zahlung für ${productName} wird gestartet...\n\nDies ist eine Demo-Implementierung für das Bitcoin Zitadelle Festival!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
      {products.map((product) => (
        <Card 
          key={product.id}
          className={`
            bg-gradient-to-br ${product.color} border-2 ${product.borderColor}
            transition-all duration-300 hover:scale-105 cursor-pointer
            backdrop-blur-sm shadow-xl hover:shadow-2xl
          `}
        >
          <CardContent className="p-8 text-center">
            <div className="mb-8 relative">
              <div className="h-40 w-40 mx-auto mb-6 relative">
                <Apple className={`h-full w-full ${product.accentColor} drop-shadow-lg`} />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-full"></div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3">
                {product.name}
              </h3>
              
              <Badge className={`${product.badgeColor} mb-4`}>
                {product.description}
              </Badge>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Frisch vom Apfelbaum • Bio-Qualität • Regional
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-400 text-lg mb-3 font-medium">
                  Zahle was du willst
                </p>
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 ${product.accentColor} border border-current/20`}>
                  <Zap className="h-5 w-5 animate-pulse" />
                  <span className="text-lg font-mono font-bold">Lightning Network</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handlePurchase(product.name)}
                className={`
                  w-full ${product.buttonColor} text-white font-bold py-4 px-8 text-lg
                  shadow-lg transition-all duration-300 hover:shadow-xl
                  border border-white/20 hover:border-white/40
                `}
              >
                <Zap className="h-6 w-6 mr-3 animate-pulse" />
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
