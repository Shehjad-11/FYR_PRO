import React from 'react';
import { Target, Users, Shield, Award, Cpu, ArrowRight } from 'lucide-react';

export default function LandingAbout({ onOpenLogin }) {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white pt-12 pb-10 text-center space-y-4">
        <div className="max-w-3xl mx-auto px-4">
          <span className="badge-blue text-xs font-bold uppercase tracking-wider">Our Mission</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
            Empowering 10M+ Indian Small Retailers with AI
          </h1>
          <p className="text-base text-slate-600 leading-relaxed mt-3">
            StoreMind Pro was built to bridge the gap between traditional Kirana store operations and cutting-edge artificial intelligence, transforming manual retail into data-driven success.
          </p>
        </div>
      </section>

      {/* Core Values / Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Purpose-Built for India</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designed around Indian retail realities — supporting Udhar Khata credit accounts, regional language voice billing, and un-barcoded loose produce sales.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Offline-First Hybrid Architecture</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              StoreMind runs locally even when internet connectivity drops, automatically syncing transaction history once back online.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Enterprise Security & Compliance</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Multi-tenant architecture with encrypted SQLite & PostgreSQL storage, JWT authentication, and strict multi-org isolation.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 text-white rounded-3xl p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase">System Architecture</span>
          <h2 className="text-3xl font-extrabold">Hybrid Microservices Infrastructure</h2>
          <p className="text-xs text-slate-400">
            Powered by FastAPI microservices, React 19, Prophet, YOLOv11, Whisper, and TimescaleDB.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <p className="font-bold text-blue-400">FastAPI 0.115</p>
            <p className="text-slate-400 text-[11px]">Async Python Backend</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <p className="font-bold text-emerald-400">React 19 + Vite</p>
            <p className="text-slate-400 text-[11px]">High-Speed SPA UI</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <p className="font-bold text-amber-400">SQLite / Postgres</p>
            <p className="text-slate-400 text-[11px]">Async SQLAlchemy 2.0</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <p className="font-bold text-violet-400">6 Micro AI Models</p>
            <p className="text-slate-400 text-[11px]">Edge & Cloud Inference</p>
          </div>
        </div>
      </section>
    </div>
  );
}
