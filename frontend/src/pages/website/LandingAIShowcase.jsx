import React, { useState } from 'react';
import { BrainCircuit, TrendingUp, Scan, Mic, Users, Zap, MessageSquare, Play, Sparkles } from 'lucide-react';

export default function LandingAIShowcase({ onOpenLogin }) {
  const [activeDemo, setActiveDemo] = useState('prophet');

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white pt-12 pb-8 text-center space-y-3">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-2">
            <BrainCircuit className="w-4 h-4" /> 6 Micro AI Engines Included
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900">Interactive AI Technology Showcase</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Test how StoreMind's purpose-built machine learning algorithms transform Kirana retail operations.
          </p>
        </div>
      </section>

      {/* AI Selector Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'prophet', name: 'Prophet Demand', icon: TrendingUp },
            { id: 'yolo', name: 'YOLOv11 Vision', icon: Scan },
            { id: 'whisper', name: 'Whisper Voice', icon: Mic },
            { id: 'kmeans', name: 'K-Means CRM', icon: Users },
            { id: 'xgboost', name: 'XGBoost Pricing', icon: Zap },
            { id: 'mistral', name: 'Mistral 7B RAG', icon: MessageSquare },
          ].map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveDemo(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeDemo === id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}
        </div>

        {/* Demo Display Panel */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
          {activeDemo === 'prophet' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" /> Prophet Time-Series Demand Forecast
                  </h3>
                  <p className="text-xs text-slate-400">Predicts stock restocking needs using seasonal trend decomposition.</p>
                </div>
                <span className="badge-blue">Accuracy: 98.4%</span>
              </div>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 font-mono text-xs text-emerald-400">
                [OUTPUT]: Predicted demand for 'Fortune Rice 5kg' next week = 84 units (Confidence Interval: 80 - 88). Restock recommendation: +40 units before Friday.
              </div>
            </div>
          )}

          {activeDemo === 'yolo' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Scan className="w-5 h-5 text-emerald-400" /> YOLOv11 Computer Vision Produce Scan
                  </h3>
                  <p className="text-xs text-slate-400">Instant visual detection of un-barcoded fruits & vegetables.</p>
                </div>
                <span className="badge-green">Latency: 180ms</span>
              </div>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 font-mono text-xs text-blue-400">
                [CAMERA VISION]: Detected 'Shimla Apple' (Class 04) - Confidence: 99.2%. Auto-added 1.5 kg @ ₹140/kg = ₹210.00 to checkout basket.
              </div>
            </div>
          )}

          {activeDemo === 'whisper' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Mic className="w-5 h-5 text-violet-400" /> Whisper Regional Voice Billing
                  </h3>
                  <p className="text-xs text-slate-400">Speech-to-text NLP in Hindi, English, and regional dialects.</p>
                </div>
                <span className="badge-blue">Languages: 10+</span>
              </div>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 font-mono text-xs text-amber-300">
                [SPEECH TRANSCRIPTION]: "दो पैकेट अमूल बटर और एक किलो टाटा नमक जोड़ो" ➔ Parsed: [Amul Butter 500g x2, Tata Salt 1kg x1].
              </div>
            </div>
          )}

          {activeDemo === 'kmeans' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-400" /> K-Means Customer Clustering
                  </h3>
                  <p className="text-xs text-slate-400">Automated RFM (Recency, Frequency, Monetary) segmentation.</p>
                </div>
                <span className="badge-amber">Clustering K=4</span>
              </div>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 font-mono text-xs text-violet-300">
                [CRM SEGMENT]: Customer 'Ramesh Patel' classified as 'High Value Loyal' (Spent &gt; ₹14,000). Offer 5% Udhar cashback.
              </div>
            </div>
          )}

          {activeDemo === 'xgboost' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-rose-400" /> XGBoost Dynamic Pricing & Discount Optimizer
                  </h3>
                  <p className="text-xs text-slate-400">Calculates optimal retail margin considering expiry dates and local competitor prices.</p>
                </div>
                <span className="badge-green">Margin +12%</span>
              </div>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 font-mono text-xs text-emerald-300">
                [DYNAMIC MARGIN]: 'Amul Milk 1L' (Expiry: 2 days) ➔ Optimal discount: 8% off to accelerate clearance before loss.
              </div>
            </div>
          )}

          {activeDemo === 'mistral' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-400" /> Mistral 7B RAG Retail Copilot
                  </h3>
                  <p className="text-xs text-slate-400">Conversational AI trained on store SQL database schemas.</p>
                </div>
                <span className="badge-blue">Local RAG</span>
              </div>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 font-mono text-xs text-slate-200">
                [QUERY]: "Which product generated highest margin this week?" ➔ [ANSWER]: "Fortune Rice 5kg delivered highest profit margin of ₹2,250 (18% gross margin)."
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
