import React, { useState, useEffect } from 'react';
import { Users, Plus, Phone, Award, IndianRupee } from 'lucide-react';
import { martApi } from '../services/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  useEffect(() => { loadCustomers(); }, []);

  const loadCustomers = async () => {
    try {
      const res = await martApi.getCustomers();
      setCustomers(res.data);
    } catch {
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
    } catch {
      setCustomers(prev => [...prev, { ...formData, id: Date.now().toString(), total_spent: 0, credit_balance: 0, loyalty_points: 0, segment: 'New' }]);
    }
    setShowAddModal(false);
    setFormData({ name: '', phone: '', email: '' });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> Customer CRM & Udhar Khata
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage accounts, credit balances, and loyalty points.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(c => (
          <div key={c.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-900">{c.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                  <Phone className="w-3 h-3" /> {c.phone}
                </div>
              </div>
              <span className="badge-blue">{c.segment}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Total Spent</p>
                <p className="text-sm font-bold text-emerald-600">₹{c.total_spent.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Khata (Credit)</p>
                <p className={`text-sm font-bold ${c.credit_balance > 0 ? 'text-amber-600' : 'text-slate-600'}`}>
                  ₹{c.credit_balance}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-3 text-xs text-blue-600 bg-blue-50 border border-blue-100 p-2 rounded-lg">
              <Award className="w-3.5 h-3.5" />
              <span>Loyalty Points: <b>{c.loyalty_points} pts</b></span>
            </div>
          </div>
        ))}
        {customers.length === 0 && (
          <div className="col-span-3 card p-10 text-center text-slate-400">
            No customers yet. Add your first customer.
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Register New Customer</h3>
            <form onSubmit={handleAddCustomer} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
                <input required type="text" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input-field" placeholder="e.g. Ramesh Patel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input required type="tel" value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email (optional)</label>
                <input type="email" value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="input-field" placeholder="customer@email.com" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
