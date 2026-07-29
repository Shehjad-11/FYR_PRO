import React from 'react';
import { ShoppingBag, ArrowRight, BrainCircuit } from 'lucide-react';

export default function LandingNavbar({ activeNav, setActiveNav, onOpenLogin }) {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'ai-showcase', label: 'AI Showcase' },
    { id: 'download', label: 'Download App' },
    { id: 'blog', label: 'Blog & Resources' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveNav('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="p-2.5 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors shadow-sm">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
              StoreMind <span className="text-blue-600">PRO</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium block -mt-1">AI Retail System for SMBs</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveNav(link.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeNav === link.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20"
          >
            <span>Launch Merchant App</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
