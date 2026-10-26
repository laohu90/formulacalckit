import React from 'react';
import { Languages, Menu, X, Scale, BookOpen, Layers } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'zh';
  currentPath?: string;
  onToggleLang: () => void;
  onScrollToSection: (id: string) => void;
  onNavigate?: (path: string, solverId?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  currentPath = '/',
  onToggleLang,
  onScrollToSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNav = (targetPath: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      if (currentPath !== targetPath) {
        onNavigate(targetPath);
        if (sectionId && targetPath === '/') {
          setTimeout(() => onScrollToSection(sectionId), 80);
        }
        return;
      }
    }
    if (sectionId) {
      onScrollToSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('/');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-2xs group-hover:bg-blue-700 transition-colors">
            <span className="font-mono font-bold text-base leading-none">∑</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
              FormulaCalcKit
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              ISO/IEC 80000 STEM Studio
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNav('/', 'workstation')}
            className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPath === '/' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            {lang === 'en' ? 'Workstation' : '计算工作台'}
          </button>
          <button
            onClick={() => handleNav('/standards')}
            className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1 ${
              currentPath === '/standards' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-indigo-500" />
            <span>{lang === 'en' ? 'Standards' : '计量标准'}</span>
          </button>
          <button
            onClick={() => handleNav('/', 'server-tools')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? '16 Solvers Directory' : '16款标准求解器'}
          </button>
          <button
            onClick={() => handleNav('/', 'cheat-sheet')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? 'Cheat Sheet' : '公式手册'}
          </button>
          <button
            onClick={() => handleNav('/about')}
            className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1 ${
              currentPath === '/about' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>{lang === 'en' ? 'About & Board' : '编委与引用'}</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Language Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title={lang === 'en' ? 'Switch to Chinese (简体中文)' : 'Switch to English'}
          >
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'en' ? '中文' : 'EN'}</span>
          </button>

          <button
            onClick={() => handleNav('/', 'workstation')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? 'Launch Solvers' : '即时求解'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2 text-sm font-medium">
          <button
            onClick={() => handleNav('/', 'workstation')}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {lang === 'en' ? 'Workstation' : '计算工作台'}
          </button>
          <button
            onClick={() => handleNav('/standards')}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {lang === 'en' ? 'Metrology Standards Matrix' : '国际计量规范与标准溯源'}
          </button>
          <button
            onClick={() => handleNav('/', 'server-tools')}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {lang === 'en' ? '16 Standard Solvers Directory' : '16款标准求解器目录'}
          </button>
          <button
            onClick={() => handleNav('/', 'cheat-sheet')}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {lang === 'en' ? 'Formula Reference Cheat Sheet' : '公式速查手册'}
          </button>
          <button
            onClick={() => handleNav('/about')}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {lang === 'en' ? 'About Platform & Editorial Board' : '关于平台与学术编审委员会'}
          </button>
          <button
            onClick={() => handleNav('/contact')}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600 cursor-pointer"
          >
            {lang === 'en' ? 'Contact & Errata Submission' : '学术勘误与联系编委'}
          </button>
        </div>
      )}
    </header>
  );
};
