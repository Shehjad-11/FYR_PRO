import React from 'react';
import { ShoppingCart, Package, Users, BarChart3, BrainCircuit, ArrowRight } from 'lucide-react';

export default function LandingSolutions({ onOpenLogin }) {
  const modules = [
    {
      title: 'POS High-Speed Billing Counter',
      icon: ShoppingCart,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Process checkout receipts in seconds with barcode scanning, custom discounts, GST auto-calculation, and multi-payment mode support (Cash, UPI, Card, Udhar).',
      points: ['Barcode scanner input', 'Whisper voice item addition', 'Instant GST receipt generation', 'Split & Udhar payments']
    },
    {
      title: 'Smart Inventory & Low-Stock Alerts',
      icon: Package,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description: 'Track stock quantities across all item SKUs in real time. Get instant banner alerts when items fall below minimum thresholds.',
      points: ['Real-time stock deduction', 'Min-stock threshold notifications', 'Barcode & SKU management', 'Product cost & profit tracking']
    },
    {
      title: 'Udhar Khata & Customer CRM',
      icon: Users,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description: 'Digitize customer credit accounts. Track total lifetime spent, pending Udhar balances, and loyalty reward points per customer.',
      points: ['Udhar credit account balance tracking', 'Repayment recording form', 'Automated loyalty points calculation', 'Customer purchase history']
    },
    {
      title: 'Sales & Analytics Reporting',
      icon: BarChart3,
      color: 'text-violet-600 bg-violet-50 border-violet-200',
      description: 'Gain complete transparency into daily, weekly, and monthly store revenue performance with visual charts and one-click CSV export.',
      points: ['Revenue & order trajectory', 'Payment mode distribution pie charts', 'Top-grossing products ranking', 'CSV export for accounting']
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white pt-12 pb-8 text-center space-y-3">
        <div className="max-w-3xl mx-auto px-4">
          <span className="badge-blue text-xs font-bold uppercase">Complete Retail Suite</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">Modular Solutions for Every Retail Need</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Everything your supermarket or Kirana store needs to run fast, remain profitable, and eliminate stock losses.
          </p>
        </div>
      </section>

      {/* Solutions Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${mod.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{mod.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{mod.description}</p>
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {mod.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
