import React, { useState } from 'react';
import LandingNavbar from '../../components/website/LandingNavbar';
import LandingFooter from '../../components/website/LandingFooter';
import LandingHome from './LandingHome';
import LandingAbout from './LandingAbout';
import LandingSolutions from './LandingSolutions';
import LandingPricing from './LandingPricing';
import LandingAIShowcase from './LandingAIShowcase';
import LandingDownload from './LandingDownload';
import LandingBlog from './LandingBlog';
import LandingContact from './LandingContact';

export default function MainWebsite({ onOpenApp }) {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <LandingNavbar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        onOpenLogin={onOpenApp} 
      />

      <main className="flex-1">
        {activeNav === 'home' && <LandingHome setActiveNav={setActiveNav} onOpenLogin={onOpenApp} />}
        {activeNav === 'about' && <LandingAbout onOpenLogin={onOpenApp} />}
        {activeNav === 'solutions' && <LandingSolutions onOpenLogin={onOpenApp} />}
        {activeNav === 'pricing' && <LandingPricing onOpenLogin={onOpenApp} />}
        {activeNav === 'ai-showcase' && <LandingAIShowcase onOpenLogin={onOpenApp} />}
        {activeNav === 'download' && <LandingDownload onOpenLogin={onOpenApp} />}
        {activeNav === 'blog' && <LandingBlog />}
        {activeNav === 'contact' && <LandingContact />}
      </main>

      <LandingFooter setActiveNav={setActiveNav} onOpenLogin={onOpenApp} />
    </div>
  );
}
