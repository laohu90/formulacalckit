import React from 'react';
import { QuickSolverId } from '../types';
import { Triangle, FunctionSquare, Calculator, Zap, Circle, FileCode, Scale, BookOpen } from 'lucide-react';

interface HeroProps {
  lang: 'en' | 'zh';
  onSelectSolver: (id: QuickSolverId) => void;
  onNavigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onSelectSolver, onNavigate }) => {
  const isEn = lang === 'en';

  const quickShortcuts: Array<{ id: QuickSolverId; labelEn: string; labelZh: string; icon: React.ReactNode }> = [
    { id: 'pythagorean', labelEn: 'Pythagorean', labelZh: '勾股定理', icon: <Triangle className="w-3.5 h-3.5" /> },
    { id: 'quadratic', labelEn: 'Quadratic Suite', labelZh: '二次方程套件', icon: <FunctionSquare className="w-3.5 h-3.5" /> },
    { id: 'gcd_lcm', labelEn: 'GCD & LCM', labelZh: '公约数/倍数', icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: 'ohms_law', labelEn: "Ohm's Law", labelZh: '欧姆定律', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'circle', labelEn: 'Circle & Sector', labelZh: '圆与扇形', icon: <Circle className="w-3.5 h-3.5" /> },
    { id: 'mathbridge', labelEn: 'LaTeX Studio', labelZh: 'LaTeX 排版', icon: <FileCode className="w-3.5 h-3.5" /> },
  ];

  const handleLaunch = (id: QuickSolverId) => {
    onSelectSolver(id);
    const el = document.getElementById('workstation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="text-center max-w-4xl mx-auto pt-4 pb-2 space-y-4">
      {/* Authoritative Working Group & Metrology Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <span className="font-semibold text-slate-700">
          {isEn ? 'FormulaCalcKit Scientific & Metrology Working Group' : '科学计算与计量编审工作组'}
        </span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <span className="text-blue-700 font-semibold">
          {isEn ? '16 Standardized STEM Solvers' : '16 款权威对齐求解器'}
        </span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <span className="font-mono text-indigo-600">ISO/IEC 80000 & CODATA</span>
        {onNavigate && (
          <div className="flex items-center gap-2 ml-1">
            <button
              onClick={() => onNavigate('/standards')}
              className="text-[11px] text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Scale className="w-3 h-3" />
              <span>{isEn ? 'Standards Matrix' : '查看标准对照表'}</span>
            </button>
            <button
              onClick={() => onNavigate('/about')}
              className="text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3 h-3" />
              <span>{isEn ? 'Editorial Board' : '编委会与引用'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Title with balanced typography */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
        {isEn ? (
          <>
            Precision Formula Solvers <br className="hidden sm:inline" />
            <span className="text-blue-600">& Scientific Problem-Solving Studio</span>
          </>
        ) : (
          <>
            科学公式计算工作台 <br className="hidden sm:inline" />
            <span className="text-blue-600">高精度数学推导与工程求解器</span>
          </>
        )}
      </h1>

      {/* Clear Subtitle */}
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
        {isEn
          ? 'Comprehensive 16 STEM calculators covering geometry, quadratic algebra, circuit physics, and LaTeX typography. Instant zero-latency computation with complete mathematical steps and exact radical reduction.'
          : '涵盖代数方程、平面几何、物理电路、初等数论与 LaTeX 学术排版全套 16 款标准求解器。提供纯前端零延迟即时运算、最简根式化简与全步骤代数推导。'}
      </p>

      {/* Direct Quick Jump Buttons into the interactive solver */}
      <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 font-medium mr-1">
          {isEn ? 'Quick Launch:' : '快速直达:'}
        </span>
        {quickShortcuts.map((s) => (
          <button
            key={s.id}
            onClick={() => handleLaunch(s.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {s.icon}
            <span>{isEn ? s.labelEn : s.labelZh}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
