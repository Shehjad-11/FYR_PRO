import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import AIInsights from './pages/AIInsights';
import { authApi } from './services/api';

export default function App() {
  const [authView, setAuthView] = useState('login'); // 'login', 'register', 'authenticated'
  const [user, setUser] = useState(null);
  const [org, setOrg] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('storemind_token');
    if (token) {
      authApi.getMe()
        .then((res) => {
          setUser(res.data);
          setAuthView('authenticated');
        })
        .catch(() => {
          localStorage.removeItem('storemind_token');
          setAuthView('login');
        });
    }
  }, []);

  const handleLoginSuccess = (userData, orgData) => {
    setUser(userData);
    setOrg(orgData);
    setAuthView('authenticated');
  };

  const handleLogout = () => {
    localStorage.removeItem('storemind_token');
    setUser(null);
    setOrg(null);
    setAuthView('login');
  };

  if (authView === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setAuthView('register')} />;
  }

  if (authView === 'register') {
    return <Register onRegisterSuccess={handleLoginSuccess} onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      <Navbar user={user} org={org} onLogout={handleLogout} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
          {activeTab === 'billing' && <Billing />}
          {activeTab === 'inventory' && <Inventory />}
          {activeTab === 'customers' && <Customers />}
          {activeTab === 'ai-insights' && <AIInsights />}
          {activeTab === 'reports' && <Dashboard onNavigate={setActiveTab} />}
        </main>
      </div>
    </div>
  );
}
