import React, { useState, useEffect } from 'react';
import { Package, Plus, AlertTriangle, Search, Filter } from 'lucide-react';
import { martApi } from '../services/api';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    cost_price: '',
    selling_price: '',
    mrp: '',
    stock_quantity: '',
    min_stock_alert: 5,
    unit: 'pcs',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await martApi.getProducts();
      setProducts(res.data);
    } catch (e) {
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
    } catch (e) {
      setProducts([...products, { ...formData, id: Date.now().toString() }]);
    }
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-400" />
            <span>Inventory & Stock Management</span>
          </h2>
          <p className="text-sm text-slate-400">Track stock levels, set low-stock thresholds, and update pricing.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="glass-button flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-cyber-border rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Total Items: <span className="text-white font-bold">{products.length}</span>
        </div>
      </div>

      {/* Product Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-cyber-border">
              <tr>
                <th className="px-6 py-3.5">Product Name</th>
                <th className="px-6 py-3.5">Barcode</th>
                <th className="px-6 py-3.5">Cost Price</th>
                <th className="px-6 py-3.5">Selling Price</th>
                <th className="px-6 py-3.5">Stock Level</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/60">
              {products
                .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
                .map((p) => {
                  const isLow = p.stock_quantity <= p.min_stock_alert;
                  return (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{p.name}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.barcode || '—'}</td>
                      <td className="px-6 py-4">₹{p.cost_price}</td>
                      <td className="px-6 py-4 text-emerald-400 font-semibold">₹{p.selling_price}</td>
                      <td className="px-6 py-4 font-bold">{p.stock_quantity} {p.unit}</td>
                      <td className="px-6 py-4">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Low Stock
                          </span>
                        ) : (
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-cyber-border p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Add New Product to Inventory</h3>
            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-cyber-border rounded-lg p-2 text-white"
                  placeholder="e.g. Tata Tea Gold 500g"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cost Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.cost_price}
                    onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                    className="w-full bg-slate-800 border border-cyber-border rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.selling_price}
                    onChange={(e) => setFormData({ ...formData, selling_price: e.target.value })}
                    className="w-full bg-slate-800 border border-cyber-border rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    className="w-full bg-slate-800 border border-cyber-border rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    className="w-full bg-slate-800 border border-cyber-border rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Barcode</label>
                <input
                  type="text"
                  value={formData.barcode}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  className="w-full bg-slate-800 border border-cyber-border rounded-lg p-2 text-white font-mono"
                  placeholder="89012345678..."
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
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
