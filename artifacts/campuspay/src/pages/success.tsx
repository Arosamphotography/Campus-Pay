import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Success() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Card className="overflow-hidden border-primary/20 shadow-xl shadow-primary/10">
            <div className="bg-primary/10 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative z-10"
              >
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
                </div>
              </motion.div>
              
              {/* Confetti ripples */}
              <motion.div 
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute w-24 h-24 rounded-full border-2 border-primary"
              />
            </div>
            
            <CardContent className="p-8 text-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
                <p className="text-muted-foreground">Your transaction has been securely processed.</p>
              </div>

              <div className="bg-black/20 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-bold">$4.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recipient</span>
                  <span className="font-medium">Campus Coffee</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ref</span>
                  <span className="font-mono text-xs text-muted-foreground">TX-{Math.floor(Math.random() * 10000)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button asChild className="w-full h-12">
                  <Link href="/">
                    Return Home
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/transactions">
                    View Receipt
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
