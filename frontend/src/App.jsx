import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPortal from './pages/LoginPortal';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import AIInsights from './pages/AIInsights';
import Reports from './pages/Reports';
import BillHistory from './pages/BillHistory';
import AdminDashboard from './pages/AdminDashboard';
import MainWebsite from './pages/website/MainWebsite';
import { authApi } from './services/api';

export default function App() {
  const [authView, setAuthView] = useState('website'); // 'website' | 'login' | 'register' | 'authenticated'
  const [user, setUser] = useState(null);
  const [org, setOrg] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('storemind_token');
    if (token) {
      authApi.getMe()
        .then(res => { 
          setUser(res.data); 
          // Role-based initial tab allocation
          if (res.data.role === 'super_admin' || res.data.role === 'admin' || res.data.role === 'superadmin') {
            setActiveTab('admin-dashboard');
          } else {
            setActiveTab('dashboard');
          }
          setAuthView('authenticated'); 
        })
        .catch(() => { 
          localStorage.removeItem('storemind_token'); 
        });
    }
  }, []);

  const handleLoginSuccess = (userData, orgData) => {
    setUser(userData);
    setOrg(orgData);
    
    // LOG-004: Role-Based Redirection
    if (userData?.role === 'super_admin' || userData?.role === 'admin' || userData?.role === 'superadmin') {
      setActiveTab('admin-dashboard');
    } else {
      setActiveTab('dashboard');
    }

    setAuthView('authenticated');
  };

  const handleLogout = () => {
    localStorage.removeItem('storemind_token');
    setUser(null);
    setOrg(null);
    setAuthView('login');
  };

  if (authView === 'website') {
    return <MainWebsite onOpenApp={() => setAuthView(user ? 'authenticated' : 'login')} />;
  }

  if (authView === 'login') {
    return (
      <LoginPortal
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => setAuthView('register')}
        onBackToWebsite={() => setAuthView('website')}
      />
    );
  }

  if (authView === 'register') {
    return <Register onRegisterSuccess={handleLoginSuccess} onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        user={user} 
        org={org} 
        onLogout={handleLogout} 
        onNavigate={setActiveTab} 
        onVisitWebsite={() => setAuthView('website')}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'dashboard'        && <Dashboard onNavigate={setActiveTab} />}
          {activeTab === 'billing'          && <Billing />}
          {activeTab === 'inventory'        && <Inventory />}
          {activeTab === 'customers'        && <Customers />}
          {activeTab === 'reports'          && <Reports />}
          {activeTab === 'bill-history'     && <BillHistory />}
          {activeTab === 'ai-insights'      && <AIInsights />}
          {activeTab === 'admin-dashboard'  && <AdminDashboard />}
        </main>
      </div>
    </div>
  );
}
