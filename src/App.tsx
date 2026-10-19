import React, { useState, useEffect } from 'react';
import { INITIAL_TOOLS } from './data/tools';
import { QuickSolverId } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { DnsInspector } from './components/DnsInspector';
import { ToolGrid } from './components/ToolGrid';
import { FormulaCheatSheet } from './components/FormulaCheatSheet';
import { QuickSolversModal } from './components/QuickSolversModal';
import { Footer } from './components/Footer';

export function App() {
  // Intelligent language detection: URL query param -> LocalStorage -> Browser locale -> fallback 'zh'
  const [lang, setLang] = useState<'en' | 'zh'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'zh' || urlLang === 'en') return urlLang;

      const saved = localStorage.getItem('fck_lang');
      if (saved === 'zh' || saved === 'en') return saved;

      // Detect browser language
      if (typeof navigator !== 'undefined' && navigator.language) {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('zh')) return 'zh';
        if (browserLang.startsWith('en')) return 'en';
      }
    }
    return 'zh';
  });

  // Global search query synchronized between SearchBar and ToolGrid
  const [searchQuery, setSearchQuery] = useState('');

  // Quick solver modal state
  const [activeSolver, setActiveSolver] = useState<{
    id: QuickSolverId | null;
    subdomainUrl?: string;
  }>({ id: null });

  // Discovered subdomains from Cloudflare DNS
  const [discoveredSubdomains, setDiscoveredSubdomains] = useState<string[]>([
    'pythagorean-calculator.formulacalckit.com',
    'quadratic.formulacalckit.com',
    'mathbridge.formulacalckit.com',
  ]);

  // Synchronize document attributes, titles, and SEO meta descriptions on language switch
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    if (lang === 'zh') {
      document.title = 'FormulaCalcKit - 科学公式计算工具箱 | 在线数学物理工程求解器';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          '简洁高效的科学与数学公式计算工具箱。提供勾股定理、一元二次方程、圆与球体、三角函数、欧姆定律、复利与LaTeX公式排版等在线计算工具。'
        );
      }
    } else {
      document.title = 'FormulaCalcKit - Precision Formula Solvers & Scientific Tools Hub';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'FormulaCalcKit provides high-precision instant formula calculators for geometry, algebra, trigonometry, physics, finance, and LaTeX typography.'
        );
      }
    }
  }, [lang]);

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
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 w-full">
        {/* Hero Section */}
        <Hero lang={lang} />

        {/* Intelligent Bilingual Instant Search Bar */}
        <SearchBar
          lang={lang}
          tools={INITIAL_TOOLS}
          onOpenQuickSolver={handleOpenQuickSolver}
          onSearchChange={setSearchQuery}
          currentQuery={searchQuery}
        />

        {/* Featured Online Tools (Synchronized from Cloudflare Worker) */}
        <DnsInspector
          lang={lang}
          onSyncSubdomains={handleSyncSubdomains}
          onOpenQuickSolver={handleOpenQuickSolver}
        />

        {/* Comprehensive Formula Calculators Directory (Synced with Search) */}
        <ToolGrid
          tools={INITIAL_TOOLS}
          lang={lang}
          onOpenQuickSolver={handleOpenQuickSolver}
          discoveredSubdomains={discoveredSubdomains}
          externalSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Structured Formula Cheat Sheet & Reference (SEO Content Depth) */}
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
