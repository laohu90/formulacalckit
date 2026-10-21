import { SupportedLang, resolveInitialLanguage } from './i18n/translations';
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
  const [langState, setLangState] = useState<{ currentLang: SupportedLang; isAuto: boolean }>(() => {
    const init = resolveInitialLanguage();
    return { currentLang: init.lang, isAuto: init.isAuto };
  });
  const lang = (langState.currentLang === 'zh' ? 'zh' : 'en') as 'en' | 'zh';
  const isAuto = langState.isAuto;
  const setLang = (newLang: 'en' | 'zh') => {
    setLangState({ currentLang: newLang, isAuto: false });
    try {
      localStorage.setItem('fck_user_chosen_lang_v3', newLang);
      localStorage.removeItem('fck_lang');
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url.toString());
  };

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
        {/* Unified Hero & Search Command Suite */}
        <section className="relative rounded-3xl bg-gradient-to-b from-blue-50/70 via-slate-50/30 to-white border border-slate-200/80 px-4 sm:px-8 pt-8 pb-7 shadow-xs overflow-hidden">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Hero Header & Title */}
          <Hero lang={lang} />

          {/* Intelligent Bilingual Instant Search Bar */}
          <SearchBar
            lang={lang}
            tools={INITIAL_TOOLS}
            onOpenQuickSolver={handleOpenQuickSolver}
            onSearchChange={setSearchQuery}
            currentQuery={searchQuery}
          />

          {/* Clean Quality Guarantees / Platform Highlights Bar */}
          <div className="mt-6 pt-5 border-t border-slate-200/70 max-w-2xl mx-auto flex items-center justify-center gap-4 sm:gap-8 text-[11px] font-medium text-slate-500 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{lang === 'en' ? '100% Client-Side Computing' : '100% 浏览器本地运算 · 零隐私追踪'}</span>
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>{lang === 'en' ? 'Exact Radical & Step Solutions' : '最简二次根式化简与分步解答'}</span>
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>{lang === 'en' ? 'High-Precision Math Engine' : '双向中英文 · 高精度科学算法'}</span>
            </span>
          </div>
        </section>

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
