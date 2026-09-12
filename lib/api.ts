import {
  stats,
  getRevenueData,
  categoryData,
  transactions,
  customers,
  products,
  notifications,
  customerGrowthData,
  productPerformanceData,
} from './mock-data';
import type { DateRange, TransactionStatus } from './types';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const api = {
  async getStats() {
    await delay(300);
    return stats;
  },

  async getRevenueData(range: DateRange) {
    await delay(300);
    return getRevenueData(range);
  },

  async getCategoryData() {
    await delay(200);
    return categoryData;
  },

  async getTransactions() {
    await delay(400);
    return transactions;
  },

  async getCustomers() {
    await delay(400);
    return customers;
  },

  async getProducts() {
    await delay(400);
    return products;
  },

  async getNotifications() {
    await delay(200);
    return notifications;
  },

  async getCustomerGrowth() {
    await delay(300);
    return customerGrowthData;
  },

  async getProductPerformance() {
    await delay(300);
    return productPerformanceData;
  },
};

export type Api = typeof api;
