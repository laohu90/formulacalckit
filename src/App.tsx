import React, { useState } from 'react';
import {
  Calculator as CalcIcon,
  Compass,
  Search,
  BookOpen,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Triangle,
  Info
} from 'lucide-react';
import { Calculator } from './components/Calculator';
import { TriplesExplorer } from './components/TriplesExplorer';
import { SpecialTriangles } from './components/SpecialTriangles';
import { SeoContent } from './components/SeoContent';
import { SolveResult } from './utils/pythagorean';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calc' | 'triples' | 'special' | 'guide'>('calc');
  const [copiedLink, setCopiedLink] = useState(false);
  const [presetInjection, setPresetInjection] = useState<{
    target: 'c' | 'a' | 'b';
    val1: number;
    val2: number;
    timestamp: number;
  } | null>(null);

  // Handle preset injection from triples or special triangles
  const handleLoadTriple = (a: number, b: number) => {
    setPresetInjection({
      target: 'c',
      val1: a,
      val2: b,
      timestamp: Date.now()
    });
    setActiveTab('calc');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '勾股定理计算器 - 直角三角形斜边计算器与最简根号',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Notice / Announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center font-medium border-b border-slate-800">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>全新升级：支持自动输出最简二次根号、分数形式与完整逐步推导过程</span>
        </span>
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Triangle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight block leading-tight">
                勾股定理计算器
              </span>
              <span className="text-[11px] text-slate-500 font-mono block leading-tight">
                a² + b² = c² · 在线求解与根号化简
              </span>
            </div>
          </div>

          {/* Desktop Nav Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('calc')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calc'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <CalcIcon className="w-3.5 h-3.5" />
              <span>求解器</span>
            </button>
            <button
              onClick={() => setActiveTab('triples')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'triples'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>勾股数查询</span>
            </button>
            <button
              onClick={() => setActiveTab('special')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'special'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>特殊直角三角形</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>公式解析与FAQ</span>
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="分享或复制本页链接"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">已复制链接</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">分享/收藏</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-2 py-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('calc')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${
              activeTab === 'calc' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            求解器
          </button>
          <button
            onClick={() => setActiveTab('triples')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${
              activeTab === 'triples' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            勾股数查询
          </button>
          <button
            onClick={() => setActiveTab('special')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${
              activeTab === 'special' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            特殊直角三角形
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${
              activeTab === 'guide' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            公式与FAQ
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            几何入门第一大刚需 · 自动输出最简根号形式
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            勾股定理计算器
            <span className="block text-2xl sm:text-3xl font-bold text-blue-600 mt-1 font-mono">
              a² + b² = c²
            </span>
          </h1>

          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            免费专业的直角三角形在线计算工具。支持输入任意两边求第三边，
            <strong>自动进行根号因数分解并输出最简二次根式</strong>与精确小数，提供完整逐步解题过程及面积周长计算。
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-600">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              ✓ 自动最简根式化简
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              ✓ 详尽逐步解题推导
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              ✓ 动态几何比例图示
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              ✓ 勾股数在线速查检索
            </span>
          </div>
        </section>

        {/* Tab View or Dynamic Sections */}
        {activeTab === 'calc' && (
          <div className="space-y-10">
            {/* Main Interactive Calculator */}
            <section id="calculator">
              <Calculator presetInjection={presetInjection} />
            </section>

            {/* Quick Link Cards to other modules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setActiveTab('triples');
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600">
                    勾股数在线查询
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500">
                  速查 (3,4,5)、(5,12,13) 等常见整数组合及欧几里得公式生成。
                </p>
              </button>

              <button
                onClick={() => {
                  setActiveTab('special');
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600">
                    特殊直角三角形速查
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500">
                  30°-60°-90° (1:√3:2) 与 45°-45°-90° (1:1:√2) 固定比率与公式。
                </p>
              </button>

              <button
                onClick={() => {
                  setActiveTab('guide');
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600">
                    赵爽弦图证明与FAQ
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500">
                  几何割补证明、现实工程应用场景与 Google 核心高频疑问解答。
                </p>
              </button>
            </div>

            {/* Embedded SEO Content & Guide right below calculator */}
            <SeoContent />
          </div>
        )}

        {activeTab === 'triples' && (
          <div className="space-y-8">
            <TriplesExplorer onSelectTriple={handleLoadTriple} />
          </div>
        )}

        {activeTab === 'special' && (
          <div className="space-y-8">
            <SpecialTriangles onApplySpecial={handleLoadTriple} />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-8">
            <SeoContent />
          </div>
        )}
      </main>

      {/* Footer with SEO Breadcrumbs and Formulas */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-20 pt-12 pb-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Formula Recap Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-slate-200">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">直角三角形求边长</h4>
              <ul className="space-y-1 font-mono text-[11px] text-slate-600">
                <li>斜边 c = √(a² + b²)</li>
                <li>直角边 a = √(c² - b²)</li>
                <li>直角边 b = √(c² - a²)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">几何特征量公式</h4>
              <ul className="space-y-1 font-mono text-[11px] text-slate-600">
                <li>面积 S = ½ · a · b</li>
                <li>周长 P = a + b + c</li>
                <li>斜边高 h = (a · b) / c</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">最简二次根式原则</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                被开方数中不含任何完全平方因数，分母不含根号。自动因数分解化简如 √20 = 2√5。
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">关于本站</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                专为中小学学生、几何爱好者、建筑工程师打造的高精度直角三角形在线解算工具。
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
            <p>© 2026 勾股定理计算器 · 在线直角三角形求斜边与最简二次根式</p>
            <div className="flex items-center gap-4">
              <span>遵照 Google SEO 规范与 Schema.org 结构化标记</span>
              <span>纯白极简风格设计</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
