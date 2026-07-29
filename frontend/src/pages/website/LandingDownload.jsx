import React from 'react';
import { Download, Monitor, Smartphone, Cpu, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LandingDownload({ onOpenLogin }) {
  const downloadInstaller = (platform) => {
    alert(`Downloading StoreMind Pro v0.3.1 Standalone Installer for ${platform}...`);
  };

  return (
    <div className="space-y-16 pb-20 font-sans">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white pt-12 pb-8 text-center space-y-3">
        <div className="max-w-3xl mx-auto px-4">
          <span className="badge-blue text-xs font-bold uppercase">Offline Standalone Package</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">Download StoreMind Pro Standalone</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Zero-internet Kirana billing, local SQLite storage, ONNX Edge AI scanning, and automatic cloud sync.
          </p>
        </div>
      </section>

      {/* Download Options Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Windows Desktop Package */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <Monitor className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">Recommended for POS Counters</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Windows Desktop Edition</h3>
                <p className="text-xs text-slate-500 mt-1">Standalone x64 installer bundled with SQLite & FastAPI local runtime.</p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                <li className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Version: v0.3.1 (Build 2026.07)
                </li>
                <li className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Support: Windows 10 / 11 (64-bit)
                </li>
                <li className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Size: ~48 MB Self-Extracting Installer
                </li>
                <li className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Includes ONNX Edge AI & Thermal Printer Drivers
                </li>
              </ul>
            </div>

            <button
              onClick={() => downloadInstaller('Windows Desktop (.exe)')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-2xl transition-all shadow-md shadow-blue-600/20 text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Windows Installer (.exe)
            </button>
          </div>

          {/* Android Mobile / Tablet Package */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                <Smartphone className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">For Mobile & Billing Handhelds</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Android POS Edition</h3>
                <p className="text-xs text-slate-500 mt-1">Lightweight APK for handheld POS barcode terminals & Android tablets.</p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                <li className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Version: v0.3.1 Mobile APK
                </li>
                <li className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Support: Android 9.0+
                </li>
                <li className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Size: ~24 MB
                </li>
                <li className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Bluetooth Thermal Receipt Printing
                </li>
              </ul>
            </div>

            <button
              onClick={() => downloadInstaller('Android POS (.apk)')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl transition-all shadow-md shadow-emerald-600/20 text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Android APK (.apk)
            </button>
          </div>

        </div>
      </section>

      {/* System Requirements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 text-white rounded-3xl p-10 space-y-6">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase">Hardware Specifications</span>
          <h2 className="text-2xl font-extrabold">Minimum System Requirements</h2>
          <p className="text-xs text-slate-400">Designed to run smoothly on existing Kirana store desktop PCs and billing laptops.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <p className="font-bold text-blue-400">Processor (CPU)</p>
            <p className="text-slate-300">Intel Core i3 / AMD Ryzen 3 or higher</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <p className="font-bold text-emerald-400">System Memory (RAM)</p>
            <p className="text-slate-300">4 GB RAM (8 GB recommended for Edge AI)</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <p className="font-bold text-amber-400">Disk Storage</p>
            <p className="text-slate-300">500 MB free space for local SQLite database</p>
          </div>
        </div>
      </section>
    </div>
  );
}
