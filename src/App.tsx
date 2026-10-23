import React, { useState, useEffect } from 'react';
import { SupportedLang, resolveInitialLanguage } from './i18n/translations';
import { INITIAL_TOOLS } from './data/tools';
import { QuickSolverId } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Workstation } from './components/Workstation';
import { CloudflareToolGrid } from './components/CloudflareToolGrid';
import { ServerToolGrid } from './components/ServerToolGrid';
import { FormulaCheatSheet } from './components/FormulaCheatSheet';
import { Footer } from './components/Footer';

export function App() {
  // Intelligent bilingual language state
  const [langState, setLangState] = useState<{ currentLang: SupportedLang; isAuto: boolean }>(() => {
    const init = resolveInitialLanguage();
    return { currentLang: init.lang, isAuto: init.isAuto };
  });

  const lang = (langState.currentLang === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

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

  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'zh' : 'en';
    setLang(nextLang);
  };

  // Active workstation solver tab
  const [activeSolverId, setActiveSolverId] = useState<QuickSolverId>('pythagorean');

  // Search queries for each section
  const [serverSearchQuery, setServerSearchQuery] = useState('');

  // Synchronize document attributes and SEO metadata on language switch
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    if (lang === 'zh') {
      document.title = 'FormulaCalcKit - 科学公式计算工作台 | 在线数学物理工程求解器';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          '简洁高效的科学与数学公式计算工作台。提供勾股定理、一元二次方程、圆与球体、三角函数、欧姆定律、复利与LaTeX公式排版等在线计算工具。'
        );
      }
    } else {
      document.title = 'FormulaCalcKit - Precision Formula Solvers & Scientific Problem-Solving Studio';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'FormulaCalcKit provides high-precision instant formula calculators for geometry, quadratic algebra, trigonometry, physics, and LaTeX typography.'
        );
      }
    }
  }, [lang]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1-Row 3-Zone Top Navigation Bar */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 w-full">
        {/* Clean, authoritative Hero highlighting Formula Problem Solving */}
        <Hero lang={lang} onSelectSolver={setActiveSolverId} />

        {/* Flagship Centerpiece: The Interactive Formula Workstation */}
        <Workstation
          lang={lang}
          activeSolverId={activeSolverId}
          onSelectSolver={setActiveSolverId}
        />

        {/* Data Source 1: Cloudflare Edge Verified Subsites */}
        <CloudflareToolGrid
          lang={lang}
          onSelectSolver={setActiveSolverId}
        />

        {/* Data Source 2: Server-Hosted Formula Calculators Directory */}
        <ServerToolGrid
          initialTools={INITIAL_TOOLS}
          lang={lang}
          onSelectSolver={setActiveSolverId}
          searchQuery={serverSearchQuery}
          onSearchChange={setServerSearchQuery}
        />

        {/* Comprehensive Formula Reference & Mathematical Cheat Sheet */}
        <FormulaCheatSheet lang={lang} onSelectSolver={setActiveSolverId} />
      </main>

      {/* Production-Grade Footer with Legal and Nav Links */}
      <Footer lang={lang} onScrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
