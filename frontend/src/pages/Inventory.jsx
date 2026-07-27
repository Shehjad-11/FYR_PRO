import React, { useState, useEffect } from 'react';
import { Package, Plus, AlertTriangle, Search } from 'lucide-react';
import { martApi } from '../services/api';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', barcode: '', cost_price: '', selling_price: '',
    mrp: '', stock_quantity: '', min_stock_alert: 5, unit: 'pcs',
  });

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    try {
      const res = await martApi.getProducts();
      setProducts(res.data);
    } catch {
      setProducts([
        { id: '1', name: 'Fortune Rice 5kg', cost_price: 290, selling_price: 340, mrp: 380, stock_quantity: 45, min_stock_alert: 10, unit: 'pkt', barcode: '8901234567890' },
        { id: '2', name: 'Amul Butter 500g', cost_price: 240, selling_price: 275, mrp: 285, stock_quantity: 4, min_stock_alert: 10, unit: 'pkt', barcode: '8901234567891' },
        { id: '3', name: 'Tata Salt 1kg', cost_price: 22, selling_price: 28, mrp: 28, stock_quantity: 100, min_stock_alert: 15, unit: 'pkt', barcode: '8901234567892' },
        { id: '4', name: 'Aashirvaad Atta 10kg', cost_price: 400, selling_price: 460, mrp: 490, stock_quantity: 3, min_stock_alert: 5, unit: 'pkt', barcode: '8901234567893' },
      ]);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await martApi.createProduct({
        ...formData,
        cost_price: Number(formData.cost_price),
        selling_price: Number(formData.selling_price),
        mrp: Number(formData.mrp),
        stock_quantity: Number(formData.stock_quantity),
        min_stock_alert: Number(formData.min_stock_alert),
      });
      loadProducts();
    } catch {
      setProducts(prev => [...prev, { ...formData, id: Date.now().toString() }]);
    }
    setShowAddModal(false);
    setFormData({ name: '', barcode: '', cost_price: '', selling_price: '', mrp: '', stock_quantity: '', min_stock_alert: 5, unit: 'pcs' });
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" /> Inventory Management
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Track stock levels, pricing, and low-stock alerts.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="card p-4 flex items-center justify-between gap-4">
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <span className="text-sm text-slate-500">
          <span className="font-semibold text-slate-800">{filtered.length}</span> items
        </span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Barcode</th>
                <th className="px-5 py-3">Cost</th>
                <th className="px-5 py-3">Selling Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => {
                const isLow = p.stock_quantity <= p.min_stock_alert;
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-900">{p.name}</td>
                    <td className="px-5 py-4 text-slate-400 font-mono text-xs">{p.barcode || '—'}</td>
                    <td className="px-5 py-4 text-slate-600">₹{p.cost_price}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">₹{p.selling_price}</td>
                    <td className="px-5 py-4 font-medium text-slate-700">{p.stock_quantity} {p.unit}</td>
                    <td className="px-5 py-4">
                      {isLow ? (
                        <span className="badge-amber"><AlertTriangle className="w-3 h-3" /> Low Stock</span>
                      ) : (
                        <span className="badge-green">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input required type="text" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input-field" placeholder="e.g. Tata Tea Gold 500g" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cost Price (₹)</label>
                  <input required type="number" value={formData.cost_price}
                    onChange={e => setFormData({ ...formData, cost_price: e.target.value })}
                    className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Selling Price (₹)</label>
                  <input required type="number" value={formData.selling_price}
                    onChange={e => setFormData({ ...formData, selling_price: e.target.value })}
                    className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">MRP (₹)</label>
                  <input required type="number" value={formData.mrp}
                    onChange={e => setFormData({ ...formData, mrp: e.target.value })}
                    className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stock Qty</label>
                  <input required type="number" value={formData.stock_quantity}
                    onChange={e => setFormData({ ...formData, stock_quantity: e.target.value })}
                    className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Barcode</label>
                <input type="text" value={formData.barcode}
                  onChange={e => setFormData({ ...formData, barcode: e.target.value })}
                  className="input-field font-mono" placeholder="89012345678..." />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
