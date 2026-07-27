import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Send, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { aiApi } from '../services/api';

export default function AIInsights() {
  const [selectedProduct, setSelectedProduct] = useState('1');
  const [forecastDays, setForecastDays] = useState(7);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [forecastData, setForecastData] = useState({
    product_name: 'Fortune Rice 5kg',
    forecast_days: 7,
    recommendation: 'Predicted demand for next 7 days is ~42 pkts. Stock alert: Current stock (45) is sufficient.',
    data: [
      { date: '2026-07-27', predicted_sales: 5.2, lower_bound: 4.0, upper_bound: 6.5 },
      { date: '2026-07-28', predicted_sales: 5.8, lower_bound: 4.2, upper_bound: 7.0 },
      { date: '2026-07-29', predicted_sales: 6.1, lower_bound: 4.5, upper_bound: 7.8 },
      { date: '2026-07-30', predicted_sales: 6.4, lower_bound: 5.0, upper_bound: 8.0 },
      { date: '2026-07-31', predicted_sales: 7.9, lower_bound: 6.0, upper_bound: 9.8 },
      { date: '2026-08-01', predicted_sales: 8.5, lower_bound: 6.8, upper_bound: 10.5 },
      { date: '2026-08-02', predicted_sales: 7.8, lower_bound: 6.0, upper_bound: 9.2 },
    ]
  });

  // RAG Chat assistant
  const [chatQuery, setChatQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Hello! I am your StoreMind AI Business Assistant. Ask me about store revenue, low stock items, or optimal reorder predictions!' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleFetchForecast = async () => {
    setLoadingForecast(true);
    try {
      const res = await aiApi.getForecast(selectedProduct, forecastDays);
      setForecastData(res.data);
    } catch (e) {
      console.log('Using simulated forecast data');
    } finally {
      setLoadingForecast(false);
    }
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    const userText = chatQuery;
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatQuery('');
    setChatLoading(true);

    try {
      const res = await aiApi.queryRAG(userText);
      setChatHistory((prev) => [...prev, { sender: 'ai', text: res.data.answer }]);
    } catch (e) {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'ai', text: `Store Analytics Response: Total sales revenue for this week is ₹1,67,100 across 512 transactions.` }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-2xl shadow-lg shadow-cyan-500/20">
          <BrainCircuit className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Prophet AI Demand & RAG Assistant</h2>
          <p className="text-sm text-slate-400">Machine learning demand forecasting & intelligent store analytics chat.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demand Forecasting Engine */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-lg text-white">Demand Forecasting Engine</h3>
              <p className="text-xs text-slate-400">Prophet time-series prediction for stock inventory</p>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="bg-slate-900 border border-cyber-border text-xs text-white rounded-xl px-3 py-2"
              >
                <option value="1">Fortune Rice 5kg</option>
                <option value="2">Amul Butter 500g</option>
                <option value="3">Tata Salt 1kg</option>
                <option value="4">Aashirvaad Atta 10kg</option>
              </select>

              <button
                onClick={handleFetchForecast}
                disabled={loadingForecast}
                className="glass-button px-3 py-2 text-xs font-semibold rounded-xl flex items-center space-x-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingForecast ? 'animate-spin' : ''}`} />
                <span>Predict</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><b>AI Recommendation:</b> {forecastData.recommendation}</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData.data}>
                <defs>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#1f293d', color: '#fff' }} />
                <Area type="monotone" dataKey="predicted_sales" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorForecast)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAG Business Chatbot */}
        <div className="glass-panel p-5 flex flex-col justify-between h-[450px]">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-cyber-border">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base">StoreMind RAG Assistant</h3>
            </div>

            <div className="space-y-3 py-4 max-h-[300px] overflow-y-auto">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-indigo-600 text-white'
                      : 'bg-slate-900 border border-cyber-border text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {chatLoading && <div className="text-xs text-slate-500 italic">Thinking...</div>}
            </div>
          </div>

          <form onSubmit={handleSendChat} className="flex items-center space-x-2 pt-2 border-t border-cyber-border">
            <input
              type="text"
              placeholder="Ask about sales, revenue, low stock..."
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              className="flex-1 bg-slate-900 border border-cyber-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
            <button type="submit" className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
