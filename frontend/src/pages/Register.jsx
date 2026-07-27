import React, { useState } from 'react';
import { ShoppingBag, Lock, Mail, User, Store, Phone } from 'lucide-react';
import { authApi } from '../services/api';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    organization_name: '',
    organization_type: 'supermarket',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.register(formData);
      const { access_token, user, organization } = response.data;
      localStorage.setItem('storemind_token', access_token);
      onRegisterSuccess(user, organization);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please check form details.');
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
          <h2 className="text-2xl font-bold text-white">Create Store Account</h2>
          <p className="text-sm text-slate-400">Register your supermarket on StoreMind Pro</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900/80 border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Shehjad Sayyad"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Store / Business Name</label>
            <div className="relative">
              <Store className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.organization_name}
                onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
                className="w-full bg-slate-900/80 border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Sayyad Supermarket & Kirana"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900/80 border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="shehjad@example.com"
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-900/80 border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button py-3 rounded-xl font-semibold"
          >
            {loading ? 'Creating Store Account...' : 'Register & Start Store'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-cyber-border">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-cyan-400 hover:underline font-semibold">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
