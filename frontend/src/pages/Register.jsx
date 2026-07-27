import React, { useState } from 'react';
import { ShoppingBag, Mail, Lock, Eye, EyeOff, User, Store } from 'lucide-react';
import { authApi } from '../services/api';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization_name: '',
    organization_type: 'supermarket',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Only send required fields — no phone
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        organization_name: formData.organization_name.trim(),
        organization_type: formData.organization_type,
      };
      const response = await authApi.register(payload);
      const { access_token, user, organization } = response.data;
      localStorage.setItem('storemind_token', access_token);
      onRegisterSuccess(user, organization);
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        // Pydantic validation errors
        setError(detail.map((d) => `${d.loc?.slice(-1)[0] || 'field'}: ${d.msg}`).join(' | '));
      } else if (typeof detail === 'string') {
        setError(detail);
      } else {
        // Show the full raw response for debugging
        const raw = JSON.stringify(err.response?.data || err.message || 'Unknown error');
        setError(`Error ${err.response?.status || ''}: ${raw}`);
        console.error('Registration error full:', err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-600 rounded-2xl shadow-md mb-4">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Store Account</h1>
          <p className="text-sm text-slate-500 mt-1">Register your business on StoreMind Pro</p>
        </div>

        {/* Card */}
        <div className="card-md p-8">
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={set('name')}
                  className="input-field pl-9"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Store Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Store / Business Name</label>
              <div className="relative">
                <Store className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.organization_name}
                  onChange={set('organization_name')}
                  className="input-field pl-9"
                  placeholder="e.g. Sayyad Supermarket"
                />
              </div>
            </div>

            {/* Store Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Store Type</label>
              <select value={formData.organization_type} onChange={set('organization_type')} className="input-field">
                <option value="supermarket">Supermarket</option>
                <option value="kirana">Kirana Store</option>
                <option value="wholesale">Wholesale</option>
                <option value="retail_chain">Retail Chain</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={set('email')}
                  className="input-field pl-9"
                  placeholder="you@example.com"
                />
              </div>
            </div>



            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={set('password')}
                  className="input-field pl-9 pr-10"
                  placeholder="Minimum 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
              {loading ? 'Creating Account...' : 'Register & Start Store'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-blue-600 font-semibold hover:underline">
              Sign in
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          StoreMind Pro — AI-Powered Retail Management
        </p>
      </div>
    </div>
  );
}
