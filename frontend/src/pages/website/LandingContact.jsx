import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function LandingContact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', store_type: 'Kirana Store', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      <section className="bg-gradient-to-b from-blue-50/60 to-white pt-12 pb-8 text-center space-y-3">
        <div className="max-w-3xl mx-auto px-4">
          <span className="badge-blue text-xs font-bold uppercase">Get In Touch</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">Connect with Our Retail AI Specialists</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Schedule a personalized live demo or inquire about enterprise supermarket deployments.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Request Store Demo & Call</h3>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Demo Request Submitted!</h4>
                <p className="text-xs text-emerald-700">Our retail solution engineer will call you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder="e.g. Rajesh Kumar" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="input-field" placeholder="9876543210" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Store / Business Type</label>
                  <select value={formData.store_type} onChange={e => setFormData({ ...formData, store_type: e.target.value })} className="input-field">
                    <option value="Kirana Store">Kirana / Neighborhood Grocery</option>
                    <option value="Supermarket">Supermarket</option>
                    <option value="Wholesale">Wholesale Distributor</option>
                    <option value="Retail Chain">Retail Chain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Requirements</label>
                  <textarea rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="input-field" placeholder="Tell us about your store..." />
                </div>
                <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-xs font-bold">
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Direct Sales Helpline</h4>
                <p className="text-xs text-slate-500 mt-0.5">Mon–Sat, 9:00 AM – 8:00 PM IST</p>
                <p className="text-sm font-bold text-blue-600 mt-1">+91 98765 43210</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
                <p className="text-xs text-slate-500 mt-0.5">24/7 Response for active merchants</p>
                <p className="text-sm font-bold text-emerald-600 mt-1">support@storemind.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Headquarters</h4>
                <p className="text-xs text-slate-500 mt-0.5">StoreMind Technologies India Pvt Ltd</p>
                <p className="text-xs text-slate-700 mt-1 font-medium">Koramangala Tech Hub, Bengaluru 560034, India</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
