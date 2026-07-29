import React, { useState, useEffect } from 'react';
import { Users, Plus, Phone, Award, CreditCard, Eye, Receipt, CheckCircle, Search } from 'lucide-react';
import { martApi } from '../services/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  // Detail & Udhar payment modals
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  const [showUdharModal, setShowUdharModal] = useState(false);
  const [udharAmount, setUdharAmount] = useState('');
  const [udharNote, setUdharNote] = useState('');

  useEffect(() => { loadCustomers(); }, []);

  const loadCustomers = async () => {
    try {
      const res = await martApi.getCustomers({ search });
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

  const openCustomerDetails = async (customer) => {
    setSelectedCustomer(customer);
    setLoadingDetails(true);
    try {
      const res = await martApi.getCustomerDetails(customer.id);
      setCustomerDetails(res.data);
    } catch {
      setCustomerDetails({
        ...customer,
        bills: [
          { id: 'b1', invoice_number: 'INV-1722250000', total_amount: 1500, payment_mode: 'Udhar', created_at: new Date().toISOString(), items: [{ id: 'i1', product_name: 'Fortune Rice 5kg', quantity: 2, unit_price: 340, total_price: 680 }] }
        ]
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handlePayUdhar = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || !udharAmount) return;
    const amountNum = Number(udharAmount);

    try {
      await martApi.payUdhar(selectedCustomer.id, { amount: amountNum, note: udharNote });
      loadCustomers();
      openCustomerDetails(selectedCustomer);
    } catch {
      setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? { ...c, credit_balance: Math.max(0, c.credit_balance - amountNum) } : c));
      if (customerDetails) {
        setCustomerDetails({
          ...customerDetails,
          credit_balance: Math.max(0, customerDetails.credit_balance - amountNum)
        });
      }
    }
    setShowUdharModal(false);
    setUdharAmount('');
    setUdharNote('');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> Customer CRM & Udhar Khata
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage accounts, track credit balances, and process Udhar payments.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="card p-4 flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <span className="text-sm text-slate-500 font-medium">
          Total Customers: <span className="font-bold text-slate-900">{filteredCustomers.length}</span>
        </span>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map(c => (
          <div key={c.id} className="card p-5 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
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
                  <p className="text-xs text-slate-400 mb-0.5">Khata (Credit Balance)</p>
                  <p className={`text-sm font-bold ${c.credit_balance > 0 ? 'text-amber-600' : 'text-slate-600'}`}>
                    ₹{c.credit_balance.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-3 text-xs text-blue-600 bg-blue-50 border border-blue-100 p-2 rounded-lg">
                <Award className="w-3.5 h-3.5" />
                <span>Loyalty Points: <b>{c.loyalty_points} pts</b></span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => openCustomerDetails(c)}
                className="flex-1 btn-secondary text-xs flex items-center justify-center gap-1.5 py-2"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" /> View History
              </button>
              {c.credit_balance > 0 && (
                <button
                  onClick={() => {
                    setSelectedCustomer(c);
                    setUdharAmount(c.credit_balance.toString());
                    setShowUdharModal(true);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
                >
                  <CreditCard className="w-3.5 h-3.5" /> Pay Udhar
                </button>
              )}
            </div>
          </div>
        ))}
        {filteredCustomers.length === 0 && (
          <div className="col-span-3 card p-10 text-center text-slate-400">
            No matching customers found.
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Register New Customer</h3>
            <form onSubmit={handleAddCustomer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
                <input required type="text" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input-field" placeholder="e.g. Ramesh Patel" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input required type="tel" value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email (optional)</label>
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

      {/* Customer Details & History Modal */}
      {selectedCustomer && !showUdharModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedCustomer.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" /> {selectedCustomer.phone}
                </p>
              </div>
              <button
                onClick={() => { setSelectedCustomer(null); setCustomerDetails(null); }}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Total Lifetime Spent</p>
                <p className="text-base font-bold text-emerald-600 mt-0.5">
                  ₹{(customerDetails?.total_spent ?? selectedCustomer.total_spent).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-700 font-medium">Udhar Credit Balance</p>
                <p className="text-base font-bold text-amber-800 mt-0.5">
                  ₹{(customerDetails?.credit_balance ?? selectedCustomer.credit_balance).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-700 font-medium">Loyalty Reward Points</p>
                <p className="text-base font-bold text-blue-800 mt-0.5">
                  {(customerDetails?.loyalty_points ?? selectedCustomer.loyalty_points)} pts
                </p>
              </div>
            </div>

            {/* Udhar Repayment Header Action */}
            {(customerDetails?.credit_balance ?? selectedCustomer.credit_balance) > 0 && (
              <div className="flex items-center justify-between p-3.5 bg-amber-500/10 border border-amber-200 rounded-xl mb-6">
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Outstanding Udhar Due</h4>
                  <p className="text-xs text-amber-700">Clear customer balance to collect pending payment.</p>
                </div>
                <button
                  onClick={() => {
                    setUdharAmount((customerDetails?.credit_balance ?? selectedCustomer.credit_balance).toString());
                    setShowUdharModal(true);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  Pay Udhar Balance
                </button>
              </div>
            )}

            {/* Past Transactions Table */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-3">
                <Receipt className="w-4 h-4 text-blue-600" />
                Purchase Transaction History
              </h4>

              {loadingDetails ? (
                <div className="py-8 text-center text-slate-400 text-sm">Loading history...</div>
              ) : !customerDetails?.bills || customerDetails.bills.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-sm bg-slate-50 rounded-xl border border-slate-100">
                  No previous bills associated with this customer.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Invoice #</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Payment Mode</th>
                        <th className="p-3">Items</th>
                        <th className="p-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customerDetails.bills.map(b => (
                        <tr key={b.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-medium text-blue-600">{b.invoice_number}</td>
                          <td className="p-3 text-slate-500">{new Date(b.created_at).toLocaleDateString()}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                              b.payment_mode === 'Udhar' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {b.payment_mode}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600">{b.items ? b.items.length : 0} items</td>
                          <td className="p-3 text-right font-bold text-slate-900">₹{b.total_amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Udhar Payment Form Modal */}
      {showUdharModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Clear Udhar Payment</h3>
            <p className="text-xs text-slate-500 mb-4">
              Recording payment for <span className="font-semibold text-slate-800">{selectedCustomer?.name}</span>
            </p>

            <form onSubmit={handlePayUdhar} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Repayment Amount (₹)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  max={selectedCustomer?.credit_balance}
                  value={udharAmount}
                  onChange={e => setUdharAmount(e.target.value)}
                  className="input-field text-lg font-bold text-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Cash collected by cashier"
                  value={udharNote}
                  onChange={e => setUdharNote(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowUdharModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                  Record Repayment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
