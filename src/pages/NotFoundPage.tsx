import React, { useState } from 'react';
import {
  FileQuestion,
  Home,
  Search,
  ArrowRight,
  Triangle,
  FunctionSquare,
  Activity,
  Zap,
  Calculator,
  FileCode,
} from 'lucide-react';
import { INITIAL_TOOLS } from '../data/tools';
import { QuickSolverId } from '../types';

interface NotFoundPageProps {
  lang: 'en' | 'zh';
  onNavigate: (path: string, solverId?: QuickSolverId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ lang, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isEn = lang === 'en';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/404';

  const quickLinks: Array<{
    id: string;
    solverId: QuickSolverId;
    nameEn: string;
    nameZh: string;
    formula: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'quadratic-solver',
      solverId: 'quadratic',
      nameEn: 'Quadratic Equation Suite',
      nameZh: '一元二次方程全功能套件',
      formula: 'ax² + bx + c = 0',
      icon: <FunctionSquare className="w-4 h-4 text-blue-600" />,
    },
    {
      id: 'pythagorean-calculator',
      solverId: 'pythagorean',
      nameEn: 'Pythagorean Theorem',
      nameZh: '勾股定理与斜边求解',
      formula: 'a² + b² = c²',
      icon: <Triangle className="w-4 h-4 text-emerald-600" />,
    },
    {
      id: 'density-calculator',
      solverId: 'density',
      nameEn: 'Density & Buoyancy',
      nameZh: '密度计算与浮力仿真',
      formula: 'ρ = m / V',
      icon: <Activity className="w-4 h-4 text-amber-600" />,
    },
    {
      id: 'gcd-calculator',
      solverId: 'gcd_lcm',
      nameEn: 'GCD & LCM Calculator',
      nameZh: '最大公约数与最小公倍数',
      formula: 'gcd(a, b), lcm(a, b)',
      icon: <Calculator className="w-4 h-4 text-purple-600" />,
    },
    {
      id: 'ohms-law-calculator',
      solverId: 'ohms_law',
      nameEn: "Ohm's Law & Circuit Power",
      nameZh: '欧姆定律与电功率',
      formula: 'V = I · R',
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
    },
    {
      id: 'mathbridge',
      solverId: 'mathbridge',
      nameEn: 'MathBridge LaTeX Studio',
      nameZh: 'LaTeX / Word 公式转换',
      formula: 'LaTeX ⇄ OMML',
      icon: <FileCode className="w-4 h-4 text-indigo-600" />,
    },
  ];

  const filteredTools = searchQuery.trim()
    ? INITIAL_TOOLS.filter((t) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          t.nameEn.toLowerCase().includes(q) ||
          t.nameZh.toLowerCase().includes(q) ||
          t.descriptionEn.toLowerCase().includes(q) ||
          t.descriptionZh.toLowerCase().includes(q) ||
          t.formula.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center space-y-8 animate-fade-in">
      {/* 404 Status Pill & Badge */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
          <FileQuestion className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-semibold">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>HTTP 404 · {isEn ? 'PAGE NOT FOUND' : '页面未找到'}</span>
        </div>
      </div>

      {/* Main Error Headline */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Formula or Page Not Located' : '未找到您请求的公式或计算器页面'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          {isEn ? (
            <>
              The requested address <code className="font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-xs">{currentPath}</code> does not exist on FormulaCalcKit. It may have been moved, renamed, or mistyped.
            </>
          ) : (
            <>
              您访问的网址 <code className="font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-xs">{currentPath}</code> 在 FormulaCalcKit 并不存在。该页面可能已被合并、迁移或网址拼写有误。
            </>
          )}
        </p>
      </div>

      {/* Instant Search Bar */}
      <div className="max-w-md mx-auto relative text-left">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? 'Search all 16 STEM calculators...' : '直接搜索全站 16 款标准计算器...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
        </div>

        {searchQuery.trim() && (
          <div className="mt-2 p-2 bg-white rounded-xl border border-slate-200 shadow-lg space-y-1 max-h-60 overflow-y-auto">
            {filteredTools.length > 0 ? (
              filteredTools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onNavigate('/', t.quickSolverId)}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                      {isEn ? t.nameEn : t.nameZh}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{t.formula}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                </button>
              ))
            ) : (
              <div className="p-3 text-xs text-slate-400 text-center">
                {isEn ? 'No matching calculators found.' : '未检索到相关计算器。'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Jump Buttons to Popular Solvers */}
      <div className="pt-4 space-y-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          {isEn ? 'Recommended Standard Solvers' : '推荐常用标准求解器'}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
          {quickLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate('/', item.solverId)}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all text-left flex items-start gap-3 group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                  {isEn ? item.nameEn : item.nameZh}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">{item.formula}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>{isEn ? 'Return to Home Studio' : '返回首页计算工作台'}</span>
        </button>

        <button
          onClick={() => onNavigate('/about')}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>{isEn ? 'About Platform' : '了解平台与编委会'}</span>
        </button>

        <button
          onClick={() => onNavigate('/contact')}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>{isEn ? 'Report Broken Link' : '反馈死链或错误'}</span>
        </button>
      </div>
    </div>
  );
};
