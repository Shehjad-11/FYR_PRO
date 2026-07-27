import React from 'react';
import { ShoppingBag, Bot, User, LogOut, Bell, Sparkles } from 'lucide-react';

export default function Navbar({ user, org, onLogout }) {
  return (
    <header className="h-16 border-b border-cyber-border bg-cyber-card/60 backdrop-blur-lg px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-xl shadow-lg shadow-indigo-500/20">
          <ShoppingBag className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white flex items-center gap-2">
            StoreMind <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Pro</span>
          </h1>
          <p className="text-xs text-slate-400">{org?.name || 'Retail Supermarket'}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center gap-1.5 text-xs text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Engine Active</span>
        </div>

        <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-cyber-border pl-4">
          <div className="text-right">
            <div className="text-sm font-medium text-slate-200">{user?.name || 'Store Admin'}</div>
            <div className="text-xs text-slate-400 capitalize">{user?.role || 'Admin'}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
