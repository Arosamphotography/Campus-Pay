import { Link, useLocation } from "wouter";
import { QrCode, LayoutDashboard, History, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Overview", icon: Wallet },
    { href: "/vendor", label: "Vendor", icon: LayoutDashboard },
    { href: "/pay", label: "Pay", icon: QrCode },
    { href: "/transactions", label: "Transactions", icon: History },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-8 flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <QrCode className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">CampusPay</span>
        </Link>
        <div className="flex flex-1 items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80",
                location === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden md:inline-block">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
