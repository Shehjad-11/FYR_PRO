import React, { useState, useEffect } from 'react';
import { Barcode, Mic, Plus, Trash2, CheckCircle2, Search, Printer, Sparkles } from 'lucide-react';
import { martApi, aiApi } from '../services/api';

export default function Billing() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [voiceText, setVoiceText] = useState('');
  const [parsingVoice, setParsingVoice] = useState(false);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [discount, setDiscount] = useState(0);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await martApi.getProducts();
      setProducts(res.data);
    } catch {
      setProducts([
        { id: '1', name: 'Fortune Rice 5kg', selling_price: 340, barcode: '8901234567890', stock_quantity: 45, unit: 'pkt' },
        { id: '2', name: 'Amul Butter 500g', selling_price: 275, barcode: '8901234567891', stock_quantity: 20, unit: 'pkt' },
        { id: '3', name: 'Tata Salt 1kg', selling_price: 28, barcode: '8901234567892', stock_quantity: 100, unit: 'pkt' },
        { id: '4', name: 'Aashirvaad Atta 10kg', selling_price: 460, barcode: '8901234567893', stock_quantity: 15, unit: 'pkt' },
        { id: '5', name: 'Cadbury Dairy Milk 50g', selling_price: 50, barcode: '8901234567894', stock_quantity: 80, unit: 'pcs' },
      ]);
    }
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  };

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    const matched = products.find(p => p.barcode === barcodeInput || p.id === barcodeInput);
    if (matched) { addToCart(matched, 1); setBarcodeInput(''); }
    else alert('Product not found for this barcode.');
  };

  const handleVoiceCommand = async () => {
    if (!voiceText.trim()) return;
    setParsingVoice(true);
    try {
      const res = await aiApi.parseVoice(voiceText);
      const items = res.data.items || [];
      items.forEach(parsed => {
        const match = products.find(p => p.id === parsed.matched_product_id);
        if (match) addToCart(match, parsed.quantity);
      });
      if (items.length === 0) alert('Could not match product. Try: "Add 2 Fortune Rice"');
    } catch {
      const matched = products.find(p => p.name.toLowerCase().includes(voiceText.toLowerCase()));
      if (matched) addToCart(matched, 1);
    } finally {
      setParsingVoice(false);
      setVoiceText('');
    }
  };

  const subtotal = cart.reduce((acc, i) => acc + i.selling_price * i.quantity, 0);
  const gstTax = Math.round(subtotal * 0.05);
  const totalPayable = Math.max(0, subtotal + gstTax - Number(discount));

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      const res = await martApi.createBill({ items: cart.map(c => ({ product_id: c.id, quantity: c.quantity })), payment_mode: paymentMode, discount_amount: Number(discount) });
      setReceipt(res.data);
    } catch {
      setReceipt({ invoice_number: `INV-${Date.now().toString().slice(-6)}`, created_at: new Date().toISOString(), items: cart, subtotal, tax_amount: gstTax, discount_amount: Number(discount), total_amount: totalPayable, payment_mode: paymentMode });
    }
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[calc(100vh-5rem)]">
      {/* Left — Product Catalog */}
      <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
        {/* Search + Barcode */}
        <div className="card p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input type="text" placeholder="Search products..." value={search}
                onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
            </div>
            <form onSubmit={handleBarcodeSubmit} className="relative sm:w-56 flex">
              <Barcode className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input type="text" placeholder="Scan barcode..." value={barcodeInput}
                onChange={e => setBarcodeInput(e.target.value)} className="input-field pl-9" />
            </form>
          </div>
          {/* Voice bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Mic className="w-4 h-4" /></div>
            <input type="text" placeholder="Voice AI: e.g. 'Add 2 Fortune Rice and 3 Tata Salt'" value={voiceText}
              onChange={e => setVoiceText(e.target.value)} className="input-field flex-1 text-xs" />
            <button onClick={handleVoiceCommand} disabled={parsingVoice}
              className="btn-primary text-xs px-3 py-2 flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" />
              {parsingVoice ? 'Parsing...' : 'Add by Voice'}
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="card p-4 flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
            <div key={p.id} onClick={() => addToCart(p, 1)}
              className="border border-slate-200 hover:border-blue-400 bg-white p-3 rounded-xl cursor-pointer hover:shadow-md transition-all">
              <div className="font-semibold text-sm text-slate-800 line-clamp-1 mb-1">{p.name}</div>
              <div className="text-xs text-slate-400 font-mono mb-2">BC: {p.barcode || 'N/A'}</div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600 text-sm">₹{p.selling_price}</span>
                <span className="text-xs text-slate-400">Qty: {p.stock_quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Cart */}
      <div className="card p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="font-bold text-slate-900">Current Order</h3>
            <span className="badge-blue">{cart.length} items</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {cart.length === 0 ? (
              <p className="text-center text-sm text-slate-400 py-8">
                Cart is empty. Click products or scan a barcode.
              </p>
            ) : cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                <div className="flex-1 pr-2 min-w-0">
                  <div className="text-xs font-semibold text-slate-800 line-clamp-1">{item.name}</div>
                  <div className="text-xs text-slate-400">₹{item.selling_price} × {item.quantity}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs font-bold">-</button>
                  <span className="text-xs font-bold w-4 text-center text-slate-900">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs font-bold">+</button>
                  <span className="text-xs font-bold text-blue-600 pl-1">₹{item.selling_price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-3 pt-3 border-t border-slate-100 mt-3">
          <div className="space-y-1.5 text-sm text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-slate-900">₹{subtotal}</span></div>
            <div className="flex justify-between"><span>GST (5%)</span><span className="font-medium text-slate-900">₹{gstTax}</span></div>
            <div className="flex justify-between items-center">
              <span>Discount (₹)</span>
              <input type="number" value={discount} min={0}
                onChange={e => setDiscount(e.target.value)}
                className="w-20 input-field text-right text-sm py-1" />
            </div>
          </div>
          <div className="flex justify-between items-center font-bold text-base text-slate-900 pt-2 border-t border-slate-100">
            <span>Total Payable</span>
            <span className="text-blue-600">₹{totalPayable}</span>
          </div>
          {/* Payment modes */}
          <div className="grid grid-cols-4 gap-1.5">
            {['Cash', 'UPI', 'Card', 'Udhar'].map(mode => (
              <button key={mode} onClick={() => setPaymentMode(mode)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  paymentMode === mode
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}>
                {mode}
              </button>
            ))}
          </div>
          <button onClick={handleCheckout} disabled={cart.length === 0}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Complete & Print Bill
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      {receipt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="font-bold text-lg text-slate-900">RECEIPT</div>
              <div className="text-xs text-slate-500">Invoice: {receipt.invoice_number}</div>
              <div className="text-xs text-slate-400">{new Date(receipt.created_at).toLocaleString()}</div>
            </div>
            <div className="border-t border-b border-dashed border-slate-200 py-3 space-y-2 max-h-40 overflow-y-auto mb-3">
              {receipt.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-slate-700">
                  <span>{item.name || item.product_name} × {item.quantity}</span>
                  <span className="font-mono">₹{(item.selling_price || item.unit_price) * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1 text-sm text-slate-600 mb-4">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{receipt.subtotal}</span></div>
              <div className="flex justify-between"><span>GST (5%)</span><span>₹{receipt.tax_amount}</span></div>
              <div className="flex justify-between font-bold text-slate-900 text-base border-t border-slate-100 pt-1">
                <span>TOTAL</span><span className="text-blue-600">₹{receipt.total_amount}</span>
              </div>
            </div>
            <button onClick={() => setReceipt(null)}
              className="btn-primary w-full flex items-center justify-center gap-2">
              <Printer className="w-4 h-4" /> Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
