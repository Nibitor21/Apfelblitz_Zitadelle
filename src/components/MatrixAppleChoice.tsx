
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, QrCode, Copy, CheckCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MatrixAppleChoice = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedApple, setSelectedApple] = useState('');
  const [copied, setCopied] = useState(false);
  const [hoveredApple, setHoveredApple] = useState<string | null>(null);
  
  const lnurl = "LNURL1DP68GURN8GHJ7MRWVFHHGTNYV5HKCMN4WFK8QT65F4ZHX7R8QHRT9U";
  const lightningUrl = `lightning:${lnurl}`;

  const apples = [
    {
      id: 'red',
      name: 'RED_APPLE',
      description: 'PASSION_PATH',
      emoji: '🍎',
      quote: '"Sweet, crisp, and awakening - a taste of pure energy"',
      effect: 'ENHANCES_FOCUS',
      color: 'text-red-400',
      borderColor: 'border-red-500/50',
      bgGradient: 'from-red-900/30 to-black',
      glowColor: 'shadow-red-500/25'
    },
    {
      id: 'green',
      name: 'GREEN_APPLE',
      description: 'WISDOM_PATH',
      emoji: '🍏',
      quote: '"Tart, refreshing, and enlightening - nature\'s perfect balance"',
      effect: 'AMPLIFIES_CLARITY',
      color: 'text-green-400',
      borderColor: 'border-green-500/50',
      bgGradient: 'from-green-900/30 to-black',
      glowColor: 'shadow-green-500/25'
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

  const handleChoice = (apple: typeof apples[0]) => {
    setSelectedApple(apple.name);
    setShowPaymentModal(true);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setSelectedApple('');
  };

  return (
    <div className="w-full max-w-6xl">
      {/* The Choice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {apples.map((apple, index) => (
          <motion.div
            key={apple.id}
            className="group relative"
            onHoverStart={() => setHoveredApple(apple.id)}
            onHoverEnd={() => setHoveredApple(null)}
            whileHover={{ scale: 1.02, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className={`
              matrix-terminal ${apple.borderColor} ${apple.glowColor}
              bg-gradient-to-br ${apple.bgGradient} p-8 relative overflow-hidden cursor-pointer
              hover:shadow-2xl transition-all duration-500
            `}>
              {/* Matrix Code Rain Effect */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute text-xs font-mono ${apple.color}`}
                    animate={{
                      y: [0, 400],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                    }}
                  >
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10">
                {/* Apple Symbol */}
                <motion.div 
                  className="text-center mb-8"
                  animate={hoveredApple === apple.id ? { 
                    scale: [1, 1.2, 1], 
                    rotate: [0, 5, -5, 0] 
                  } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-8xl mb-4">{apple.emoji}</div>
                  <h3 className={`text-3xl font-black ${apple.color} font-mono glitch-text`}>
                    {apple.name}
                  </h3>
                  <p className={`${apple.color}/70 font-mono text-lg mt-2`}>
                    {apple.description}
                  </p>
                </motion.div>

                {/* Quote */}
                <div className="mb-8">
                  <div className={`matrix-line ${apple.borderColor}/30 p-4`}>
                    <p className={`${apple.color}/80 font-mono text-sm italic text-center leading-relaxed`}>
                      {apple.quote}
                    </p>
                  </div>
                  <div className={`text-center mt-3 ${apple.color}/60 font-mono text-xs`}>
                    EFFECT: {apple.effect}
                  </div>
                </div>

                {/* Choice Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center"
                >
                  <Button 
                    onClick={() => handleChoice(apple)}
                    className={`
                      bg-black border-2 ${apple.borderColor} ${apple.color} 
                      hover:bg-gradient-to-r hover:${apple.bgGradient}
                      font-mono font-bold px-12 py-6 text-lg
                      transition-all duration-300 relative overflow-hidden
                    `}
                    size="lg"
                  >
                    {/* Button Glitch Effect */}
                    <motion.div
                      className={`absolute inset-0 ${apple.color.replace('text-', 'bg-')}/10`}
                      animate={hoveredApple === apple.id ? {
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    
                    <Eye className="h-5 w-5 mr-3 animate-pulse relative z-10" />
                    <span className="relative z-10">CHOOSE_APPLE</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <div className="matrix-terminal border-green-500/50 w-full max-w-2xl p-8 relative overflow-hidden">
                {/* Matrix Effect Background */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px h-full bg-green-400"
                      animate={{
                        opacity: [0, 1, 0],
                        x: [0, Math.random() * 400],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-green-400 font-mono glitch-text mb-4">
                      EXCELLENT_CHOICE
                    </h2>
                    <div className="matrix-pill bg-green-900/30 border-green-400 text-green-300">
                      SELECTED: {selectedApple}
                    </div>
                    <p className="text-green-400/70 font-mono mt-4">
                      VALUE_FOR_VALUE // PAY_WHAT_YOU_FEEL
                    </p>
                  </div>

                  {/* Payment Interface */}
                  <div className="matrix-line border-green-500/30 p-6 mb-6">
                    <div className="text-center mb-6">
                      <QrCode className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
                      <h3 className="text-2xl font-bold text-green-400 font-mono mb-2">
                        SOUND_MONEY_PAYMENT
                      </h3>
                      <p className="text-green-300 font-mono">
                        LIGHTNING_NETWORK // MINIMUM_1_SAT
                      </p>
                    </div>

                    {/* LNURL Display */}
                    <div className="bg-black/50 rounded-lg p-4 mb-6 border border-green-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-400 font-mono text-sm">LNURL_CODE:</span>
                        <Button
                          onClick={() => copyToClipboard(lnurl)}
                          variant="ghost"
                          size="sm"
                          className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
                        >
                          {copied ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-xs">COPIED</span>
                            </motion.div>
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      <code className="text-green-400 font-mono text-sm break-all leading-relaxed block">
                        {lnurl}
                      </code>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        onClick={openLightningWallet}
                        className="bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50 font-mono font-bold py-4"
                      >
                        <Zap className="h-5 w-5 mr-2 animate-pulse" />
                        OPEN_WALLET
                      </Button>
                      
                      <Button
                        onClick={() => copyToClipboard(lnurl)}
                        variant="outline"
                        className="border-green-500/30 text-green-400 hover:bg-green-900/20 font-mono font-bold py-4"
                      >
                        <Copy className="h-5 w-5 mr-2" />
                        COPY_CODE
                      </Button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center">
                    <Button
                      onClick={closeModal}
                      variant="ghost"
                      className="text-green-400/70 hover:text-green-400 font-mono text-sm"
                    >
                      CLOSE_TERMINAL
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatrixAppleChoice;
