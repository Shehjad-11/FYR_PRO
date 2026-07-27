import React, { useState, useEffect } from 'react';
import { 
  Barcode, 
  Mic, 
  Plus, 
  Trash2, 
  IndianRupee, 
  CheckCircle2, 
  Search, 
  Printer, 
  Sparkles 
} from 'lucide-react';
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

  // Initial products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await martApi.getProducts();
      setProducts(res.data);
    } catch (e) {
      console.log('Using sample billing catalog');
      setProducts([
        { id: '1', name: 'Fortune Rice 5kg', selling_price: 340, barcode: '8901234567890', stock_quantity: 45, unit: 'pkt' },
        { id: '2', name: 'Amul Butter 500g', selling_price: 275, barcode: '8901234567891', stock_quantity: 20, unit: 'pkt' },
        { id: '3', name: 'Tata Salt 1kg', selling_price: 28, barcode: '8901234567892', stock_quantity: 100, unit: 'pkt' },
        { id: '4', name: 'Aashirvaad Atta 10kg', selling_price: 460, barcode: '8901234567893', stock_quantity: 15, unit: 'pkt' },
        { id: '5', name: 'Cadbury Dairy Milk 50g', selling_price: 50, barcode: '8901234567894', stock_quantity: 80, unit: 'pcs' },
      ]);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    const matched = products.find((p) => p.barcode === barcodeInput || p.id === barcodeInput);
    if (matched) {
      addToCart(matched, 1);
      setBarcodeInput('');
    } else {
      alert('Barcode not found in catalog');
    }
  };

  const handleVoiceCommand = async () => {
    if (!voiceText) return;
    setParsingVoice(true);
    try {
      const res = await aiApi.parseVoice(voiceText);
      const items = res.data.items || [];
      if (items.length > 0) {
        items.forEach((parsed) => {
          const match = products.find((p) => p.id === parsed.matched_product_id) || products[0];
          if (match) addToCart(match, parsed.quantity);
        });
      } else {
        alert('Could not match product from speech. Try: "Add 2 Fortune Rice"');
      }
    } catch (e) {
      // Fallback local match
      const matched = products.find((p) => p.name.toLowerCase().includes(voiceText.toLowerCase()));
      if (matched) addToCart(matched, 1);
    } finally {
      setParsingVoice(false);
      setVoiceText('');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.selling_price * item.quantity, 0);
  const gstTax = Math.round(subtotal * 0.05);
  const totalPayable = Math.max(0, subtotal + gstTax - discount);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      const billData = {
        items: cart.map((c) => ({ product_id: c.id, quantity: c.quantity })),
        payment_mode: paymentMode,
        discount_amount: Number(discount),
      };
      const res = await martApi.createBill(billData);
      setReceipt(res.data);
    } catch (e) {
      // Demo receipt fallback
      setReceipt({
        invoice_number: `INV-${Date.now().toString().slice(-6)}`,
        created_at: new Date().toISOString(),
        items: cart,
        subtotal,
        tax_amount: gstTax,
        discount_amount: discount,
        total_amount: totalPayable,
        payment_mode: paymentMode,
      });
    }
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-6rem)]">
      {/* Product Catalog Column */}
      <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
        {/* Search & Barcode Header */}
        <div className="glass-panel p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-cyber-border rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <form onSubmit={handleBarcodeSubmit} className="relative sm:w-64 flex">
              <Barcode className="w-5 h-5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Scan Barcode..."
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                className="w-full bg-slate-900 border border-cyber-border rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </form>
          </div>

          {/* Voice Billing Bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-cyber-border/60">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Mic className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Voice Billing AI: Type or speak e.g., 'Add 2 Fortune Rice'"
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
              className="flex-1 bg-slate-900/60 border border-indigo-500/30 rounded-xl px-3 py-1.5 text-xs text-indigo-200 focus:outline-none"
            />
            <button
              onClick={handleVoiceCommand}
              disabled={parsingVoice}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{parsingVoice ? 'Parsing...' : 'Add by Voice'}</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="glass-panel p-4 flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          {products
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p, 1)}
                className="bg-slate-900/80 border border-cyber-border hover:border-indigo-500 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between"
              >
                <div>
                  <div className="font-semibold text-sm text-white line-clamp-1">{p.name}</div>
                  <div className="text-xs text-slate-400 font-mono">BC: {p.barcode || 'N/A'}</div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800">
                  <div className="font-bold text-cyan-400 text-sm">₹{p.selling_price}</div>
                  <span className="text-[10px] text-slate-400">Stock: {p.stock_quantity}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Cart & Billing Receipt Column */}
      <div className="glass-panel p-5 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-cyber-border">
            <h3 className="font-bold text-lg text-white">Current Order Cart</h3>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full font-medium">
              {cart.length} Items
            </span>
          </div>

          {/* Cart items list */}
          <div className="space-y-3 py-4 max-h-64 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                Cart is empty. Click products or scan barcode to add items.
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex-1 pr-2">
                    <div className="text-xs font-semibold text-white line-clamp-1">{item.name}</div>
                    <div className="text-[11px] text-slate-400">₹{item.selling_price} × {item.quantity}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 flex items-center justify-center font-bold text-xs">-</button>
                    <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 flex items-center justify-center font-bold text-xs">+</button>
                    <div className="text-xs font-bold text-cyan-400 pl-2">₹{item.selling_price * item.quantity}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Total Calculations */}
        <div className="space-y-3 pt-3 border-t border-cyber-border">
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-200">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="text-slate-200">₹{gstTax}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Discount</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-20 bg-slate-900 border border-cyber-border rounded px-2 py-0.5 text-right text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-bold text-white pt-2 border-t border-slate-800">
            <span>Total Payable</span>
            <span className="text-emerald-400">₹{totalPayable}</span>
          </div>

          {/* Payment Modes */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {['Cash', 'UPI', 'Card', 'Udhar'].map((mode) => (
              <button
                key={mode}
                onClick={() => setPaymentMode(mode)}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  paymentMode === mode
                    ? 'bg-indigo-600 border-indigo-400 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full glass-button py-3 rounded-xl font-bold flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Complete Order & Print Bill</span>
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      {receipt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-cyber-border p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="text-center space-y-1">
              <div className="font-bold text-lg text-white">SAYYAD SUPERMARKET</div>
              <div className="text-xs text-slate-400">Invoice: {receipt.invoice_number}</div>
              <div className="text-[10px] text-slate-500">{new Date(receipt.created_at).toLocaleString()}</div>
            </div>

            <div className="border-t border-b border-dashed border-slate-700 py-3 space-y-2 max-h-48 overflow-y-auto">
              {receipt.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-slate-300">
                  <span>{item.name || item.product_name} × {item.quantity}</span>
                  <span className="font-mono">₹{(item.selling_price || item.unit_price) * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{receipt.subtotal}</span></div>
              <div className="flex justify-between"><span>GST:</span><span>₹{receipt.tax_amount}</span></div>
              <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-slate-800">
                <span>TOTAL:</span><span className="text-emerald-400">₹{receipt.total_amount}</span>
              </div>
            </div>

            <button
              onClick={() => setReceipt(null)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>Done & Close Receipt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
