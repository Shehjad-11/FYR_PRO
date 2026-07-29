import React from 'react';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export default function LandingBlog() {
  const posts = [
    {
      title: 'How Kirana Stores Are Outperforming Supermarkets Using AI',
      category: 'Kirana Digitisation',
      date: 'July 24, 2026',
      readTime: '4 min read',
      snippet: 'Learn how neighborhood grocery stores in India are utilizing voice billing and automated Udhar credit tracking to boost customer retention by 35%.'
    },
    {
      title: 'Mastering Stock Management & Eliminating Expiry Losses',
      category: 'Inventory Tips',
      date: 'July 18, 2026',
      readTime: '6 min read',
      snippet: 'A comprehensive guide for Indian retail store managers on setting minimum stock alerts and leveraging Prophet AI time-series demand forecasting.'
    },
    {
      title: 'Digitising Khata Accounts: Reducing Defaulted Udhar Payments',
      category: 'Retail Finance',
      date: 'July 12, 2026',
      readTime: '5 min read',
      snippet: 'Discover how digitised customer Udhar balances with automated payment tracking help Kirana owners collect pending debts 2x faster.'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <section className="bg-gradient-to-b from-blue-50/60 to-white pt-12 pb-8 text-center space-y-3">
        <div className="max-w-3xl mx-auto px-4">
          <span className="badge-blue text-xs font-bold uppercase">Knowledge Hub</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">Indian Retail Growth & AI Insights</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Guides, case studies, and practical business strategies for small retail store owners.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="badge-blue text-[10px] font-bold">{post.category}</span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{post.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{post.snippet}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-6">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                <span className="font-semibold text-blue-600 flex items-center gap-1 cursor-pointer hover:underline">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
