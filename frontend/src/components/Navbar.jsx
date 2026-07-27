import React from 'react';
import { ShoppingBag, Bell, LogOut } from 'lucide-react';

export default function Navbar({ user, org, onLogout }) {
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

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex badge-blue">AI Active</span>

        <button className="relative p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>

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
