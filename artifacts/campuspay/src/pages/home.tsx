import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, QrCode, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex-1 flex flex-col justify-center pt-24 pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur-sm"
            >
              <Zap className="mr-2 h-4 w-4 text-primary" />
              <span>The future of campus payments</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
            >
              CampusPay <br className="hidden md:inline" />
              <span className="text-muted-foreground text-3xl md:text-5xl lg:text-6xl block mt-2">Fast QR Payments for Students & Vendors</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-[42rem]"
            >
              A frictionless payment platform designed specifically for the campus ecosystem. 
              Lightning fast, razor sharp, and completely secure.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
            >
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/pay">
                  Make a Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                <Link href="/vendor">
                  Vendor Dashboard
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-t border-white/5">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Transactions settle in milliseconds. No waiting, no reloading. Just scan and go."
              },
              {
                icon: QrCode,
                title: "Frictionless UI",
                description: "A clean, dense interface built for speed. Every pixel optimized for quick interactions."
              },
              {
                icon: Shield,
                title: "Bank-grade Security",
                description: "End-to-end encryption ensures every payment is secure. Trustworthy infrastructure."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-4 p-8 rounded-2xl bg-background border border-white/5 shadow-sm"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
