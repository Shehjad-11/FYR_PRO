import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Receipt, 
  CreditCard, 
  Users, 
  Download, 
  Calendar,
  DollarSign,
  Package,
  Sparkles,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { martApi } from '../services/api';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Reports() {
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    total_sales: 0,
    total_bills: 0,
    avg_order_value: 0,
    total_udhar_pending: 0,
    payment_modes: [],
    top_products: [],
    timeline: []
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await martApi.getReportsSummary(timeframe);
      setReport(res.data);
    } catch (err) {
      console.error('Error fetching report summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [timeframe]);

  const exportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'StoreMind Pro - Sales Summary Report\n\n';
    csvContent += `Total Sales,₹${report.total_sales}\n`;
    csvContent += `Total Orders,${report.total_bills}\n`;
    csvContent += `Avg Order Value,₹${report.avg_order_value}\n`;
    csvContent += `Udhar Pending,₹${report.total_udhar_pending}\n\n`;

    csvContent += 'Sales Timeline\nDate,Sales (₹),Orders\n';
    report.timeline.forEach(t => {
      csvContent += `${t.date},${t.sales},${t.orders}\n`;
    });

    csvContent += '\nTop Selling Products\nProduct,Units Sold,Revenue (₹)\n';
    report.top_products.forEach(p => {
      csvContent += `"${p.product_name}",${p.units_sold},${p.revenue}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StoreMind_Sales_Report_${timeframe}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Sales & Analytics Reports
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor revenue, payment breakdowns, and top-selling products in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['today', '7d', '30d'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeframe === tf
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf === 'today' ? 'Today' : tf === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
              </button>
            ))}
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{report.total_sales.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
              Live database aggregate
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total Bills Issued</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{report.total_bills}</h3>
            <span className="text-[11px] font-medium text-slate-400 mt-0.5 block">
              Completed sales
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Avg. Order Value</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{report.avg_order_value}</h3>
            <span className="text-[11px] font-medium text-slate-400 mt-0.5 block">
              Per customer receipt
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Udhar / Khata Balance</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">₹{report.total_udhar_pending.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] font-medium text-amber-600 mt-0.5 block">
              Pending customer credit
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Revenue & Sales Trend</h3>
              <p className="text-xs text-slate-500">Daily sales performance trajectory</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
              Sales (₹)
            </span>
          </div>

          <div className="h-64 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">Loading chart...</div>
            ) : report.timeline.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">No sales data recorded yet. Create POS bills to populate graph.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={report.timeline}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    formatter={(value) => [`₹${value}`, 'Sales']}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Payment Modes Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Payment Modes</h3>
              <p className="text-xs text-slate-500">Breakdown by Cash, UPI, Card, Udhar</p>
            </div>
            <PieIcon className="w-5 h-5 text-slate-400" />
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {loading ? (
              <div className="text-slate-400 text-sm">Loading distribution...</div>
            ) : report.payment_modes.length === 0 ? (
              <div className="text-slate-400 text-sm">No payment records found</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={report.payment_modes}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="amount"
                    nameKey="mode"
                  >
                    {report.payment_modes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Payment Modes Legend */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-100">
            {report.payment_modes.map((pm, idx) => (
              <div key={pm.mode} className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-50">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  {pm.mode}
                </span>
                <span className="font-semibold text-slate-900">₹{pm.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Top Selling Products
            </h3>
            <p className="text-xs text-slate-500">Highest grossing items in store catalog</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">Ranked by revenue</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase font-semibold">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Units Sold</th>
                <th className="py-3 px-4">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {report.top_products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400">
                    No product sales recorded yet.
                  </td>
                </tr>
              ) : (
                report.top_products.map((prod, index) => (
                  <tr key={prod.product_id || index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-400">#{index + 1}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{prod.product_name}</td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{prod.units_sold} pcs</td>
                    <td className="py-3 px-4 font-bold text-blue-600">₹{prod.revenue.toLocaleString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
