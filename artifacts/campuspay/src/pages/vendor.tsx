import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ArrowRight, Plus, QrCode, RefreshCw, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ANALYTICS, MOCK_TRANSACTIONS, MOCK_WALLET_BALANCE } from "@/lib/mock-data";

export default function VendorDashboard() {
  const [amount, setAmount] = useState<string>("");
  const [qrValue, setQrValue] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    setIsGenerating(true);
    // Simulate network delay
    setTimeout(() => {
      const payload = JSON.stringify({
        vendorId: "v_123",
        amount: Number(amount).toFixed(2),
        timestamp: Date.now()
      });
      setQrValue(payload);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage payments and view analytics.</p>
          </div>
          <div className="flex items-center gap-4">
            <Card className="bg-primary/10 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary/80">Available Balance</p>
                  <p className="text-2xl font-bold text-primary">${MOCK_WALLET_BALANCE.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Action Area */}
          <Card className="md:col-span-1 flex flex-col">
            <CardHeader>
              <CardTitle>Receive Payment</CardTitle>
              <CardDescription>Generate a QR code for a specific amount.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="0.00" 
                      className="pl-8 text-lg h-12 bg-background/50" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12" disabled={!amount || isGenerating}>
                  {isGenerating ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <QrCode className="mr-2 h-4 w-4" />
                  )}
                  Generate QR Code
                </Button>
              </form>

              {qrValue && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex flex-col items-center justify-center space-y-4 p-6 border border-white/10 rounded-xl bg-white/5"
                >
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <QRCodeSVG value={qrValue} size={200} level="H" includeMargin={false} />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm text-muted-foreground">Scan to pay</p>
                    <p className="text-3xl font-bold tracking-tight">${Number(amount).toFixed(2)}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setQrValue("")}>
                    <Plus className="mr-2 h-4 w-4" /> New Request
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Analytics & Recent */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Volume</p>
                  <p className="text-3xl font-bold">${MOCK_ANALYTICS.totalVolume.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Transactions</p>
                  <p className="text-3xl font-bold">{MOCK_ANALYTICS.transactionsThisMonth}</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Avg Size</p>
                  <p className="text-3xl font-bold">${MOCK_ANALYTICS.averageTransaction.toFixed(2)}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest transactions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-primary rotate-45" />
                        </div>
                        <div>
                          <p className="font-medium">{tx.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">+${tx.amount.toFixed(2)}</p>
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-500">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
