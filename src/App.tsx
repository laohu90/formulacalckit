import React, { useState } from 'react';
import { INITIAL_TOOLS } from './data/tools';
import { QuickSolverId } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DnsInspector } from './components/DnsInspector';
import { ToolGrid } from './components/ToolGrid';
import { FormulaCheatSheet } from './components/FormulaCheatSheet';
import { QuickSolversModal } from './components/QuickSolversModal';
import { Footer } from './components/Footer';

export function App() {
  // Language state: 'en' default for international SEO & AdSense CPM, with intelligent toggle
  const [lang, setLang] = useState<'en' | 'zh'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'zh') return 'zh';
      if (urlLang === 'en') return 'en';
      const saved = localStorage.getItem('fck_lang');
      if (saved === 'zh' || saved === 'en') return saved;
    }
    return 'en';
  });

  // Quick solver modal state
  const [activeSolver, setActiveSolver] = useState<{
    id: QuickSolverId | null;
    subdomainUrl?: string;
  }>({ id: null });

  // Discovered subdomains from Cloudflare DNS
  const [discoveredSubdomains, setDiscoveredSubdomains] = useState<string[]>([
    'pythagorean-calculator.formulacalckit.com',
    'quadratic.formulacalckit.com',
  ]);

  // Persist language choice
  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'zh' : 'en';
    setLang(nextLang);
    localStorage.setItem('fck_lang', nextLang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', nextLang);
    window.history.replaceState({}, '', url.toString());
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuickSolver = (solverId: QuickSolverId, subdomainUrl?: string) => {
    setActiveSolver({ id: solverId, subdomainUrl });
  };

  const handleCloseQuickSolver = () => {
    setActiveSolver({ id: null });
  };

  const handleSyncSubdomains = (subdomainList: string[]) => {
    setDiscoveredSubdomains((prev) => {
      const merged = Array.from(new Set([...prev, ...subdomainList]));
      return merged;
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Top Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16 w-full">
        {/* Hero Section */}
        <Hero lang={lang} />

        {/* Featured Online Tools (Synchronized from Cloudflare Worker) */}
        <DnsInspector
          lang={lang}
          onSyncSubdomains={handleSyncSubdomains}
          onOpenQuickSolver={handleOpenQuickSolver}
        />

        {/* Comprehensive Formula Calculators Directory */}
        <ToolGrid
          tools={INITIAL_TOOLS}
          lang={lang}
          onOpenQuickSolver={handleOpenQuickSolver}
          discoveredSubdomains={discoveredSubdomains}
        />

        {/* Structured Formula Cheat Sheet & Reference (SEO Content Depth & High Value) */}
        <FormulaCheatSheet lang={lang} />
      </main>

      {/* Global Interactive Quick Solver Modal */}
      <QuickSolversModal
        solverId={activeSolver.id}
        subdomainUrl={activeSolver.subdomainUrl}
        onClose={handleCloseQuickSolver}
        lang={lang}
      />

      {/* Production Compliant Footer */}
      <Footer lang={lang} onScrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
