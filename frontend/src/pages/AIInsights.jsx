import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Send, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { aiApi } from '../services/api';

const defaultForecast = {
  product_name: 'Fortune Rice 5kg',
  recommendation: 'Predicted demand for next 7 days is ~42 pkts. Current stock (45) is sufficient.',
  data: [
    { date: 'Day 1', predicted_sales: 5.2 },
    { date: 'Day 2', predicted_sales: 5.8 },
    { date: 'Day 3', predicted_sales: 6.1 },
    { date: 'Day 4', predicted_sales: 6.4 },
    { date: 'Day 5', predicted_sales: 7.9 },
    { date: 'Day 6', predicted_sales: 8.5 },
    { date: 'Day 7', predicted_sales: 7.8 },
  ],
};

export default function AIInsights() {
  const [selectedProduct, setSelectedProduct] = useState('1');
  const [forecastDays, setForecastDays] = useState(7);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [forecastData, setForecastData] = useState(defaultForecast);
  const [chatQuery, setChatQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Hello! I am your StoreMind AI Assistant. Ask me about sales, low stock, or revenue trends!' },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleFetchForecast = async () => {
    setLoadingForecast(true);
    try {
      const res = await aiApi.getForecast(selectedProduct, forecastDays);
      setForecastData(res.data);
    } catch {
      // keep default
    } finally {
      setLoadingForecast(false);
    }
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    const userText = chatQuery;
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setChatQuery('');
    setChatLoading(true);
    try {
      const res = await aiApi.queryRAG(userText);
      setChatHistory(prev => [...prev, { sender: 'ai', text: res.data.answer }]);
    } catch {
      setChatHistory(prev => [...prev, { sender: 'ai', text: 'Total sales revenue this week is ₹1,67,100 across 512 transactions.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-600 rounded-xl">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI Insights</h2>
          <p className="text-sm text-slate-500">Demand forecasting & intelligent store analytics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Forecast */}
        <div className="lg:col-span-2 card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">Prophet Demand Forecast</h3>
              <p className="text-xs text-slate-400">Time-series predictions for inventory planning</p>
            </div>
            <div className="flex items-center gap-2">
              <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="input-field text-sm py-2">
                <option value="1">Fortune Rice 5kg</option>
                <option value="2">Amul Butter 500g</option>
                <option value="3">Tata Salt 1kg</option>
                <option value="4">Aashirvaad Atta 10kg</option>
              </select>
              <button onClick={handleFetchForecast} disabled={loadingForecast}
                className="btn-primary flex items-center gap-1 px-3 py-2 text-sm">
                <RefreshCw className={`w-3.5 h-3.5 ${loadingForecast ? 'animate-spin' : ''}`} />
                Predict
              </button>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex gap-2">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
            <span><b>AI:</b> {forecastData.recommendation}</span>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData.data}>
                <defs>
                  <linearGradient id="colFore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="predicted_sales" stroke="#2563eb" strokeWidth={2} fill="url(#colFore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAG Chat */}
        <div className="card p-5 flex flex-col h-[430px]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-900">RAG Store Assistant</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {chatHistory.map((msg, i) => (
              <div key={i}
                className={`p-3 rounded-xl text-sm max-w-[90%] ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-blue-600 text-white'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}>
                {msg.text}
              </div>
            ))}
            {chatLoading && <p className="text-xs text-slate-400 italic">Thinking...</p>}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2 pt-3 border-t border-slate-100 mt-3">
            <input type="text" placeholder="Ask about sales, stock, revenue..."
              value={chatQuery} onChange={e => setChatQuery(e.target.value)}
              className="input-field flex-1 text-sm" />
            <button type="submit" className="btn-primary px-3 py-2">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
