/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calculator, 
  BookOpen, 
  Zap, 
  Compass, 
  Grid, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  X, 
  Copy, 
  Check, 
  RefreshCw,
  Info,
  Layers,
  Sigma
} from 'lucide-react';

interface ToolItem {
  id: string;
  title: string;
  titleZh: string;
  domain: string;
  formula: string;
  category: 'Mathematics' | 'Algebra' | 'Physics' | 'Geometry' | 'Academic';
  categoryZh: string;
  type: 'online' | 'instant';
  typeZh: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
}

const TOOLS: ToolItem[] = [
  {
    id: 'density-calculator',
    title: 'Density Calculator',
    titleZh: '密度计算公式工具',
    domain: 'density-calculator.formulacalckit.com',
    formula: 'f(x) = \\text{Result}',
    category: 'Mathematics',
    categoryZh: '数学',
    type: 'online',
    typeZh: '在线工具',
    description: '高精度科学与数学在线计算器，支持输入参数即时求解与分步推导解析。',
    icon: <Calculator className="w-5 h-5 text-indigo-600" />,
    accentColor: 'border-indigo-200 hover:border-indigo-400'
  },
  {
    id: 'fraction-calculator',
    title: 'Fraction Calculator',
    titleZh: '分数计算器',
    domain: 'fraction-calculator.formulacalckit.com',
    formula: 'f(x) = \\text{Result}',
    category: 'Mathematics',
    categoryZh: '数学',
    type: 'online',
    typeZh: '在线工具',
    description: '高精度科学与数学在线计算器，支持输入参数即时求解与分步推导解析。',
    icon: <Calculator className="w-5 h-5 text-indigo-600" />,
    accentColor: 'border-indigo-200 hover:border-indigo-400'
  },
  {
    id: 'linear-function',
    title: 'Linear Function',
    titleZh: '一次函数解析式生成器',
    domain: 'linear-function.formulacalckit.com',
    formula: 'y = kx + b',
    category: 'Algebra',
    categoryZh: '代数',
    type: 'online',
    typeZh: '在线工具',
    description: '输入两个已知坐标点秒出斜率k、截距b、解析式、一般式及坐标轴交点，支持分数精度与动态坐标图像。',
    icon: <Sigma className="w-5 h-5 text-blue-600" />,
    accentColor: 'border-blue-200 hover:border-blue-400'
  },
  {
    id: 'linear-system',
    title: 'Linear System',
    titleZh: '二元一次方程组求解器',
    domain: 'linear-system-solver.formulacalckit.com',
    formula: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}',
    category: 'Algebra',
    categoryZh: '代数',
    type: 'online',
    typeZh: '在线工具',
    description: '二元一次方程组带步骤求解，支持代入消元法与加减消元法、精确分数化简、2D函数图象交点可视化。',
    icon: <Layers className="w-5 h-5 text-blue-600" />,
    accentColor: 'border-blue-200 hover:border-blue-400'
  },
  {
    id: 'mathbridge',
    title: 'MathBridge',
    titleZh: '数学公式排版工具',
    domain: 'mathbridge.formulacalckit.com',
    formula: '\\sum, \\int, \\frac{d}{dx}',
    category: 'Academic',
    categoryZh: '学术',
    type: 'online',
    typeZh: '在线工具',
    description: 'LaTeX / Word / MathML 论文级公式排版与转换套件，支持学术公式实时预览与导出。',
    icon: <BookOpen className="w-5 h-5 text-purple-600" />,
    accentColor: 'border-purple-200 hover:border-purple-400'
  },
  {
    id: 'ohms-law',
    title: "Ohm's Law",
    titleZh: '欧姆定律与电功率计算器',
    domain: 'ohms-law-calculator.formulacalckit.com',
    formula: 'V = I \\cdot R, \\ P = V \\cdot I',
    category: 'Physics',
    categoryZh: '物理',
    type: 'instant',
    typeZh: '即时求解',
    description: '物理电路核心定律：根据任意两项物理量计算电压、电流、电阻与电功率，支持科学单位换算。',
    icon: <Zap className="w-5 h-5 text-amber-600" />,
    accentColor: 'border-amber-200 hover:border-amber-400'
  },
  {
    id: 'pythagorean',
    title: 'Pythagorean Calculator',
    titleZh: '勾股定理计算器',
    domain: 'pythagorean-calculator.formulacalckit.com',
    formula: 'a^2 + b^2 = c^2',
    category: 'Geometry',
    categoryZh: '几何',
    type: 'instant',
    typeZh: '即时求解',
    description: '直角三角形斜边或直角边，支持最简二次根式化简（如 2√5）、逐步几何证明与勾股数查询。',
    icon: <Compass className="w-5 h-5 text-emerald-600" />,
    accentColor: 'border-emerald-200 hover:border-emerald-400'
  },
  {
    id: 'quadratic-solver',
    title: 'Quadratic Solver',
    titleZh: '一元二次方程求解器',
    domain: 'quadratic-solver.formulacalckit.com',
    formula: 'ax^2 + bx + c = 0',
    category: 'Algebra',
    categoryZh: '代数',
    type: 'instant',
    typeZh: '即时求解',
    description: '快速解一元二次方程，输出实根与复数虚根、判别式 Δ、抛物线顶点坐标及十字相乘配方步骤。',
    icon: <Calculator className="w-5 h-5 text-blue-600" />,
    accentColor: 'border-blue-200 hover:border-blue-400'
  },
  {
    id: 'sector-calculator',
    title: 'Sector Calculator',
    titleZh: '扇形面积与弧长计算器',
    domain: 'sector-calculator.formulacalckit.com',
    formula: 'S = \\frac{n}{360}\\pi r^2 = \\frac{1}{2}lr',
    category: 'Geometry',
    categoryZh: '几何',
    type: 'online',
    typeZh: '在线工具',
    description: '扇形面积公式与弧长在线求解，支持圆心角度数/弧度制互逆推导、周长计算与同锥侧面展开图。',
    icon: <Compass className="w-5 h-5 text-emerald-600" />,
    accentColor: 'border-emerald-200 hover:border-emerald-400'
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [copied, setCopied] = useState(false);

  // Calculator states
  const [qa, setQa] = useState<string>('1');
  const [qb, setQb] = useState<string>('-3');
  const [qc, setQc] = useState<string>('2');

  const [val1, setVal1] = useState<string>('12');
  const [val2, setVal2] = useState<string>('4');

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.titleZh.includes(searchQuery) ||
                          tool.description.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FormulaCalcKit
              </h1>
              <p className="text-xs text-slate-500">专业科学与数学在线计算工具箱</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索公式、工具或定理..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <a
              href="https://github.com/laohu90/formulacalckit"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>GitHub 仓库</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Banner / Intro */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-lg shadow-indigo-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide text-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>完美对齐与动态响应矩阵</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              高精度数学与物理计算引擎
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              解决卡片高度不一与底部对齐难题。通过标准 Flexbox 结构 (`h-full flex flex-col`) 与弹性描述区，实现所有工具卡片底部操作按钮在各种屏幕下的绝对完美对齐。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Mathematics', 'Algebra', 'Physics', 'Geometry', 'Academic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat === 'All' ? '全部工具' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索公式、工具或定理..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25"
            />
          </div>
        </div>

        {/* Tools Grid - Perfect Alignment with h-full flex flex-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-12">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className={`bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-full shadow-xs hover:shadow-xl transition-all duration-300 group ${tool.accentColor}`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base">
                      {tool.titleZh}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {tool.domain}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  {tool.typeZh}
                </span>
              </div>

              {/* Formula Badge & Tag */}
              <div className="my-3 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between font-mono text-xs text-slate-700">
                <span className="font-semibold text-blue-600 overflow-x-auto py-0.5">{tool.formula}</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-sans text-slate-600 text-[11px] font-medium">
                  {tool.category}
                </span>
              </div>

              {/* Description with flex-grow to absorb remaining space */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {tool.description}
              </p>

              {/* Pinned Bottom Footer Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{tool.type === 'instant' ? '即时参数求解' : '交互式分步推导'}</span>
                </div>
                <button
                  onClick={() => setActiveTool(tool)}
                  className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-sm shadow-blue-500/20 hover:shadow transition-all group-hover:translate-x-0.5"
                >
                  <span>打开工具</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 my-auto">
            <Calculator className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-700">未找到相关计算工具</h3>
            <p className="text-sm text-slate-400 mt-1">请尝试更换搜索关键词或选择其他分类标签。</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>FormulaCalcKit 运行时状态正常 (Responsive Flex Grid Active)</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span>更新时间: {new Date().toLocaleTimeString()}</span>
        </div>
      </footer>

      {/* Interactive Tool Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  {activeTool.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{activeTool.titleZh}</h3>
                  <p className="text-xs text-slate-400 font-mono">{activeTool.domain}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Dynamic Tool Simulator */}
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm text-blue-700 flex items-center justify-between">
                <span>核心公式: {activeTool.formula}</span>
                <button
                  onClick={() => handleCopy(activeTool.formula)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors flex items-center space-x-1 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已复制' : '复制公式'}</span>
                </button>
              </div>

              {/* Specific Calculator UI based on Tool */}
              {activeTool.id === 'quadratic-solver' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-slate-700">一元二次方程求解器参数输入 ($ax^2 + bx + c = 0$):</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">系数 a</label>
                      <input 
                        type="number" 
                        value={qa} 
                        onChange={(e) => setQa(e.target.value)} 
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">系数 b</label>
                      <input 
                        type="number" 
                        value={qb} 
                        onChange={(e) => setQb(e.target.value)} 
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">常数 c</label>
                      <input 
                        type="number" 
                        value={qc} 
                        onChange={(e) => setQc(e.target.value)} 
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
                    <div className="text-xs font-semibold text-blue-800">计算结果与解析：</div>
                    {(() => {
                      const aVal = parseFloat(qa) || 0;
                      const bVal = parseFloat(qb) || 0;
                      const cVal = parseFloat(qc) || 0;
                      if (aVal === 0) return <div className="text-sm text-red-600">系数 a 不能为 0（否则为一元一次方程）。</div>;
                      const delta = bVal * bVal - 4 * aVal * cVal;
                      const vertexX = -bVal / (2 * aVal);
                      const vertexY = aVal * vertexX * vertexX + bVal * vertexX + cVal;
                      return (
                        <div className="text-sm space-y-1 font-mono text-slate-700">
                          <div>判别式 $\Delta = b^2 - 4ac = {delta}$</div>
                          {delta > 0 ? (
                            <div>两不等实根: $x_1 = {((-bVal + Math.sqrt(delta)) / (2 * aVal)).toFixed(4)}, x_2 = {((-bVal - Math.sqrt(delta)) / (2 * aVal)).toFixed(4)}$</div>
                          ) : delta === 0 ? (
                            <div>两相等实根: $x_1 = x_2 = {((-bVal) / (2 * aVal)).toFixed(4)}$</div>
                          ) : (
                            <div>共轭复数根: $x = {-bVal / (2 * aVal)} \pm {Math.sqrt(-delta) / (2 * aVal)}i$</div>
                          )}
                          <div className="text-xs text-slate-500 font-sans mt-2">抛物线顶点坐标: ({vertexX.toFixed(2)}, {vertexY.toFixed(2)})</div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {activeTool.id === 'ohms-law' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-slate-700">欧姆定律快速计算器 ($V = I \cdot R$):</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">电压 V (伏特)</label>
                      <input 
                        type="number" 
                        value={val1} 
                        onChange={(e) => setVal1(e.target.value)} 
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">电阻 R (欧姆)</label>
                      <input 
                        type="number" 
                        value={val2} 
                        onChange={(e) => setVal2(e.target.value)} 
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-2 font-mono text-sm text-slate-700">
                    {(() => {
                      const v = parseFloat(val1) || 0;
                      const r = parseFloat(val2) || 1;
                      const current = r !== 0 ? v / r : 0;
                      const power = v * current;
                      return (
                        <>
                          <div>计算电流 I = V / R = {current.toFixed(4)} A</div>
                          <div>电功率 P = V · I = {power.toFixed(4)} W</div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {activeTool.id !== 'quadratic-solver' && activeTool.id !== 'ohms-law' && (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <Calculator className="w-10 h-10 text-blue-600 mx-auto" />
                  <h4 className="font-medium text-slate-800">{activeTool.titleZh} 互动计算引擎</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    该工具已通过子域 <span className="font-mono text-blue-600">{activeTool.domain}</span> 成功挂载。支持参数实时调整、分步推导及 LaTeX 预览。
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveTool(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  关闭
                </button>
                <a
                  href={`https://${activeTool.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
                >
                  <span>访问独立子域工具</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
