export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type CustomerStatus = 'active' | 'inactive' | 'churned';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Stat {
  label: string;
  value: number;
  previousValue: number;
  changePercent: number;
  format: 'currency' | 'number' | 'percent';
  icon: 'revenue' | 'sales' | 'customers' | 'conversion';
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  sales: number;
}

export interface CategoryPoint {
  category: string;
  sales: number;
  color: string;
}

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  product: string;
  amount: number;
  status: TransactionStatus;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: CustomerStatus;
  totalSpending: number;
  orders: number;
  joinedDate: string;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  stockStatus: StockStatus;
  sales: number;
  image: string;
  sku: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'order' | 'system' | 'alert' | 'customer';
}

export interface CustomerGrowthPoint {
  month: string;
  newCustomers: number;
  totalCustomers: number;
}

export interface ProductPerformancePoint {
  name: string;
  sales: number;
  revenue: number;
}

export type DateRange = '7d' | '30d' | '90d' | '12m';
