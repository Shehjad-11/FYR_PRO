import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPricing({ onOpenLogin }) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      desc: 'Ideal for small neighborhood Kirana stores',
      priceMonthly: 999,
      priceYearly: 799,
      badge: 'Popular for Kiranas',
      features: [
        '1 Store Location',
        'High-Speed POS Billing',
        'Basic Inventory Tracking',
        'Customer Udhar Khata CRM',
        'Voice Billing (100 calls/mo)',
        'Email Support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Retailer',
      desc: 'For growing supermarkets & retail outlets',
      priceMonthly: 2499,
      priceYearly: 1999,
      popular: true,
      badge: 'Best Value',
      features: [
        'Up to 3 Store Locations',
        'Prophet AI Demand Forecasting',
        'YOLO Visual Product Scan',
        'Unlimited Voice POS Billing',
        'Advanced Sales & Financial Reports',
        'CSV Data Export',
        'Priority Phone Support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Supermarket',
      desc: 'For retail chains & wholesale distributors',
      priceMonthly: 4999,
      priceYearly: 3999,
      badge: 'Unlimited Power',
      features: [
        'Unlimited Store Locations',
        'Custom AI Model Fine-tuning',
        'Mistral 7B RAG Assistant',
        'Dedicated Account Manager',
        '24/7 SLA Uptime Guarantee',
        'Custom ERP & Tally Integration'
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white pt-12 pb-8 text-center space-y-4">
        <div className="max-w-3xl mx-auto px-4">
          <span className="badge-blue text-xs font-bold uppercase">Simple & Transparent Pricing</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">Invest in AI. Multiply Store Profits.</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
            No hidden charges. Choose a plan tailored to your retail store size and upgrade anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'yearly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              Yearly Billing (Save 20%)
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-8 border transition-all relative flex flex-col justify-between ${
                  plan.popular
                    ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/20'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-full shadow-md">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{plan.desc}</p>

                  <div className="my-6">
                    <span className="text-4xl font-extrabold text-slate-900">₹{price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 font-medium"> / month</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="text-xs font-semibold text-slate-700 flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenLogin}
                  className={`w-full py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
