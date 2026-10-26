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

// Pages
import { AboutPage } from './pages/AboutPage';
import { StandardsPage } from './pages/StandardsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

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

  // Client-side router state derived from window.location.pathname
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.replace(/\/+$/, '') || '/';
      return p;
    }
    return '/';
  });

  // Active workstation solver tab
  const [activeSolverId, setActiveSolverId] = useState<QuickSolverId>('pythagorean');

  // Search queries for server section
  const [serverSearchQuery, setServerSearchQuery] = useState('');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.replace(/\/+$/, '') || '/';
      setCurrentPath(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Universal navigation handler for SPA links
  const handleNavigate = (path: string, solverId?: QuickSolverId) => {
    const cleanPath = path.replace(/\/+$/, '') || '/';
    if (solverId) {
      setActiveSolverId(solverId);
    }

    if (cleanPath !== currentPath) {
      window.history.pushState({}, '', cleanPath);
      setCurrentPath(cleanPath);
    }

    if (cleanPath === '/' && solverId) {
      setTimeout(() => {
        const el = document.getElementById('workstation');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if (currentPath !== '/') {
      handleNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Synchronize document attributes, SEO title, description, and canonical link
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    let pageTitle = '';
    let pageDesc = '';
    let is404 = false;

    switch (currentPath) {
      case '/':
        pageTitle =
          lang === 'zh'
            ? 'FormulaCalcKit - 科学公式计算工作台 | 在线数学物理工程求解器'
            : 'FormulaCalcKit - Precision Formula Solvers & Scientific Problem-Solving Studio';
        pageDesc =
          lang === 'zh'
            ? '简洁高效的科学与数学公式计算工作台。提供勾股定理、一元二次方程、圆与球体、三角函数、欧姆定律、复利与LaTeX公式排版等16款在线计算工具。'
            : 'FormulaCalcKit provides 16 high-precision instant formula calculators for geometry, quadratic algebra, trigonometry, physics, and LaTeX typography.';
        break;

      case '/about':
        pageTitle =
          lang === 'zh'
            ? '关于平台与学术编审委员会 | FormulaCalcKit'
            : 'About Platform & Editorial Board | FormulaCalcKit';
        pageDesc =
          lang === 'zh'
            ? 'FormulaCalcKit 学术编审委员会、计算数学专家组、国际标准执行规范（ISO/IEC 80000、NIST SP 811）与学术论文引用格式。'
            : 'Learn about FormulaCalcKit metrology working group, peer-review methodology, ISO/IEC 80000 compliance, and BibTeX citations.';
        break;

      case '/standards':
        pageTitle =
          lang === 'zh'
            ? '国际计量规范与标准溯源对照表 | FormulaCalcKit'
            : 'Metrology Standards, Physical Constants & Citation Guide | FormulaCalcKit';
        pageDesc =
          lang === 'zh'
            ? 'FormulaCalcKit 16款核心求解器与 ISO/IEC 80000、NIST SP 811 及 CODATA 国际基础物理常数对照总表与学术引用指引。'
            : 'Comprehensive standards cross-reference matrix aligning calculators with ISO/IEC 80000, NIST SP 811, and CODATA fundamental constants.';
        break;

      case '/privacy':
        pageTitle =
          lang === 'zh'
            ? '隐私保护政策与零数据采集规范 | FormulaCalcKit'
            : 'Privacy Policy & Zero Data Collection Notice | FormulaCalcKit';
        pageDesc =
          lang === 'zh'
            ? 'FormulaCalcKit 坚守 100% 浏览器本地运算，零数学输入回传，零侵入式追踪 Cookie，严格保护用户隐私。'
            : 'FormulaCalcKit operates 100% client-side with zero mathematical telemetry, no third-party tracking cookies, and full GDPR compliance.';
        break;

      case '/terms':
        pageTitle =
          lang === 'zh'
            ? '服务条款与工程计算使用边界声明 | FormulaCalcKit'
            : 'Terms of Service & Engineering Accuracy Disclaimer | FormulaCalcKit';
        pageDesc =
          lang === 'zh'
            ? 'FormulaCalcKit 免费教育与科研使用许可、算法精度保障及生命安全工程独立审签免责边界说明。'
            : 'Terms of service and engineering critical systems disclaimer for FormulaCalcKit mathematical calculators.';
        break;

      case '/contact':
        pageTitle =
          lang === 'zh'
            ? '学术勘误、算法同行审校与联系编委 | FormulaCalcKit'
            : 'Contact Editorial Working Group & Errata Reporting | FormulaCalcKit';
        pageDesc =
          lang === 'zh'
            ? '向 FormulaCalcKit 科学计量工作组提交公式推导勘误、边缘测试用例、教材大纲配套或学术合作咨询。'
            : 'Submit mathematical errata, algorithm edge cases, textbook syllabus alignment suggestions, or academic partnerships.';
        break;

      default:
        is404 = true;
        pageTitle =
          lang === 'zh'
            ? '404 - 未找到您请求的公式或页面 | FormulaCalcKit'
            : '404 - Formula or Page Not Found | FormulaCalcKit';
        pageDesc =
          lang === 'zh'
            ? '您访问的公式或计算器页面不存在。'
            : 'The requested formula or calculator page does not exist.';
        break;
    }

    document.title = pageTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc);
    }

    // Set noindex for 404 pages
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (is404) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, follow');
    } else if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow');
    }
  }, [lang, currentPath]);

  // Determine main view component to render
  const renderCurrentView = () => {
    switch (currentPath) {
      case '/':
        return (
          <>
            {/* Clean, authoritative Hero highlighting Formula Problem Solving */}
            <Hero lang={lang} onSelectSolver={setActiveSolverId} onNavigate={handleNavigate} />

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
          </>
        );

      case '/about':
        return <AboutPage lang={lang} onNavigate={handleNavigate} />;

      case '/standards':
        return <StandardsPage lang={lang} onNavigate={handleNavigate} />;

      case '/privacy':
        return <PrivacyPage lang={lang} onNavigate={handleNavigate} />;

      case '/terms':
        return <TermsPage lang={lang} onNavigate={handleNavigate} />;

      case '/contact':
        return <ContactPage lang={lang} onNavigate={handleNavigate} />;

      default:
        // Real 404 Not Found Page Component
        return <NotFoundPage lang={lang} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1-Row 3-Zone Top Navigation Bar */}
      <Header
        lang={lang}
        currentPath={currentPath}
        onToggleLang={handleToggleLang}
        onScrollToSection={scrollToSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 w-full">
        {renderCurrentView()}
      </main>

      {/* Production-Grade Footer with Legal, Standards and Nav Links */}
      <Footer
        lang={lang}
        onScrollToSection={scrollToSection}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
