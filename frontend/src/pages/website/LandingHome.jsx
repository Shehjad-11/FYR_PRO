import React from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  BrainCircuit, 
  Mic, 
  Scan, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Zap,
  BarChart3
} from 'lucide-react';

export default function LandingHome({ setActiveNav, onOpenLogin }) {
  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Next-Gen Retail AI v0.3.1 Active</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Smart AI Retail <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  For Indian SMBs
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Transform your Kirana store, supermarket, or retail chain with instant POS billing, Prophet demand forecasting, YOLO visual product scanning, and Udhar Khata CRM.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onOpenLogin}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/25 text-sm"
                >
                  <span>Start Free Store Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveNav('ai-showcase')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-300 px-6 py-3.5 rounded-2xl transition-all text-sm"
                >
                  <BrainCircuit className="w-4 h-4 text-blue-600" />
                  <span>Explore 6 AI Engines</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Offline Capable</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> GST Invoice Compliant</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Regional Language Voice</span>
              </div>
            </div>

            {/* Right Hero Card / App Mockup Preview */}
            <div className="relative">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl shadow-blue-900/10 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-bold text-slate-700 ml-2">StoreMind POS Counter Live</span>
                  </div>
                  <span className="badge-blue text-[10px]">Prophet AI Sync</span>
                </div>

                {/* Dashboard Snippet Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-xs text-slate-400 font-medium">Today's Sales</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">₹42,850</h3>
                    <span className="text-[10px] text-emerald-600 font-semibold">+18.4% vs yesterday</span>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                    <p className="text-xs text-blue-700 font-medium">AI Stock Forecast</p>
                    <h3 className="text-xl font-bold text-blue-900 mt-1">98.4%</h3>
                    <span className="text-[10px] text-blue-600 font-semibold">Zero stockout accuracy</span>
                  </div>
                </div>

                {/* Live POS Bill Line Item Demo */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold flex items-center gap-1.5"><Mic className="w-3.5 h-3.5 text-blue-400" /> Voice Input Active</span>
                    <span className="text-slate-400 text-[10px]">Whisper AI</span>
                  </div>
                  <p className="text-xs text-slate-300 italic bg-slate-800 p-2 rounded-xl border border-slate-700">
                    "Add 2 packets Fortune Rice 5kg and 1 Amul Butter"
                  </p>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                    <span className="text-slate-400">Total Bill Amount:</span>
                    <span className="font-extrabold text-emerald-400 text-sm">₹955.00</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* METRICS COUNTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-400">10M+</h2>
            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Target Indian Retailers</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-emerald-400">₹4.8M+</h2>
            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Processed GMV Sales</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-amber-400">6 AI</h2>
            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Built-in Machine Learning Models</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-violet-400">99.9%</h2>
            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Uptime & Offline Sync</p>
          </div>
        </div>
      </section>

      {/* 6 AI FEATURES HIGHLIGHT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Powered by 6 Purpose-Built AI Engines
          </h2>
          <p className="text-sm text-slate-500">
            Advanced machine learning built specifically for high-speed checkout and Kirana operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Prophet Demand Forecasting</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Predict future stock demand 7–30 days in advance to eliminate stockouts during festivals and peak seasons.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <Scan className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">YOLOv11 Object Recognition</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Scan produce and un-barcoded items in milliseconds using camera vision AI at checkout counter.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 mb-4">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Whisper Voice POS Billing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Speak item names in Hindi or regional languages to auto-generate bills hands-free without typing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">K-Means Customer CRM</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automatically segment customers into High-Value, Frequent, and At-Risk groups to offer targeted rewards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">XGBoost Dynamic Pricing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculate optimal profit margins and dynamic discounts based on local demand and item expiry dates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Mistral 7B RAG Assistant</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ask natural language questions about your business health, profit margins, and inventory performance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl font-extrabold">Ready to Digitise & Automate Your Store?</h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Join thousands of Indian retailers running faster checkouts, zero stockouts, and intelligent Udhar CRM.
          </p>
          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-slate-100 font-extrabold px-8 py-3.5 rounded-2xl shadow-md transition-colors text-sm"
          >
            <span>Launch StoreMind Pro Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
