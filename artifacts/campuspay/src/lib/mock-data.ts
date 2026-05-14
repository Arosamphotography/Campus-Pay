export type TransactionStatus = 'paid' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  vendorName: string;
  amount: number;
  status: TransactionStatus;
  timestamp: string;
}

export const MOCK_WALLET_BALANCE = 1247.50;

export const MOCK_ANALYTICS = {
  totalVolume: 8340,
  transactionsThisMonth: 142,
  averageTransaction: 58.73
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1008",
    vendorName: "Campus Coffee",
    amount: 4.50,
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: "tx-1007",
    vendorName: "The Quad Eats",
    amount: 14.25,
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: "tx-1006",
    vendorName: "Campus Bookstore",
    amount: 45.00,
    status: "pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "tx-1005",
    vendorName: "Laundry Room B",
    amount: 2.50,
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "tx-1004",
    vendorName: "Vending Machine #4",
    amount: 1.75,
    status: "failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
  {
    id: "tx-1003",
    vendorName: "Student Union Grill",
    amount: 12.00,
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
  },
  {
    id: "tx-1002",
    vendorName: "Library Print Shop",
    amount: 3.50,
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 5 days ago
  },
  {
    id: "tx-1001",
    vendorName: "Campus Coffee",
    amount: 5.25,
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(), // 6 days ago
  }
];
