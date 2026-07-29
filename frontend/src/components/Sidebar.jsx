import React from 'react';
import { LayoutDashboard, ShoppingCart, Package, Users, BrainCircuit, Receipt, BarChart3, ShieldCheck } from 'lucide-react';

const menuItems = [
  { id: 'dashboard',       label: 'Dashboard',       icon: LayoutDashboard },
  { id: 'billing',         label: 'POS Billing',      icon: ShoppingCart,  badge: 'Fast' },
  { id: 'inventory',       label: 'Inventory',        icon: Package },
  { id: 'customers',       label: 'Customers / CRM',  icon: Users },
  { id: 'reports',         label: 'Sales Reports',    icon: BarChart3 },
  { id: 'bill-history',    label: 'Bill History',     icon: Receipt },
  { id: 'ai-insights',     label: 'AI Insights',      icon: BrainCircuit },
  { id: 'admin-dashboard', label: 'Admin Console',    icon: ShieldCheck,   badge: 'SaaS' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-56 bg-white border-r border-slate-200 flex flex-col shrink-0">
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="px-3 pt-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Store Operations
        </p>
        {menuItems.map(({ id, label, icon: Icon, badge }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                {label}
              </div>
              {badge && (
                <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200">
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs mb-1">
            <BrainCircuit className="w-3.5 h-3.5" />
            Prophet AI Active
          </div>
          <p className="text-xs text-slate-500">Demand forecasting & voice billing ready.</p>
        </div>
      </div>
    </aside>
  );
}
