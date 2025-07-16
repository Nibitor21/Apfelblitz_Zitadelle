
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Copy, QrCode, CheckCircle, X, Info, ExternalLink, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const lnurl = "LNURL1DP68GURN8GHJ7ARFD4JKXCT5VD5X2U3WD3HXY6T5WVHXGEF0D3H82UNVWQHNVNJPDF2XYR00M2T";
  const lightningUrl = `lightning:${lnurl}`;

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Generate QR code URL with better styling
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(lightningUrl)}&bgcolor=000000&color=00ff00&margin=20&ecc=M`;
      setQrCodeUrl(qrUrl);
      
      // Simulate loading for smooth UX
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [isOpen, lightningUrl]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openLightningWallet = () => {
    window.location.href = lightningUrl;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotateX: -90 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.3, opacity: 0, rotateX: 90 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            duration: 0.6
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg"
        >
          {/* Matrix-style border animation */}
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 rounded-2xl border-2 border-green-500/30 animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 blur-xl"></div>
          </div>

          <Card className="relative bg-gradient-to-br from-black via-green-950/20 to-black border-2 border-green-500/40 backdrop-blur-xl overflow-hidden">
            {/* Animated scanlines */}
            <div className="absolute inset-0 opacity-10">
              <div className="scanlines"></div>
            </div>

            <CardHeader className="text-center pb-6 relative">
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="absolute right-4 top-4 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded-full h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="flex items-center justify-center gap-3 text-green-400 text-2xl font-bold font-mono">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </motion.div>
                  LIGHTNING_PAYMENT
                </CardTitle>
                
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Badge className="bg-green-900/40 text-green-400 border-green-500/40 font-mono">
                    <QrCode className="h-3 w-3 mr-1" />
                    LNURL-PAY
                  </Badge>
                  <Badge className="bg-blue-900/40 text-blue-400 border-blue-500/40 font-mono">
                    VALUE_4_VALUE
                  </Badge>
                </div>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-8 px-8 pb-8">
              {/* QR Code Section */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative mx-auto w-fit">
                  {isLoading ? (
                    <div className="w-64 h-64 bg-green-900/20 border-2 border-green-500/30 rounded-xl flex items-center justify-center">
                      <div className="matrix-loader"></div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="bg-white p-4 rounded-2xl shadow-2xl">
                        <img 
                          src={qrCodeUrl} 
                          alt="Lightning Payment QR Code" 
                          className="w-56 h-56 mx-auto rounded-lg"
                        />
                      </div>
                      {/* Animated corners */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-green-400 rounded-tl-lg"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-green-400 rounded-tr-lg"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-green-400 rounded-bl-lg"></div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-green-400 rounded-br-lg"></div>
                    </motion.div>
                  )}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <h3 className="text-2xl font-bold text-green-400 font-mono mb-2">
                    SCAN_TO_PAY
                  </h3>
                  <p className="text-green-300/80 text-lg font-mono">
                    Pay what you feel • Value for Value
                  </p>
                </motion.div>
              </motion.div>

              {/* LNURL Display */}
              <motion.div 
                className="matrix-terminal p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-400 font-mono font-bold text-sm">LNURL_ADDRESS:</span>
                  <Button
                    onClick={() => copyToClipboard(lnurl)}
                    variant="ghost"
                    size="sm"
                    className="text-green-400 hover:text-green-300 hover:bg-green-900/30 font-mono"
                  >
                    {copied ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">COPIED!</span>
                      </motion.div>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        COPY
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-black/60 rounded-lg p-4 border border-green-500/30">
                  <code className="text-green-400 font-mono text-xs break-all leading-relaxed block">
                    {lnurl}
                  </code>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="grid grid-cols-1 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={openLightningWallet}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-mono font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  <Wallet className="h-5 w-5 mr-3" />
                  OPEN_LIGHTNING_WALLET
                  <ExternalLink className="h-4 w-4 ml-3" />
                </Button>
                
                <Button
                  onClick={() => copyToClipboard(lnurl)}
                  variant="outline"
                  className="border-2 border-green-500/50 text-green-400 hover:bg-green-900/30 hover:border-green-400 font-mono font-bold py-4 text-lg rounded-xl transition-all duration-300"
                >
                  <Copy className="h-5 w-5 mr-3" />
                  COPY_LNURL_ADDRESS
                </Button>
              </motion.div>

              {/* Developer Attribution */}
              <motion.div 
                className="matrix-terminal p-4 border-blue-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-3 text-blue-400/90 text-sm font-mono">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-bold">20% supports DrShift.dev</p>
                    <p className="text-blue-400/70">Lightning & Nostr development</p>
                  </div>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div 
                className="text-center border-t border-green-900/30 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex items-center justify-center gap-3 text-green-400/70 text-sm font-mono">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="h-4 w-4" />
                  </motion.div>
                  <span>Lightning Network • Instant • Global • Sound Money</span>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Zap className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
