import React from 'react';
import { ShieldCheck, Scale, BookOpen, Mail, ExternalLink, Award } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'zh';
  onScrollToSection: (id: string) => void;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onScrollToSection,
  onNavigate,
}) => {
  const isEn = lang === 'en';

  const handleNav = (path: string, sectionId?: string) => {
    if (onNavigate) {
      onNavigate(path);
      if (sectionId && path === '/') {
        setTimeout(() => onScrollToSection(sectionId), 80);
      }
      return;
    }
    if (sectionId) {
      onScrollToSection(sectionId);
    }
  };

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
              <span className="text-[10px] text-slate-500 font-mono">
                formulacalckit.com
              </span>
            </div>
            <p className="text-slate-500 max-w-md leading-relaxed">
              {isEn
                ? 'FormulaCalcKit is a verified open scientific computing workstation providing 16 standardized STEM solvers with exact radical reductions, algebraic derivations, and ISO/IEC 80000 metrology alignment.'
                : 'FormulaCalcKit 是高精度开放式科学计算与工程公式工作台，提供 16 款对齐国际计量与课标的交互式求解器，坚持最简二次根式化简与全步骤代数推导。'}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium text-[11px]">
                  {isEn ? '100% Client-Side Computing · Zero Telemetry' : '纯前端本地计算 · 零隐私追踪'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-medium text-[11px]">
                  {isEn ? 'ISO/IEC 80000 & NIST SP 811 Compliant' : '遵循 ISO/IEC 80000 与 NIST 计量标准'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Solvers Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900">
              {isEn ? 'Standard STEM Solvers' : '核心求解器'}
            </h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>
                <button
                  onClick={() => handleNav('/', 'workstation')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? 'Pythagorean & Hypotenuse' : '勾股定理与直角三角形求解'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/', 'workstation')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? 'Quadratic & Vertex Form' : '一元二次方程与顶点式配方'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/', 'workstation')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? 'Euclidean GCD & LCM' : '辗转相除法与质因数分解'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/', 'workstation')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {isEn ? 'Physics Density & Buoyancy' : '物理密度与阿基米德浮力'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/', 'server-tools')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors font-medium text-blue-600"
                >
                  {isEn ? 'View All 16 Standard Solvers →' : '浏览全站 16 款标准计算器 →'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal, Standards & Information */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900">
              {isEn ? 'Standards & Authority' : '计量规范与编委政策'}
            </h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>
                <button
                  onClick={() => handleNav('/standards')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{isEn ? 'Metrology Standards Matrix' : '国际计量规范对照总表'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/about')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{isEn ? 'Editorial Board & Citations' : '学术编审委员会与论文引用'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/privacy')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {isEn ? 'Privacy Policy (Zero Storage)' : '隐私权保护政策 (Privacy Policy)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/terms')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {isEn ? 'Terms of Service & Disclaimer' : '服务条款与免责声明 (Terms)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{isEn ? 'Contact & Errata Submission' : '学术勘误与联系编委'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} FormulaCalcKit Scientific & Metrology Working Group. All rights reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span>
              {isEn
                ? 'High-Precision Symbolic Math Engine · ISO 80000 Aligned'
                : '高精度符号数学引擎 · ISO 80000 国际标准对齐'}
            </span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNav('/about')}
              className="text-slate-500 hover:text-blue-600 underline cursor-pointer"
            >
              {isEn ? 'Cite this platform (BibTeX)' : '引用本平台 (BibTeX)'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
