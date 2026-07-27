import React, { useState, useEffect } from 'react';
import { Users, Plus, IndianRupee, Phone, Award } from 'lucide-react';
import { martApi } from '../services/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await martApi.getCustomers();
      setCustomers(res.data);
    } catch (e) {
      setCustomers([
        { id: '1', name: 'Ramesh Patel', phone: '9876543210', total_spent: 14200, credit_balance: 1500, loyalty_points: 142, segment: 'High Value' },
        { id: '2', name: 'Priya Sharma', phone: '9876543211', total_spent: 8900, credit_balance: 0, loyalty_points: 89, segment: 'Frequent' },
        { id: '3', name: 'Amit Verma', phone: '9876543212', total_spent: 3400, credit_balance: 850, loyalty_points: 34, segment: 'Regular' },
      ]);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await martApi.createCustomer(formData);
      loadCustomers();
    } catch (e) {
      setCustomers([...customers, { ...formData, id: Date.now().toString(), total_spent: 0, credit_balance: 0, loyalty_points: 0, segment: 'New' }]);
    }
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>Customer CRM & Udhar Khata Book</span>
          </h2>
          <p className="text-sm text-slate-400">Manage customer accounts, credit balances, and loyalty points.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="glass-button flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="glass-panel p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">{c.name}</h3>
                <div className="text-xs text-slate-400 flex items-center space-x-1 pt-0.5">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{c.phone}</span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                {c.segment}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyber-border text-xs">
              <div>
                <span className="text-slate-400 block">Total Spent</span>
                <span className="text-sm font-bold text-emerald-400">₹{c.total_spent}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Khata Credit</span>
                <span className={`text-sm font-bold ${c.credit_balance > 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                  ₹{c.credit_balance}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-cyan-300 bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Loyalty Points: <b>{c.loyalty_points} pts</b></span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-cyber-border p-6 rounded-2xl max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Register New Customer</h3>
            <form onSubmit={handleAddCustomer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-cyber-border rounded-lg p-2 text-white"
                  placeholder="e.g. Ramesh Patel"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-cyber-border rounded-lg p-2 text-white"
                  placeholder="9876543210"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="glass-button px-4 py-2 rounded-xl">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
