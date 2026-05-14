import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Scan, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_WALLET_BALANCE } from "@/lib/mock-data";

export default function Pay() {
  const [, setLocation] = useLocation();
  const [scanning, setScanning] = useState(true);
  const [scannedData, setScannedData] = useState<{vendorId: string, amount: string} | null>(null);
  const [processing, setProcessing] = useState(false);

  // Simulate scanning a code after 2 seconds
  useEffect(() => {
    if (!scanning) return;
    
    const timer = setTimeout(() => {
      setScanning(false);
      setScannedData({
        vendorId: "Campus Coffee",
        amount: "4.50"
      });
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [scanning]);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setLocation("/success");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Make a Payment</h1>
        <p className="text-muted-foreground mt-2">Scan a CampusPay QR code.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {scanning ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative w-full aspect-square max-w-[300px] rounded-3xl overflow-hidden bg-black border border-white/10"
            >
              {/* Fake camera view */}
              <div className="absolute inset-0 bg-zinc-900/50 flex items-center justify-center">
                <Scan className="w-12 h-12 text-primary/50 animate-pulse" />
              </div>
              
              {/* Scanning laser line */}
              <motion.div 
                className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Corner markers */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
            </motion.div>
          ) : scannedData ? (
            <motion.div
              key="payment-confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full w-full"
            >
              <Card className="overflow-hidden border-primary/20 shadow-lg shadow-primary/5">
                <div className="bg-primary/10 p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <QrCode className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-primary">Paying</p>
                  <h2 className="text-2xl font-bold">{scannedData.vendorId}</h2>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="text-3xl font-bold">${scannedData.amount}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-muted-foreground">Wallet Balance</span>
                    <span className="font-medium">${MOCK_WALLET_BALANCE.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <Button 
                      className="w-full h-14 text-lg font-bold" 
                      onClick={handlePay}
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${scannedData.amount}`
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full" 
                      onClick={() => setScanning(true)}
                      disabled={processing}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
