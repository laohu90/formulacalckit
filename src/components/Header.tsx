import React from 'react';
import { Languages, Github, Menu, X, Globe, Layers, BookOpen } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'zh';
  onToggleLang: () => void;
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <span className="font-mono font-bold text-lg leading-none">∑</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  FormulaCalcKit
                </span>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200/60 px-1.5 py-0.2 rounded-xs">
                  HUB
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none">
                {lang === 'en' ? 'Online Formula Toolbox' : '公式工具箱'}
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <button
            onClick={() => onScrollToSection('subdomains-network')}
            className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>{lang === 'en' ? 'Online Tools' : '在线工具'}</span>
          </button>
          <button
            onClick={() => onScrollToSection('calculators')}
            className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Calculators' : '计算工具库'}</span>
          </button>
          <button
            onClick={() => onScrollToSection('cheat-sheet')}
            className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Formula Reference' : '公式速查手册'}</span>
          </button>
        </nav>

        {/* Right Tools & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title={lang === 'en' ? 'Switch to Chinese (切换为简体中文)' : 'Switch to English'}
          >
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'en' ? 'EN / 中文' : '中文 / EN'}</span>
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/laohu90/formulacalckit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Mobile menu trigger */}
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
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2 text-xs font-medium">
          <button
            onClick={() => {
              onScrollToSection('subdomains-network');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600"
          >
            {lang === 'en' ? 'Online Tools' : '在线工具'}
          </button>
          <button
            onClick={() => {
              onScrollToSection('calculators');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-slate-700 hover:text-blue-600"
          >
            {lang === 'en' ? 'Calculators Directory' : '计算工具库'}
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
        </div>
      )}
    </header>
  );
};
