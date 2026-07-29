import React, { useState } from 'react';
import { ShoppingBag, Eye, EyeOff, ShieldCheck, Store, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { authApi } from '../services/api';

export default function LoginPortal({ onLoginSuccess, onSwitchToRegister, onBackToWebsite }) {
  const [portalTab, setPortalTab] = useState('merchant'); // 'merchant' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fillAdminCredentials = () => {
    setPortalTab('admin');
    setEmail('admin@storemind.com');
    setPassword('Admin@123');
    setError('');
  };

  const fillMerchantCredentials = () => {
    setPortalTab('merchant');
    setEmail('TEST_SUPERMART1@GMAIL.COM');
    setPassword('Test@1234');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });
      const { access_token, user, organization } = res.data;
      localStorage.setItem('storemind_token', access_token);
      onLoginSuccess(user, organization);
    } catch (err) {
      console.error('Login error:', err);
      // Demo fallback credential handler if backend offline
      if (email.toLowerCase() === 'admin@storemind.com' && password === 'Admin@123') {
        const mockUser = { id: 'u_admin', name: 'Super Admin', email: 'admin@storemind.com', role: 'super_admin' };
        const mockOrg = { id: 'org_admin', name: 'StoreMind HQ Platform' };
        localStorage.setItem('storemind_token', 'mock_admin_token');
        onLoginSuccess(mockUser, mockOrg);
      } else if (email.toUpperCase() === 'TEST_SUPERMART1@GMAIL.COM' && password === 'Test@1234') {
        const mockUser = { id: 'u_merchant', name: 'SuperMart Manager', email: 'TEST_SUPERMART1@GMAIL.COM', role: 'store_manager' };
        const mockOrg = { id: 'org_merchant', name: 'SuperMart Kirana Store' };
        localStorage.setItem('storemind_token', 'mock_merchant_token');
        onLoginSuccess(mockUser, mockOrg);
      } else {
        setError(err.response?.data?.detail || 'Invalid email or password. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      {/* Top Navbar Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <div 
          onClick={onBackToWebsite} 
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Main Website
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-lg text-white">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-slate-900 text-sm">StoreMind PRO</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8 w-full max-w-md space-y-6">
          
          {/* Portal Role Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => { setPortalTab('merchant'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                portalTab === 'merchant'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" /> Merchant Login
            </button>

            <button
              onClick={() => { setPortalTab('admin'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                portalTab === 'admin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Super Admin
            </button>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {portalTab === 'admin' ? 'Super Admin Portal' : 'Merchant Sign In'}
            </h2>
            <p className="text-xs text-slate-500">
              {portalTab === 'admin' 
                ? 'Access platform-wide SaaS metrics, merchants & AI compute'
                : 'Access POS billing, inventory, Udhar Khata & reports'}
            </p>
          </div>

          {/* Preset Demo Credential Buttons */}
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-2 text-xs">
            <p className="font-bold text-blue-900 text-[11px]">⚡ Seeded Demo Test Credentials:</p>
            {portalTab === 'merchant' ? (
              <button
                type="button"
                onClick={fillMerchantCredentials}
                className="w-full bg-white hover:bg-blue-50 text-blue-700 font-semibold p-2 rounded-xl border border-blue-200 flex items-center justify-between transition-colors text-left"
              >
                <span>Store Manager: <b>TEST_SUPERMART1@GMAIL.COM</b></span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="w-full bg-white hover:bg-blue-50 text-blue-700 font-semibold p-2 rounded-xl border border-blue-200 flex items-center justify-between transition-colors text-left"
              >
                <span>Super Admin: <b>admin@storemind.com</b></span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder={portalTab === 'admin' ? 'admin@storemind.com' : 'merchant@store.com'}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-xs font-extrabold shadow-md shadow-blue-600/20"
            >
              {loading ? 'Authenticating...' : portalTab === 'admin' ? 'Sign In as Super Admin' : 'Sign In to Store'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Register Link */}
          {portalTab === 'merchant' && (
            <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
              New store owner?{' '}
              <button 
                onClick={onSwitchToRegister}
                className="font-bold text-blue-600 hover:underline"
              >
                Register Your Store
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        © 2026 StoreMind Pro AI Retail System. Encrypted JWT Auth.
      </footer>
    </div>
  );
}
