
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Apple, Copy, CheckCircle, QrCode, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AppleProducts = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedApple, setSelectedApple] = useState('');
  const [copied, setCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const lnurl = "LNURL1DP68GURN8GHJ7MRWVFHHGTNYV5HKCMN4WFK8QT65F4ZHX7R8QHRT9U";
  const lightningUrl = `lightning:${lnurl}`;

  const products = [
    {
      id: 'green',
      name: 'Golden Delicious',
      description: 'Fresh & Crunchy',
      emoji: '🍏',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      shadowColor: 'shadow-emerald-500/25',
      borderGlow: 'group-hover:shadow-emerald-400/40',
      accentColor: 'text-emerald-400',
      buttonGradient: 'from-emerald-500 to-green-600',
      particles: 'bg-emerald-400/30'
    },
    {
      id: 'red',
      name: 'Gala Royal',
      description: 'Sweet & Juicy',
      emoji: '🍎',
      gradient: 'from-rose-400 via-red-500 to-pink-600',
      shadowColor: 'shadow-rose-500/25',
      borderGlow: 'group-hover:shadow-rose-400/40',
      accentColor: 'text-rose-400',
      buttonGradient: 'from-rose-500 to-red-600',
      particles: 'bg-rose-400/30'
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="group"
            onHoverStart={() => setHoveredCard(product.id)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className={`
              relative overflow-hidden bg-gradient-to-br ${product.gradient}
              border-0 ${product.shadowColor} shadow-xl ${product.borderGlow}
              transition-all duration-500 cursor-pointer backdrop-blur-sm
            `}>
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 ${product.particles} rounded-full opacity-60`}
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  {/* Apple Emoji with Animation */}
                  <motion.div 
                    className="text-6xl"
                    animate={hoveredCard === product.id ? { 
                      scale: [1, 1.2, 1], 
                      rotate: [0, 10, -10, 0] 
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {product.emoji}
                  </motion.div>
                  
                  {/* Quality Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Badge className="bg-black/20 text-white border-white/30 backdrop-blur-sm">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Premium
                    </Badge>
                  </motion.div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    {product.name}
                  </h3>
                  <p className="text-white/90 text-lg font-medium">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Sparkles className="h-4 w-4 text-white/80" />
                    <span className="text-white/80 text-sm">Bio-Qualität • Regional</span>
                    <Sparkles className="h-4 w-4 text-white/80" />
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Pay What You Want</p>
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-300 animate-pulse" />
                      <span className="text-xl font-bold text-white">Lightning Fast</span>
                    </div>
                  </div>
                </div>

                {/* Lightning Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center"
                >
                  <Button 
                    onClick={() => handlePurchase(product.name)}
                    className={`
                      bg-gradient-to-r ${product.buttonGradient} hover:from-yellow-400 hover:to-orange-500
                      text-white font-bold px-8 py-4 rounded-2xl shadow-lg
                      transition-all duration-300 border border-white/20
                      hover:shadow-xl hover:shadow-yellow-500/25
                      relative overflow-hidden group/btn
                    `}
                    size="lg"
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500"></div>
                    
                    <Zap className="h-5 w-5 mr-2 animate-pulse relative z-10" />
                    <span className="relative z-10">Buy Now</span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/30 backdrop-blur-xl w-full max-w-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                      animate={{
                        x: [0, Math.random() * 400],
                        y: [0, Math.random() * 300],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <motion.div 
                      className="flex items-center gap-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="relative">
                        <Zap className="h-8 w-8 text-cyan-400 animate-pulse" />
                        <motion.div
                          className="absolute inset-0 bg-cyan-400/20 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-1">Lightning Payment</h2>
                        <p className="text-cyan-400 font-medium">{selectedApple}</p>
                      </div>
                    </motion.div>
                    
                    <Button
                      onClick={closeModal}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full h-10 w-10"
                    >
                      ✕
                    </Button>
                  </div>

                  {/* Payment Info */}
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm">
                      <QrCode className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">
                        Pay What You Want
                      </h3>
                      <p className="text-gray-300">
                        Use any Lightning Network wallet to complete your purchase
                      </p>
                    </div>
                  </motion.div>

                  {/* LNURL Section */}
                  <motion.div 
                    className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8 backdrop-blur-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm font-medium">LNURL:</span>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                          <QrCode className="h-3 w-3 mr-1" />
                          Lightning Invoice
                        </Badge>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(lnurl)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                      >
                        {copied ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1"
                          >
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-green-400 text-xs">Copied!</span>
                          </motion.div>
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-xl p-4 mb-6 border border-slate-600/30">
                      <code className="text-cyan-400 font-mono text-sm break-all leading-relaxed">
                        {lnurl}
                      </code>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={openLightningWallet}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/25 border border-cyan-500/20"
                        >
                          <Zap className="h-5 w-5 mr-2 animate-pulse" />
                          Open in Wallet
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => copyToClipboard(lnurl)}
                          variant="outline"
                          className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50 font-semibold py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm"
                        >
                          <Copy className="h-5 w-5 mr-2" />
                          Copy LNURL
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Footer */}
                  <motion.div 
                    className="flex items-center justify-center gap-3 text-gray-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Zap className="h-4 w-4 text-cyan-400 animate-pulse" />
                    <span>Secure Lightning Network Payment</span>
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppleProducts;
