import React from 'react';
import { ArrowDown, Cloud, Zap, CheckCircle } from 'lucide-react';
import { QuickSolverId } from '../types';

interface HeroProps {
  lang: 'en' | 'zh';
  onExploreClick: () => void;
  onDnsClick: () => void;
  onQuickSolve: (id: QuickSolverId) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onExploreClick,
  onDnsClick,
  onQuickSolve,
}) => {
  return (
    <section className="pt-8 pb-10 text-center max-w-4xl mx-auto space-y-6">
      {/* Top micro-badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-700">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
        <span>
          {lang === 'en'
            ? 'formulacalckit.com · All-in-One Scientific Formula Toolbox'
            : 'formulacalckit.com · 公式工具箱官方主站'}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {lang === 'en' ? (
          <>
            Precision Formula Solvers & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              Cloudflare DNS Tool Directory
            </span>
          </>
        ) : (
          <>
            全能科学公式工具箱与 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              Cloudflare DNS 智能子站发现
            </span>
          </>
        )}
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
        {lang === 'en'
          ? 'Free online step-by-step mathematical calculators for geometry, algebra, trigonometry, and physics. Automatically inspects DNS records to list all live tool subdomains in real time.'
          : '涵盖几何、代数、三角函数与物理电学的在线逐步公式计算平台。内置 Cloudflare DNS 智能检测，自动识别主域名下所有已部署的独立计算工具。'}
      </p>

      {/* Call to Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={onExploreClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>{lang === 'en' ? 'Browse All Calculators' : '浏览公式工具库'}</span>
          <ArrowDown className="w-4 h-4" />
        </button>

        <button
          onClick={onDnsClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <Cloud className="w-4 h-4 text-blue-600" />
          <span>{lang === 'en' ? 'Inspect Cloudflare DNS' : '查看云端 DNS 子站'}</span>
        </button>
      </div>

      {/* Quick Launch Buttons for popular solvers */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
        <span className="font-medium text-slate-400">
          {lang === 'en' ? 'Quick Launch:' : '快捷求解：'}
        </span>
        <button
          onClick={() => onQuickSolve('pythagorean')}
          className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <Zap className="w-3 h-3 text-amber-500" />
          <span>{lang === 'en' ? 'Pythagorean (a²+b²=c²)' : '勾股定理'}</span>
        </button>
        <button
          onClick={() => onQuickSolve('quadratic')}
          className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <Zap className="w-3 h-3 text-amber-500" />
          <span>{lang === 'en' ? 'Quadratic (ax²+bx+c=0)' : '一元二次方程'}</span>
        </button>
        <button
          onClick={() => onQuickSolve('circle')}
          className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <Zap className="w-3 h-3 text-amber-500" />
          <span>{lang === 'en' ? 'Circle Area (πr²)' : '圆与球体'}</span>
        </button>
        <button
          onClick={() => onQuickSolve('ohms_law')}
          className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <Zap className="w-3 h-3 text-amber-500" />
          <span>{lang === 'en' ? "Ohm's Law (V=IR)" : '欧姆定律'}</span>
        </button>
      </div>

      {/* Trust & Spec Features Bar */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>{lang === 'en' ? '10+ High-Precision Math Solvers' : '10+ 高精度科学求解器'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>{lang === 'en' ? 'Exact Radicals & Decimal Output' : '输出最简二次根号与小数'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>{lang === 'en' ? 'Live Cloudflare DNS Sync' : 'Cloudflare DNS 实时同步'}</span>
        </div>
      </div>
    </section>
  );
};
