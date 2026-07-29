import React, { useState, useEffect } from 'react';
import { ShoppingBag, Bell, LogOut, AlertTriangle, ArrowRight } from 'lucide-react';
import { martApi } from '../services/api';

export default function Navbar({ user, org, onLogout, onNavigate, onVisitWebsite }) {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchLowStock();
  }, []);

  const fetchLowStock = async () => {
    try {
      const res = await martApi.getProducts({ low_stock_only: true });
      setLowStockItems(res.data);
      setLowStockCount(res.data.length);
    } catch {
      // Fallback preview
      setLowStockItems([
        { id: '2', name: 'Amul Butter 500g', stock_quantity: 4, min_stock_alert: 10, unit: 'pkt' },
        { id: '4', name: 'Aashirvaad Atta 10kg', stock_quantity: 3, min_stock_alert: 5, unit: 'pkt' }
      ]);
      setLowStockCount(2);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-base text-slate-900 leading-tight">StoreMind Pro</h1>
          <p className="text-xs text-slate-400 leading-tight">{org?.name || 'Retail Management'}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 relative">
        {onVisitWebsite && (
          <button
            onClick={onVisitWebsite}
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors hidden md:block"
          >
            Main Website
          </button>
        )}
        <span className="hidden sm:inline-flex badge-blue">AI Active</span>

        {/* Bell Notification Icon */}
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Stock Alerts"
        >
          <Bell className="w-5 h-5" />
          {lowStockCount > 0 && (
            <span className="absolute top-1 right-1 px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full leading-none">
              {lowStockCount}
            </span>
          )}
        </button>

        {/* Low Stock Notification Dropdown Popover */}
        {showNotifications && (
          <div className="absolute right-12 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Low Stock Alerts ({lowStockCount})
              </h4>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {lowStockItems.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">All stock levels normal!</p>
              ) : (
                lowStockItems.map((item) => (
                  <div key={item.id} className="p-2 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-[11px] text-amber-700">Stock: {item.stock_quantity} {item.unit} (Alert at {item.min_stock_alert})</p>
                    </div>
                    <span className="badge-amber text-[10px] py-0.5 px-2">Low</span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => {
                setShowNotifications(false);
                if (onNavigate) onNavigate('inventory');
              }}
              className="w-full mt-3 pt-2 border-t border-slate-100 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1"
            >
              Open Inventory <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* User Info & Logout */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-slate-800 leading-tight">{user?.name || 'Admin'}</div>
            <div className="text-xs text-slate-400 capitalize leading-tight">{user?.role || 'admin'}</div>
          </div>
          <button
            onClick={onLogout}
            title="Logout"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
