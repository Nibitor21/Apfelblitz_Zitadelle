
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Copy, QrCode, CheckCircle, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const lnurl = "LNURL1DP68GURN8GHJ7ARFD4JKXCT5VD5X2U3WD3HXY6T5WVHXGEF0D3H82UNVWQHNVNJPDF2XYR00M2T";
  const lightningUrl = `lightning:${lnurl}`;

  useEffect(() => {
    if (isOpen) {
      // Generate QR code URL
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(lightningUrl)}&bgcolor=000000&color=00ff00`;
      setQrCodeUrl(qrUrl);
    }
  }, [isOpen, lightningUrl]);

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md"
        >
          <Card className="bg-gradient-to-br from-green-900/20 to-black border-2 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="pb-4 relative">
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-green-400 hover:text-green-300 hover:bg-green-900/20"
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="flex items-center gap-3 text-green-400 text-xl font-bold font-mono">
                <Zap className="h-6 w-6 animate-pulse" />
                LIGHTNING PAYMENT
                <Badge variant="secondary" className="bg-green-900/30 text-green-400 border-green-500/30">
                  <QrCode className="h-3 w-3 mr-1" />
                  LNURL
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* QR Code Section */}
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg mx-auto w-fit mb-4">
                  <img 
                    src={qrCodeUrl} 
                    alt="Lightning Payment QR Code" 
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-green-400 font-mono mb-2">
                  SCAN TO PAY
                </h3>
                <p className="text-green-300/80 text-sm">
                  Pay what you feel • Value for Value
                </p>
              </div>

              {/* LNURL Display */}
              <div className="bg-slate-900/50 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-mono text-xs">LNURL:</span>
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
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">COPIED</span>
                      </motion.div>
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <code className="text-green-400 font-mono text-xs break-all leading-relaxed block bg-black/30 p-2 rounded">
                  {lnurl}
                </code>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={openLightningWallet}
                  className="bg-green-600 hover:bg-green-500 text-black font-mono font-bold py-3"
                >
                  <Zap className="h-5 w-5 mr-2 animate-pulse" />
                  OPEN WALLET
                </Button>
                
                <Button
                  onClick={() => copyToClipboard(lnurl)}
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-900/20 font-mono font-bold py-3"
                >
                  <Copy className="h-5 w-5 mr-2" />
                  COPY LNURL
                </Button>
              </div>

              {/* Developer Attribution */}
              <div className="bg-green-900/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-400/80 text-xs font-mono">
                  <Info className="h-3 w-3" />
                  <span>20% supports DrShift.dev • Lightning & Nostr development</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-green-400/60 text-xs font-mono">
                  <Zap className="h-3 w-3" />
                  <span>Lightning Network • Instant • Global</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
