import React from 'react';
import { Languages, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'zh';
  onToggleLang: () => void;
  onOpenCloudSync: () => void;
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenCloudSync,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-2xs group-hover:bg-blue-700 transition-colors">
            <span className="font-mono font-bold text-base leading-none">∑</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            FormulaCalcKit
          </span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onScrollToSection('workstation')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? 'Workstation' : '计算工作台'}
          </button>
          <button
            onClick={() => onScrollToSection('directory')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? 'Tool Directory' : '工具目录'}
          </button>
          <button
            onClick={() => onScrollToSection('cheat-sheet')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? 'Formula Reference' : '公式速查手册'}
          </button>
          <button
            onClick={onOpenCloudSync}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <span>{lang === 'en' ? 'Cloud Edge' : '云端子站'}</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action & language toggle */}
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
            onClick={() => onScrollToSection('workstation')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? 'Instant Solver' : '即时求解'}
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
            onClick={() => {
              onScrollToSection('workstation');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600"
          >
            {lang === 'en' ? 'Workstation' : '计算工作台'}
          </button>
          <button
            onClick={() => {
              onScrollToSection('directory');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600"
          >
            {lang === 'en' ? 'Tool Directory' : '工具目录'}
          </button>
          <button
            onClick={() => {
              onScrollToSection('cheat-sheet');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600"
          >
            {lang === 'en' ? 'Formula Reference' : '公式速查手册'}
          </button>
          <button
            onClick={() => {
              onOpenCloudSync();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600"
          >
            {lang === 'en' ? 'Cloud Edge & Subdomains' : '云端子站同步'}
          </button>
        </div>
      )}
    </header>
  );
};
