# PulseBoard — SaaS Analytics Dashboard

A production-quality SaaS analytics dashboard built with Next.js, TypeScript, and Tailwind CSS. PulseBoard provides a polished, professional interface for tracking revenue, sales, customers, and product performance — designed to look and feel like a real commercial product.

## Project Overview

PulseBoard is a frontend portfolio project demonstrating strong professional frontend development skills. It features a complete dashboard experience with responsive design, realistic business data, interactive charts, and a clean, accessible UI. The application is built entirely with mock data, with the architecture designed so a REST API can easily replace the mock layer.

## Features

- **Dashboard Overview** — Key stat cards (revenue, sales, customers, conversion rate) with trend indicators, interactive revenue analytics chart with date range selection, sales-by-category bar chart, and recent transactions table
- **Analytics Page** — Revenue trend, sales volume, customer growth, and product performance charts with date filtering and summary statistics
- **Transactions Page** — Full transaction table with search, status filter, pagination, and detail modal
- **Customers Page** — Customer table with avatars, search, status filter, and detail modal showing spending, orders, location, and join date
- **Products Page** — Product card grid with search, category and stock filters, low-stock and out-of-stock indicators
- **Settings Page** — Tabbed settings for Profile, Notifications, Security, and Appearance with working theme switching (light/dark/system)
- **Responsive Design** — Sidebar collapses to mobile navigation, tables scroll horizontally, charts resize, no horizontal overflow
- **Loading & Empty States** — Skeleton loaders on every data-driven view, empty states with helpful messaging
- **Dark Mode** — Full dark theme support via `next-themes`
- **Notifications** — Notification popover with unread badges and typed icons
- **User Menu** — Profile dropdown with avatar

## Tech Stack

- **Next.js** (App Router) — React framework with file-based routing
- **TypeScript** — Strong typing throughout
- **Tailwind CSS** — Utility-first styling with a custom design system
- **Recharts** — Composable charting library for line, area, and bar charts
- **shadcn/ui** — Accessible, customizable component primitives (Radix UI + Tailwind)
- **Lucide React** — Icon library
- **next-themes** — Theme switching (light/dark/system)

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider, AppShell, Toaster
│   ├── page.tsx                # Dashboard overview page
│   ├── analytics/page.tsx     # Analytics page
│   ├── transactions/page.tsx  # Transactions page
│   ├── customers/page.tsx     # Customers page
│   ├── products/page.tsx      # Products page
│   └── settings/page.tsx      # Settings page
├── components/
│   ├── layout/                # AppShell, Sidebar, Header, MobileNav, UserMenu, NotificationButton
│   ├── shared/                # StatCard, ChartCard, StatusBadge, EmptyState, LoadingState, PageHeader, DataTable, DateRangeSelector
│   ├── charts/                # RevenueChart, SalesByCategoryChart, RevenueAreaChart, SalesChart, CustomerGrowthChart, ProductPerformanceChart
│   ├── theme-provider.tsx     # next-themes wrapper
│   └── ui/                    # shadcn/ui primitives
├── lib/
│   ├── types.ts               # TypeScript type definitions
│   ├── format.ts              # Currency, number, date formatting utilities
│   ├── mock-data.ts           # Realistic mock business data
│   ├── api.ts                 # API layer (mock — swappable for REST)
│   └── nav.ts                 # Navigation configuration
└── tailwind.config.ts         # Custom design system (colors, animations)
```

## How to Run Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm start

# Run type checking
npm run typecheck
```

The app will be available at `http://localhost:3000`.

## Future API Integration

The mock data layer in `lib/api.ts` is designed as a simple async interface that mirrors a REST API. To connect a real backend:

1. **Replace `lib/api.ts`** — Each method (`getStats`, `getRevenueData`, `getTransactions`, etc.) currently returns mock data with a simulated delay. Replace these with `fetch` calls to your API endpoints while maintaining the same return types from `lib/types.ts`.

2. **Add data fetching** — The pages already use `useEffect` + `useState` for data loading. Swap `api.getTransactions()` with `fetch('/api/transactions')` — no component changes needed.

3. **Supabase integration** — For a full-stack version, Supabase is already configured. Create tables matching the types in `lib/types.ts`, enable RLS policies, and replace the mock API methods with Supabase client queries.

4. **Authentication** — Add Supabase Auth to protect the dashboard, with email/password sign-in. The user menu already has sign-out infrastructure.

## Design Decisions

- **Color system** — Custom HSL-based design tokens with 6 color ramps (primary, success, warning, destructive, plus chart colors) for both light and dark themes
- **Spacing** — Consistent 8px spacing system via Tailwind
- **Typography** — Inter font family with 3 weights max, 150% line height for body text
- **Accessibility** — Semantic HTML, ARIA labels on icon buttons, keyboard-navigable components, sufficient color contrast
- **No external UI libraries** — Only shadcn/ui primitives and Lucide icons, per project constraints
