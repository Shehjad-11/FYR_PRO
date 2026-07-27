import React, { useState } from 'react';
import { ShoppingBag, Lock, Mail, ArrowRight } from 'lucide-react';
import { authApi } from '../services/api';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('admin@storemind.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login({ email, password });
      const { access_token, user, organization } = response.data;
      localStorage.setItem('storemind_token', access_token);
      onLoginSuccess(user, organization);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to login. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] p-4">
      <div className="w-full max-w-md bg-cyber-card border border-cyber-border p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-2xl shadow-lg shadow-indigo-500/30 mb-2">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">StoreMind Pro</h2>
          <p className="text-sm text-slate-400">AI-Powered Retail Management SaaS</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/80 border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="admin@storemind.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/80 border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-cyber-border">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-cyan-400 hover:underline font-semibold">
            Register Supermarket
          </button>
        </div>
      </div>
    </div>
  );
}
