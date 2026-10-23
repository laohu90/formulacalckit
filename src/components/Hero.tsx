import React from 'react';
import { QuickSolverId } from '../types';
import { Triangle, FunctionSquare, Calculator, Zap, Circle, FileCode } from 'lucide-react';

interface HeroProps {
  lang: 'en' | 'zh';
  onSelectSolver: (id: QuickSolverId) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onSelectSolver }) => {
  const quickShortcuts: Array<{ id: QuickSolverId; labelEn: string; labelZh: string; icon: React.ReactNode }> = [
    { id: 'pythagorean', labelEn: 'Pythagorean', labelZh: '勾股定理', icon: <Triangle className="w-3.5 h-3.5" /> },
    { id: 'quadratic', labelEn: 'Quadratic', labelZh: '二次方程', icon: <FunctionSquare className="w-3.5 h-3.5" /> },
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
    <section className="text-center max-w-4xl mx-auto pt-6 pb-4 space-y-4">
      {/* Clean unboxed metadata separator */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <span>{lang === 'en' ? 'FormulaCalcKit STEM Suite' : '科学与工程公式计算套件'}</span>
        <span aria-hidden="true">·</span>
        <span>{lang === 'en' ? 'Exact Radicals & Derivations' : '最简二次根式化简与分步推导'}</span>
        <span aria-hidden="true">·</span>
        <span className="font-mono text-blue-600">Pure Local Computing</span>
      </div>

      {/* Main Title with balanced typography */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
        {lang === 'en' ? (
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
        {lang === 'en'
          ? 'Comprehensive geometry, quadratic algebra, physics kinematics, number theory, and LaTeX typography. Instant zero-latency computation with complete mathematical steps.'
          : '覆盖平面几何、代数方程、物理参量、初等数论与 LaTeX 学术排版。提供零延迟即时运算、最简根式化简与完整推导步骤。'}
      </p>

      {/* Direct Quick Jump Buttons into the interactive solver */}
      <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 font-medium mr-1">
          {lang === 'en' ? 'Quick Launch:' : '快速直达:'}
        </span>
        {quickShortcuts.map((s) => (
          <button
            key={s.id}
            onClick={() => handleLaunch(s.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {s.icon}
            <span>{lang === 'en' ? s.labelEn : s.labelZh}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
