"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Copy, QrCode, CheckCircle, X, Info, ExternalLink, Wallet } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const lnurl = "LNURL1DP68GURN8GHJ7ARFD4JKXCT5VD5X2U3WD3HXY6T5WVHXGEF0D3H82UNVWQHNVNJPDF2XYR00M2T"
  const lightningUrl = `lightning:${lnurl}`

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(lightningUrl)}&bgcolor=000000&color=00ff00&margin=20&ecc=M`
      setQrCodeUrl(qrUrl)

      setTimeout(() => setIsLoading(false), 800)
    }
  }, [isOpen, lightningUrl])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const openLightningWallet = () => {
    window.location.href = lightningUrl
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/98 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Matrix Rain Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="matrix-rain-bg"></div>
        </div>

        {/* Glitch Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-overlay"></div>
        </div>

        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotateX: -90 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.3, opacity: 0, rotateX: 90 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.6,
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg z-10"
        >
          {/* Holographic Border Effect */}
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 rounded-2xl border-2 border-green-400/40 shadow-[0_0_30px_rgba(34,197,94,0.3)]"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/10 via-cyan-400/5 to-green-400/10 blur-xl animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-pulse delay-75"></div>
          </div>

          <Card className="relative bg-gradient-to-br from-black via-green-950/30 to-black border-2 border-green-400/50 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.2)]">
            {/* Animated Scanlines */}
            <div className="absolute inset-0 opacity-20">
              <div className="scanlines-enhanced"></div>
            </div>

            {/* Matrix Code Stream */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-green-400/30 to-transparent">
              <div className="matrix-stream"></div>
            </div>

            <CardHeader className="text-center pb-6 relative">
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="absolute right-4 top-4 text-green-400 hover:text-red-400 hover:bg-red-900/20 rounded-full h-8 w-8 p-0 transition-all duration-300 border border-green-400/30 hover:border-red-400/50"
              >
                <X className="h-4 w-4" />
              </Button>

              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <CardTitle className="flex items-center justify-center gap-3 text-green-400 text-2xl font-bold font-mono tracking-wider">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    }}
                    className="relative"
                  >
                    <Zap className="h-8 w-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                    <div className="absolute inset-0 animate-ping">
                      <Zap className="h-8 w-8 text-yellow-400/30" />
                    </div>
                  </motion.div>
                  <span className="glitch-text" data-text="LIGHTNING_PAYMENT">
                    LIGHTNING_PAYMENT
                  </span>
                </CardTitle>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <Badge className="bg-green-900/60 text-green-300 border-green-400/60 font-mono shadow-[0_0_10px_rgba(34,197,94,0.3)] hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300">
                    <QrCode className="h-3 w-3 mr-1" />
                    LNURL-PAY
                  </Badge>
                  <Badge className="bg-cyan-900/60 text-cyan-300 border-cyan-400/60 font-mono shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300">
                    VALUE_4_VALUE
                  </Badge>
                </div>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-8 px-8 pb-8">
              {/* Enhanced QR Code Section */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative mx-auto w-fit">
                  {isLoading ? (
                    <div className="w-64 h-64 bg-gradient-to-br from-green-900/30 to-cyan-900/20 border-2 border-green-400/40 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <div className="matrix-loader-enhanced"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-pulse"></div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] border-2 border-green-400/20">
                        <img
                          src={qrCodeUrl || "/placeholder.svg"}
                          alt="Lightning Payment QR Code"
                          className="w-56 h-56 mx-auto rounded-lg"
                        />
                      </div>

                      {/* Enhanced Animated Corners */}
                      <motion.div
                        className="absolute -top-3 -left-3 w-8 h-8 border-l-4 border-t-4 border-green-400 rounded-tl-lg"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      ></motion.div>
                      <motion.div
                        className="absolute -top-3 -right-3 w-8 h-8 border-r-4 border-t-4 border-green-400 rounded-tr-lg"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                      ></motion.div>
                      <motion.div
                        className="absolute -bottom-3 -left-3 w-8 h-8 border-l-4 border-b-4 border-green-400 rounded-bl-lg"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                      ></motion.div>
                      <motion.div
                        className="absolute -bottom-3 -right-3 w-8 h-8 border-r-4 border-b-4 border-green-400 rounded-br-lg"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                      ></motion.div>

                      {/* Scanning Line Effect */}
                      <motion.div
                        className="absolute inset-0 border-2 border-transparent"
                        animate={{
                          background: [
                            "linear-gradient(0deg, transparent 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
                            "linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
                            "linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
                            "linear-gradient(270deg, transparent 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
                          ],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <h3 className="text-2xl font-bold text-green-400 font-mono mb-2 tracking-wider">
                    <span className="glitch-text-small" data-text="SCAN_TO_PAY">
                      SCAN_TO_PAY
                    </span>
                  </h3>
                  <p className="text-green-300/80 text-lg font-mono">Pay what you feel • Value for Value</p>
                </motion.div>
              </motion.div>

              {/* Enhanced LNURL Display */}
              <motion.div
                className="matrix-terminal-enhanced p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-400 font-mono font-bold text-sm tracking-wider">LNURL_ADDRESS:</span>
                  <Button
                    onClick={() => copyToClipboard(lnurl)}
                    variant="ghost"
                    size="sm"
                    className="text-green-400 hover:text-green-300 hover:bg-green-900/40 font-mono border border-green-400/30 hover:border-green-300/50 transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                  >
                    {copied ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
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

                <div className="bg-black/80 rounded-lg p-4 border-2 border-green-400/40 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-transparent to-green-400/5 animate-pulse"></div>
                  <code className="text-green-400 font-mono text-xs break-all leading-relaxed block relative z-10">
                    {lnurl}
                  </code>
                </div>
              </motion.div>

              {/* Enhanced Action Buttons */}
              <motion.div
                className="grid grid-cols-1 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={openLightningWallet}
                  className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:via-green-400 hover:to-green-500 text-black font-mono font-bold py-4 text-lg rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 border-2 border-green-400/20 hover:border-green-300/40 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Wallet className="h-5 w-5 mr-3" />
                  OPEN_LIGHTNING_WALLET
                  <ExternalLink className="h-4 w-4 ml-3" />
                </Button>

                <Button
                  onClick={() => copyToClipboard(lnurl)}
                  variant="outline"
                  className="border-2 border-green-400/60 text-green-400 hover:bg-green-900/40 hover:border-green-300/80 font-mono font-bold py-4 text-lg rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Copy className="h-5 w-5 mr-3" />
                  COPY_LNURL_ADDRESS
                </Button>
              </motion.div>

              {/* Enhanced Developer Attribution */}
              <motion.div
                className="matrix-terminal-enhanced p-4 border-cyan-400/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-3 text-cyan-400/90 text-sm font-mono">
                  <Info className="h-4 w-4 flex-shrink-0 animate-pulse" />
                  <div>
                    <p className="font-bold">20% supports DrShift.dev</p>
                    <p className="text-cyan-400/70">Lightning & Nostr development</p>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Footer */}
              <motion.div
                className="text-center border-t border-green-900/40 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex items-center justify-center gap-3 text-green-400/70 text-sm font-mono">
                  <motion.div
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Zap className="h-4 w-4" />
                  </motion.div>
                  <span className="tracking-wider">Lightning Network • Instant • Global • Sound Money</span>
                  <motion.div
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
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
  )
}

export default PaymentModal
