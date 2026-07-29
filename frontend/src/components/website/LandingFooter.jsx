import React from 'react';
import { ShoppingBag, Heart, Shield, Mail, Phone, MapPin } from 'lucide-react';

export default function LandingFooter({ setActiveNav, onOpenLogin }) {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl text-white">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                StoreMind <span className="text-blue-500">PRO</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering 10M+ Indian small retailers with AI-driven POS billing, inventory automation, Udhar Khata CRM, and demand forecasting.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-emerald-400" /> ISO 27001 Secure</span>
              <span>•</span>
              <span>Made with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> in India</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => setActiveNav('home')} className="hover:text-white transition-colors">Home Page</button></li>
              <li><button onClick={() => setActiveNav('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => setActiveNav('solutions')} className="hover:text-white transition-colors">Retail Solutions</button></li>
              <li><button onClick={() => setActiveNav('pricing')} className="hover:text-white transition-colors">Subscription Plans</button></li>
              <li><button onClick={() => setActiveNav('ai-showcase')} className="hover:text-white transition-colors">AI Showcase</button></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => setActiveNav('blog')} className="hover:text-white transition-colors">Retail Growth Blog</button></li>
              <li><button onClick={() => setActiveNav('contact')} className="hover:text-white transition-colors">Help & Support</button></li>
              <li><button onClick={onOpenLogin} className="hover:text-white transition-colors">Merchant Portal Login</button></li>
              <li><a href="http://localhost:8000/api/docs" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Sales</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@storemind.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Tech Park, Bengaluru & Mumbai, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 StoreMind Pro. All rights reserved. Built for Indian SMB Retailers.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
