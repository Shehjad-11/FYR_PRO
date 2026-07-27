import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BrainCircuit, 
  Receipt, 
  Settings 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'billing', label: 'POS Billing', icon: ShoppingCart, badge: 'Fast' },
    { id: 'inventory', label: 'Inventory Hub', icon: Package },
    { id: 'customers', label: 'Khata / CRM', icon: Users },
    { id: 'ai-insights', label: 'AI Intelligence', icon: BrainCircuit, highlight: true },
    { id: 'reports', label: 'Sales Reports', icon: Receipt },
  ];

  return (
    <aside className="w-64 border-r border-cyber-border bg-cyber-card/40 backdrop-blur-md p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Store Operations
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] uppercase font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl space-y-2">
        <div className="flex items-center space-x-2 text-indigo-300 font-semibold text-xs">
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          <span>Prophet AI Active</span>
        </div>
        <p className="text-[11px] text-slate-400">Demand forecast and voice billing ready for store transactions.</p>
      </div>
    </aside>
  );
}
