import React from 'react';
import { IndianRupee, ShoppingBag, PackageSearch, Users, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Mon', revenue: 14200 },
  { day: 'Tue', revenue: 18500 },
  { day: 'Wed', revenue: 16800 },
  { day: 'Thu', revenue: 22400 },
  { day: 'Fri', revenue: 28900 },
  { day: 'Sat', revenue: 35600 },
  { day: 'Sun', revenue: 31200 },
];

function StatCard({ icon: Icon, iconBg, iconColor, label, value, sub, subColor }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
      {sub && <div className={`text-xs mt-1 font-medium flex items-center gap-1 ${subColor}`}>{sub}</div>}
    </div>
  );
}

export default function Dashboard({ products = [], bills = [], customers = [], onNavigate }) {
  const totalRevenue = bills.reduce((acc, b) => acc + (b.total_amount || 0), 0);
  const lowStockCount = products.filter(p => p.stock_quantity <= p.min_stock_alert).length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-blue-600">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> StoreMind AI Dashboard
          </p>
          <h2 className="text-xl font-bold text-slate-900">Welcome back! 👋</h2>
          <p className="text-sm text-slate-500 mt-0.5">Here's your store performance overview for today.</p>
        </div>
        <button
          onClick={() => onNavigate('billing')}
          className="btn-primary px-5 py-2.5 flex items-center gap-2 whitespace-nowrap"
        >
          <ShoppingBag className="w-4 h-4" />
          Open POS Counter
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={IndianRupee}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          sub={<><TrendingUp className="w-3.5 h-3.5" /> +18.4% this week</>}
          subColor="text-emerald-600"
        />
        <StatCard
          icon={ShoppingBag}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          label="Total Orders"
          value={bills.length || 142}
          sub={<><ArrowUpRight className="w-3.5 h-3.5" /> 51 orders today</>}
          subColor="text-blue-600"
        />
        <StatCard
          icon={PackageSearch}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          label="Low Stock Alerts"
          value={lowStockCount || 3}
          sub="Prophet AI recommends reorder"
          subColor="text-amber-600"
        />
        <StatCard
          icon={Users}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          label="CRM Customers"
          value={customers.length || 28}
          sub="Khata balance: ₹4,850"
          subColor="text-purple-600"
        />
      </div>

      {/* Chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-slate-900">Weekly Revenue Trend</h3>
            <p className="text-xs text-slate-400 mt-0.5">Sales activity over the last 7 days</p>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Last 7 Days</span>
        </div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
