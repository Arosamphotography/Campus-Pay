import { useState } from "react";
import { Search, ArrowDownUp, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_TRANSACTIONS } from "@/lib/mock-data";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = MOCK_TRANSACTIONS.filter(tx => 
    tx.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground mt-1">Review your payment history.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vendor or ID..."
              className="pl-9 bg-card border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 border-white/10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-background/50">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-[120px]">Transaction ID</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                  Date <ArrowDownUp className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-foreground">
                  Amount <ArrowDownUp className="h-3 w-3" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No transactions found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((tx) => (
                <TableRow key={tx.id} className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">{tx.id}</TableCell>
                  <TableCell className="font-medium">{tx.vendorName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                      ${tx.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 
                        tx.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                        'bg-red-500/10 text-red-500'}`}
                    >
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ${tx.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
