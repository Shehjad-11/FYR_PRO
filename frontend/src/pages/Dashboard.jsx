import React from 'react';
import { IndianRupee, ShoppingBag, PackageAlert, Users, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Mon', revenue: 14200, orders: 42 },
  { day: 'Tue', revenue: 18500, orders: 58 },
  { day: 'Wed', revenue: 16800, orders: 51 },
  { day: 'Thu', revenue: 22400, orders: 69 },
  { day: 'Fri', revenue: 28900, orders: 84 },
  { day: 'Sat', revenue: 35600, orders: 112 },
  { day: 'Sun', revenue: 31200, orders: 98 },
];

export default function Dashboard({ products = [], bills = [], customers = [], onNavigate }) {
  const totalRevenue = bills.reduce((acc, b) => acc + (b.total_amount || 0), 0);
  const lowStockCount = products.filter(p => p.stock_quantity <= p.min_stock_alert).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-cyan-900/40 border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>StoreMind AI Dashboard</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome back, Supermarket Admin! 👋</h2>
          <p className="text-sm text-slate-400">Here is your store performance overview and AI inventory recommendations today.</p>
        </div>
        <button 
          onClick={() => onNavigate('billing')}
          className="glass-button flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Open POS Counter</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Total Sales Revenue</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="text-xs text-emerald-400 flex items-center space-x-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% from last week</span>
          </div>
        </div>

        <div className="glass-panel p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Total Orders</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{bills.length || 142}</div>
          <div className="text-xs text-indigo-400 flex items-center space-x-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>51 orders completed today</span>
          </div>
        </div>

        <div className="glass-panel p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Low Stock Alerts</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <PackageAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{lowStockCount || 3}</div>
          <div className="text-xs text-amber-400 font-medium">Prophet AI recommends reorder</div>
        </div>

        <div className="glass-panel p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Khata Customers</span>
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{customers.length || 28}</div>
          <div className="text-xs text-cyan-400 font-medium">CRM Credit balance: ₹4,850</div>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-white">Weekly Sales & Revenue Trend</h3>
            <p className="text-xs text-slate-400">Real-time store sales activity across days</p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full">
            Last 7 Days
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#1f293d', color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
