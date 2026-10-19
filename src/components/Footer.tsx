import React from 'react';
import { ShieldCheck, Heart, Github, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'zh';
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onScrollToSection }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm">
                ∑
              </div>
              <span className="font-bold text-slate-900 text-base">FormulaCalcKit</span>
              <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-xs">
                formulacalckit.com
              </span>
            </div>
            <p className="text-slate-500 max-w-md leading-relaxed">
              {lang === 'en'
                ? 'FormulaCalcKit is an open scientific formula toolbox and directory providing free instant math, geometry, physics, and financial calculators with automated Cloudflare DNS subdomain discovery.'
                : 'FormulaCalcKit（公式工具箱）致力于为全球师生与工程师提供免费、即时、高精度的科学公式在线计算与 DNS 工具矩阵导航服务。'}
            </p>
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-medium text-[11px]">
                {lang === 'en'
                  ? 'Google Search Console Verified'
                  : 'Google Search Console 官方验证收录站点'}
              </span>
            </div>
          </div>

          {/* Subdomains Index */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900">
              {lang === 'en' ? 'Live Tool Subdomains' : '已部署独立工具子站'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://pythagorean-calculator.formulacalckit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Pythagorean Theorem (勾股定理)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://quadratic.formulacalckit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Quadratic Solver (一元二次方程)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/laohu90/formulacalckit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
                >
                  <span>GitHub Repository</span>
                  <Github className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900">
              {lang === 'en' ? 'Portal Quick Links' : '主站快速导航'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onScrollToSection('calculators')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'en' ? 'All Calculators Directory' : '所有计算器目录'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('dns-inspector')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'en' ? 'Cloudflare DNS Auto-Discovery' : 'Cloudflare DNS 发现'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('cheat-sheet')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'en' ? 'Mathematical Formula Reference' : '常用数学公式手册'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} FormulaCalcKit (formulacalckit.com). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>
              {lang === 'en'
                ? '100% Client-Side Computing · Privacy Protected'
                : '纯前端高精度计算 · 绝不收集任何用户隐私数据'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
