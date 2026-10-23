import React, { useState, useId } from 'react';
import { QuickSolverId } from '../types';
import { solvePythagorean, solveQuadratic, solveGcdLcm } from '../utils/mathEngine';
import {
  Triangle,
  FunctionSquare,
  Calculator,
  Zap,
  Circle,
  FileCode,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface WorkstationProps {
  lang: 'en' | 'zh';
  activeSolverId: QuickSolverId;
  onSelectSolver: (id: QuickSolverId) => void;
}

export const Workstation: React.FC<WorkstationProps> = ({
  lang,
  activeSolverId,
  onSelectSolver,
}) => {
  const solverTabs: Array<{ id: QuickSolverId; labelEn: string; labelZh: string; icon: React.ReactNode }> = [
    {
      id: 'pythagorean',
      labelEn: 'Pythagorean & Right Triangle',
      labelZh: '勾股定理与直角三角形',
      icon: <Triangle className="w-4 h-4" />,
    },
    {
      id: 'quadratic',
      labelEn: 'Quadratic & Parabola',
      labelZh: '一元二次方程与抛物线',
      icon: <FunctionSquare className="w-4 h-4" />,
    },
    {
      id: 'gcd_lcm',
      labelEn: 'GCD & LCM Factorizer',
      labelZh: '最大公约数与最小公倍数',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'ohms_law',
      labelEn: 'Physics & Engineering',
      labelZh: '物理定律与工程参量',
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: 'circle',
      labelEn: 'Circle & Sector Geometry',
      labelZh: '圆与扇形几何体系',
      icon: <Circle className="w-4 h-4" />,
    },
    {
      id: 'mathbridge',
      labelEn: 'LaTeX Formula Studio',
      labelZh: 'LaTeX 公式排版工作室',
      icon: <FileCode className="w-4 h-4" />,
    },
  ];

  return (
    <section id="workstation" className="scroll-mt-20">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
            <span>{lang === 'en' ? 'INTERACTIVE WORKSTATION' : '在线计算工作台'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">
              {lang === 'en' ? 'Client-side precision computation & step derivations' : '高精度本地纯前端运算 · 逐步公式推导'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {lang === 'en' ? 'Formula Calculation Studio' : '科学公式计算工作站'}
          </h2>
        </div>

        {/* Tab Selector as clean Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
          {solverTabs.map((tab) => {
            const isActive = activeSolverId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectSolver(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>{tab.icon}</span>
                <span>{lang === 'en' ? tab.labelEn : tab.labelZh}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Solver Workspace Body */}
      <div className="mt-6 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {activeSolverId === 'pythagorean' && <PythagoreanStudio lang={lang} />}
        {activeSolverId === 'quadratic' && <QuadraticStudio lang={lang} />}
        {activeSolverId === 'gcd_lcm' && <GcdLcmStudio lang={lang} />}
        {activeSolverId === 'ohms_law' && <PhysicsStudio lang={lang} />}
        {activeSolverId === 'circle' && <CircleSectorStudio lang={lang} />}
        {activeSolverId === 'mathbridge' && <MathBridgeStudio lang={lang} />}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. Pythagorean & Right Triangle Studio                                    */
/* -------------------------------------------------------------------------- */
function PythagoreanStudio({ lang }: { lang: 'en' | 'zh' }) {
  const [sideA, setSideA] = useState<string>('3');
  const [sideB, setSideB] = useState<string>('4');
  const [sideC, setSideC] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const numA = parseFloat(sideA);
  const numB = parseFloat(sideB);
  const numC = parseFloat(sideC);

  const result = solvePythagorean(
    !isNaN(numA) && sideA.trim() !== '' ? numA : undefined,
    !isNaN(numB) && sideB.trim() !== '' ? numB : undefined,
    !isNaN(numC) && sideC.trim() !== '' ? numC : undefined
  );

  const applyPreset = (a: string, b: string, c: string) => {
    setSideA(a);
    setSideB(b);
    setSideC(c);
  };

  const reset = () => {
    setSideA('3');
    setSideB('4');
    setSideC('');
  };

  const copyResult = () => {
    if (result.success && result.data) {
      const text = `${result.data.solvedSide} = ${result.data.radical} (≈ ${result.data.decimal.toFixed(4)})`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Parameter Inputs & Triangle Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Input Console (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lang === 'en' ? 'Inputs (Enter any 2 sides, leave 1 blank)' : '已知参数（输入任意两边，留空求解边）'}
            </span>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Reset' : '重置'}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>{lang === 'en' ? 'Leg a' : '直角边 a'}</span>
                <span className="text-[11px] font-mono text-slate-400">Vertical</span>
              </label>
              <input
                type="number"
                step="any"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                placeholder={lang === 'en' ? 'e.g. 3' : '留空求解'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>{lang === 'en' ? 'Leg b' : '直角边 b'}</span>
                <span className="text-[11px] font-mono text-slate-400">Base</span>
              </label>
              <input
                type="number"
                step="any"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                placeholder={lang === 'en' ? 'e.g. 4' : '留空求解'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>{lang === 'en' ? 'Hypotenuse c' : '斜边 c'}</span>
                <span className="text-[11px] font-mono text-blue-600 font-semibold">a² + b² = c²</span>
              </label>
              <input
                type="number"
                step="any"
                value={sideC}
                onChange={(e) => setSideC(e.target.value)}
                placeholder={lang === 'en' ? 'Leave blank' : '留空求解'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Quick Pythagorean Triples Presets */}
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
            <span className="text-slate-400 font-medium">{lang === 'en' ? 'Presets:' : '常用勾股数:'}</span>
            <button
              onClick={() => applyPreset('3', '4', '')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              3 - 4 - 5
            </button>
            <button
              onClick={() => applyPreset('5', '12', '')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              5 - 12 - 13
            </button>
            <button
              onClick={() => applyPreset('7', '24', '')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              7 - 24 - 25
            </button>
            <button
              onClick={() => applyPreset('1', '1', '')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              1 - 1 - √2
            </button>
            <button
              onClick={() => applyPreset('1', '1.732', '')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              1 - √3 - 2
            </button>
          </div>

          {/* Solution Banner */}
          {result.success && result.data ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {lang === 'en' ? 'Calculated Result' : '求解结果'}
                </span>
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'en' ? 'Copied' : '已复制') : (lang === 'en' ? 'Copy Result' : '复制结果')}</span>
                </button>
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {result.data.solvedSide} = {result.data.radical}
                </div>
                <div className="text-sm font-mono text-slate-500 tabular-nums">
                  ≈ {result.data.decimal.toFixed(6).replace(/\.?0+$/, '')}
                </div>
              </div>

              {/* Secondary Geometry Measurements */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-xs">
                <div>
                  <div className="text-slate-400">{lang === 'en' ? 'Area S' : '面积 S'}</div>
                  <div className="font-mono font-semibold text-slate-800 tabular-nums">
                    {result.data.area.toFixed(4).replace(/\.?0+$/, '')}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">{lang === 'en' ? 'Perimeter P' : '周长 P'}</div>
                  <div className="font-mono font-semibold text-slate-800 tabular-nums">
                    {result.data.perimeter.toFixed(4).replace(/\.?0+$/, '')}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">{lang === 'en' ? 'Altitude h' : '斜边高 h'}</div>
                  <div className="font-mono font-semibold text-slate-800 tabular-nums">
                    {result.data.altitude.toFixed(4).replace(/\.?0+$/, '')}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">{lang === 'en' ? 'Angles (α, β)' : '锐角 (α, β)'}</div>
                  <div className="font-mono font-semibold text-slate-800 tabular-nums">
                    {result.data.angleAdeg.toFixed(1)}°, {result.data.angleBdeg.toFixed(1)}°
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-xl text-xs text-amber-900">
              {lang === 'en' ? result.errorEn : result.errorZh}
            </div>
          )}
        </div>

        {/* Right SVG Geometric Blueprint (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[260px]">
          <span className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
            {lang === 'en' ? 'Proportional Right Triangle Diagram' : '直角三角形几何比例图'}
          </span>
          <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto overflow-visible">
            {/* Grid background markers */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="240" height="180" fill="url(#grid)" opacity="0.6" />

            {/* Triangle C (30, 150), B (210, 150), A (30, 30) */}
            {/* Right Angle Marker at C */}
            <path d="M 30 135 L 45 135 L 45 150" fill="none" stroke="#64748B" strokeWidth="1.5" />

            {/* Triangle polygon */}
            <polygon
              points="30,150 210,150 30,30"
              fill="#EFF6FF"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Vertex labels */}
            <text x="18" y="158" className="text-[11px] font-bold fill-slate-700 font-mono">C</text>
            <text x="216" y="158" className="text-[11px] font-bold fill-slate-700 font-mono">B</text>
            <text x="18" y="24" className="text-[11px] font-bold fill-slate-700 font-mono">A</text>

            {/* Side labels */}
            <text x="14" y="90" className="text-xs font-bold fill-blue-700 font-mono">
              a={result.success && result.data ? result.data.a.toFixed(1) : (sideA || '?')}
            </text>
            <text x="110" y="168" className="text-xs font-bold fill-blue-700 font-mono">
              b={result.success && result.data ? result.data.b.toFixed(1) : (sideB || '?')}
            </text>
            <text x="130" y="80" className="text-xs font-bold fill-indigo-700 font-mono">
              c={result.success && result.data ? result.data.radical : (sideC || '?')}
            </text>
          </svg>
          <div className="text-[11px] text-slate-500 mt-2 font-mono">
            ∠C = 90° · a² + b² = c²
          </div>
        </div>
      </div>

      {/* Mathematical Derivation Steps */}
      {result.success && result.data && (
        <div className="pt-4 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {lang === 'en' ? 'Step-by-Step Derivation' : '详细分步数学推导过程'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {result.data.derivationSteps.map((step, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="text-xs font-semibold text-slate-800">
                  {lang === 'en' ? step.titleEn : step.titleZh}
                </div>
                <div className="text-xs font-mono font-bold text-blue-700 bg-white p-2 rounded-md border border-slate-200/80">
                  {step.math}
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {lang === 'en' ? step.noteEn : step.noteZh}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Quadratic & Parabola Studio                                            */
/* -------------------------------------------------------------------------- */
function QuadraticStudio({ lang }: { lang: 'en' | 'zh' }) {
  const [coeffA, setCoeffA] = useState<string>('1');
  const [coeffB, setCoeffB] = useState<string>('-5');
  const [coeffC, setCoeffC] = useState<string>('6');
  const [copied, setCopied] = useState(false);

  const a = parseFloat(coeffA);
  const b = parseFloat(coeffB);
  const c = parseFloat(coeffC);

  const result = solveQuadratic(a, b, c);

  const applyPreset = (newA: string, newB: string, newC: string) => {
    setCoeffA(newA);
    setCoeffB(newB);
    setCoeffC(newC);
  };

  const copyRoots = () => {
    if (result.success && result.data) {
      const text = `x1 = ${result.data.x1}, x2 = ${result.data.x2}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lang === 'en' ? 'Equation: ax² + bx + c = 0' : '标准一元二次方程：ax² + bx + c = 0'}
            </span>
            <div className="text-xs font-mono text-blue-600 font-semibold">
              {(coeffA || 'a')}x² + {(coeffB || 'b')}x + {(coeffC || 'c')} = 0
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {lang === 'en' ? 'Coeff a (a ≠ 0)' : '二次项 a (a ≠ 0)'}
              </label>
              <input
                type="number"
                step="any"
                value={coeffA}
                onChange={(e) => setCoeffA(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {lang === 'en' ? 'Coeff b' : '一次项 b'}
              </label>
              <input
                type="number"
                step="any"
                value={coeffB}
                onChange={(e) => setCoeffB(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {lang === 'en' ? 'Constant c' : '常数项 c'}
              </label>
              <input
                type="number"
                step="any"
                value={coeffC}
                onChange={(e) => setCoeffC(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Presets */}
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
            <span className="text-slate-400 font-medium">{lang === 'en' ? 'Presets:' : '示例方程:'}</span>
            <button
              onClick={() => applyPreset('1', '-5', '6')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              x² - 5x + 6 = 0
            </button>
            <button
              onClick={() => applyPreset('1', '-4', '4')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              x² - 4x + 4 = 0 (Δ=0)
            </button>
            <button
              onClick={() => applyPreset('1', '2', '5')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              x² + 2x + 5 = 0 (虚根)
            </button>
          </div>

          {/* Results Console */}
          {result.success && result.data ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {lang === 'en' ? 'Equation Roots' : '方程求解结果'}
                </span>
                <button
                  onClick={copyRoots}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'en' ? 'Copied' : '已复制') : (lang === 'en' ? 'Copy Roots' : '复制根')}</span>
                </button>
              </div>

              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                x₁ = {result.data.x1}, x₂ = {result.data.x2}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-xs">
                <div>
                  <div className="text-slate-400">{lang === 'en' ? 'Discriminant Δ' : '判别式 Δ'}</div>
                  <div className="font-mono font-semibold text-slate-800 tabular-nums">
                    {result.data.delta.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">{lang === 'en' ? 'Vertex (h, k)' : '抛物线顶点'}</div>
                  <div className="font-mono font-semibold text-slate-800 tabular-nums">
                    ({result.data.vertexH.toFixed(2)}, {result.data.vertexK.toFixed(2)})
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">{lang === 'en' ? "Vieta's Sum" : '韦达和 x₁+x₂'}</div>
                  <div className="font-mono font-semibold text-slate-800 tabular-nums">
                    {result.data.vietaSum}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">{lang === 'en' ? "Vieta's Prod" : '韦达积 x₁x₂'}</div>
                  <div className="font-mono font-semibold text-slate-800 tabular-nums">
                    {result.data.vietaProd}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-xl text-xs text-amber-900">
              {lang === 'en' ? result.errorEn : result.errorZh}
            </div>
          )}
        </div>

        {/* Right Parabola Blueprint Visualizer (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[260px]">
          <span className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
            {lang === 'en' ? 'Parabola Curve & Vertex Blueprint' : '二次函数抛物线几何曲线图'}
          </span>
          <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto overflow-visible">
            {/* Coordinate grid */}
            <line x1="0" y1="90" x2="240" y2="90" stroke="#CBD5E1" strokeWidth="1.2" />
            <line x1="120" y1="0" x2="120" y2="180" stroke="#CBD5E1" strokeWidth="1.2" />

            {/* Axis labels */}
            <text x="230" y="85" className="text-[10px] font-mono fill-slate-400">x</text>
            <text x="125" y="12" className="text-[10px] font-mono fill-slate-400">y</text>

            {/* Parabola curve SVG path */}
            {(() => {
              if (!result.success || !result.data) return null;
              const points: string[] = [];
              const vH = result.data.vertexH;
              const vK = result.data.vertexK;
              const scaleX = 14;
              const scaleY = 6;
              for (let px = -8; px <= 8; px += 0.5) {
                const py = a * px * px + b * px + c;
                const svgX = 120 + px * scaleX;
                const svgY = 90 - py * scaleY;
                if (svgY >= -20 && svgY <= 200) {
                  points.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
                }
              }
              const vertexSvgX = 120 + vH * scaleX;
              const vertexSvgY = 90 - vK * scaleY;

              return (
                <g>
                  {points.length > 2 && (
                    <polyline
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      points={points.join(' ')}
                    />
                  )}
                  {/* Axis of symmetry */}
                  <line
                    x1={vertexSvgX}
                    y1="10"
                    x2={vertexSvgX}
                    y2="170"
                    stroke="#94A3B8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Vertex circle point */}
                  <circle cx={vertexSvgX} cy={vertexSvgY} r="4" fill="#DC2626" />
                  <text
                    x={vertexSvgX + 6}
                    y={vertexSvgY - 4}
                    className="text-[10px] font-mono font-bold fill-slate-800"
                  >
                    V({vH.toFixed(1)},{vK.toFixed(1)})
                  </text>
                </g>
              );
            })()}
          </svg>
          <div className="text-[11px] text-slate-500 mt-2 font-mono">
            y = {result.success && result.data ? result.data.vertexForm : 'a(x - h)² + k'}
          </div>
        </div>
      </div>

      {/* Steps */}
      {result.success && result.data && (
        <div className="pt-4 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {lang === 'en' ? 'Algebraic Solution Steps' : '分步代数求解推导'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {result.data.steps.map((st, i) => (
              <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="text-xs font-semibold text-slate-800">
                  {lang === 'en' ? st.titleEn : st.titleZh}
                </div>
                <div className="text-xs font-mono font-bold text-blue-700 bg-white p-2 rounded-md border border-slate-200/80">
                  {st.math}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. GCD & LCM Factorizer Studio                                             */
/* -------------------------------------------------------------------------- */
function GcdLcmStudio({ lang }: { lang: 'en' | 'zh' }) {
  const [valA, setValA] = useState<string>('48');
  const [valB, setValB] = useState<string>('18');

  const numA = parseInt(valA, 10);
  const numB = parseInt(valB, 10);

  const isValid = !isNaN(numA) && !isNaN(numB) && numA > 0 && numB > 0;
  const sol = isValid ? solveGcdLcm(numA, numB) : null;

  const formatPrimeFactors = (factors: Record<number, number>) => {
    const keys = Object.keys(factors).map(Number).sort((x, y) => x - y);
    if (keys.length === 0) return '1';
    return keys
      .map((k) => (factors[k] > 1 ? `${k}^${factors[k]}` : `${k}`))
      .join(' × ');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {lang === 'en' ? 'Integer Inputs' : '输入两正整数'}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'First Number (a)' : '第一个正整数 a'}
              </label>
              <input
                type="number"
                min="1"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Second Number (b)' : '第二个正整数 b'}
              </label>
              <input
                type="number"
                min="1"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">{lang === 'en' ? 'Presets:' : '常用范例:'}</span>
            <button
              onClick={() => { setValA('48'); setValB('18'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              48, 18
            </button>
            <button
              onClick={() => { setValA('105'); setValB('252'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              105, 252
            </button>
            <button
              onClick={() => { setValA('360'); setValB('480'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              360, 480
            </button>
          </div>

          {sol && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 font-medium">
                    {lang === 'en' ? 'Greatest Common Divisor (GCD)' : '最大公约数 gcd(a, b)'}
                  </div>
                  <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
                    {sol.gcd}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">
                    {lang === 'en' ? 'Least Common Multiple (LCM)' : '最小公倍数 lcm(a, b)'}
                  </div>
                  <div className="text-2xl font-bold font-mono text-indigo-600 mt-1">
                    {sol.lcm}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
                <div>
                  <span className="text-slate-500">{valA} = </span>
                  <span className="font-mono font-semibold text-slate-800">{formatPrimeFactors(sol.primeFactorsA)}</span>
                </div>
                <div>
                  <span className="text-slate-500">{valB} = </span>
                  <span className="font-mono font-semibold text-slate-800">{formatPrimeFactors(sol.primeFactorsB)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Euclidean Algorithm Table */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {lang === 'en' ? 'Euclidean Algorithm (辗转相除法分步)' : '辗转相除法运算过程'}
          </div>

          {sol && (
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left font-mono">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">{lang === 'en' ? 'Step' : '步骤'}</th>
                    <th className="py-2 px-3">{lang === 'en' ? 'Equation' : '带余除法算式'}</th>
                    <th className="py-2 px-3 text-right">{lang === 'en' ? 'Remainder' : '余数 r'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sol.steps.map((st) => (
                    <tr key={st.step} className={st.remainder === 0 ? 'bg-blue-50/60 font-bold' : ''}>
                      <td className="py-2 px-3 text-slate-500">{st.step}</td>
                      <td className="py-2 px-3 text-slate-800">
                        {st.dividend} = {st.divisor} × {st.quotient} + {st.remainder}
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-blue-600">
                        {st.remainder}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Physics & Engineering Suite                                            */
/* -------------------------------------------------------------------------- */
function PhysicsStudio({ lang }: { lang: 'en' | 'zh' }) {
  const [subMode, setSubMode] = useState<'density' | 'ohms_law' | 'kinematics'>('density');

  // Density states
  const [mass, setMass] = useState('100');
  const [volume, setVolume] = useState('50');
  const [density, setDensity] = useState('');

  // Ohm's law states
  const [voltage, setVoltage] = useState('12');
  const [current, setCurrent] = useState('2');
  const [resistance, setResistance] = useState('');

  // Kinematics states
  const [v0, setV0] = useState('0');
  const [accel, setAccel] = useState('9.8');
  const [time, setTime] = useState('3');

  return (
    <div className="p-6 space-y-6">
      {/* Submode pill switcher */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <button
          onClick={() => setSubMode('density')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            subMode === 'density' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {lang === 'en' ? 'Density (ρ = m/V)' : '密度公式 (ρ = m/V)'}
        </button>
        <button
          onClick={() => setSubMode('ohms_law')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            subMode === 'ohms_law' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {lang === 'en' ? "Ohm's Law & Power" : '欧姆定律与电功率'}
        </button>
        <button
          onClick={() => setSubMode('kinematics')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            subMode === 'kinematics' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {lang === 'en' ? 'Kinematics Motion' : '匀变速直线运动'}
        </button>
      </div>

      {subMode === 'density' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Mass m (grams / kg)' : '质量 m (g)'}
              </label>
              <input
                type="number"
                step="any"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Volume V (cm³ / L)' : '体积 V (cm³)'}
              </label>
              <input
                type="number"
                step="any"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Density ρ (g/cm³)' : '密度 ρ (g/cm³)'}
              </label>
              <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-mono font-bold text-blue-700">
                {parseFloat(volume) > 0 && parseFloat(mass) > 0
                  ? (parseFloat(mass) / parseFloat(volume)).toFixed(4)
                  : '--'}
              </div>
            </div>
          </div>

          {/* Material presets */}
          <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
            <span className="text-slate-400 font-medium">{lang === 'en' ? 'Substance Presets:' : '常见物质:'}</span>
            <button
              onClick={() => { setDensity('1.0'); setVolume('100'); setMass('100'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              {lang === 'en' ? 'Water (1.0 g/cm³)' : '纯水 (1.0 g/cm³)'}
            </button>
            <button
              onClick={() => { setDensity('7.87'); setVolume('10'); setMass('78.7'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              {lang === 'en' ? 'Iron (7.87 g/cm³)' : '铁 (7.87 g/cm³)'}
            </button>
            <button
              onClick={() => { setDensity('19.32'); setVolume('5'); setMass('96.6'); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-xs cursor-pointer"
            >
              {lang === 'en' ? 'Gold (19.32 g/cm³)' : '黄金 (19.32 g/cm³)'}
            </button>
          </div>
        </div>
      )}

      {subMode === 'ohms_law' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Voltage V (Volts)' : '电压 V (伏特)'}
              </label>
              <input
                type="number"
                step="any"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Current I (Amps)' : '电流 I (安培)'}
              </label>
              <input
                type="number"
                step="any"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Resistance R (Ω)' : '电阻 R (欧姆)'}
              </label>
              <input
                type="number"
                step="any"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                placeholder={lang === 'en' ? 'Leave blank' : '留空自动求'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500">{lang === 'en' ? 'Calculated Power P: ' : '回路电功率 P：'}</span>
              <span className="font-mono font-bold text-base text-blue-700 ml-1">
                {(parseFloat(voltage) * parseFloat(current)).toFixed(2)} W
              </span>
            </div>
            <div>
              <span className="text-slate-500">{lang === 'en' ? 'Calculated Resistance R: ' : '电阻值 R：'}</span>
              <span className="font-mono font-bold text-base text-slate-800 ml-1">
                {parseFloat(current) > 0 ? (parseFloat(voltage) / parseFloat(current)).toFixed(2) : '--'} Ω
              </span>
            </div>
          </div>
        </div>
      )}

      {subMode === 'kinematics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Initial Velocity v₀ (m/s)' : '初速度 v₀ (m/s)'}
              </label>
              <input
                type="number"
                step="any"
                value={v0}
                onChange={(e) => setV0(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Acceleration a (m/s²)' : '加速度 a (m/s²)'}
              </label>
              <input
                type="number"
                step="any"
                value={accel}
                onChange={(e) => setAccel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Time t (seconds)' : '运动时间 t (秒)'}
              </label>
              <input
                type="number"
                step="any"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-500">{lang === 'en' ? 'Final Velocity v = v₀ + at' : '末速度 v = v₀ + at'}</div>
              <div className="text-xl font-bold font-mono text-blue-700 mt-1">
                {(parseFloat(v0) + parseFloat(accel) * parseFloat(time)).toFixed(2)} m/s
              </div>
            </div>
            <div>
              <div className="text-slate-500">{lang === 'en' ? 'Displacement s = v₀t + ½at²' : '总位移 s = v₀t + ½at²'}</div>
              <div className="text-xl font-bold font-mono text-indigo-700 mt-1">
                {(parseFloat(v0) * parseFloat(time) + 0.5 * parseFloat(accel) * Math.pow(parseFloat(time), 2)).toFixed(2)} m
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Circle & Sector Geometry Studio                                        */
/* -------------------------------------------------------------------------- */
function CircleSectorStudio({ lang }: { lang: 'en' | 'zh' }) {
  const [radius, setRadius] = useState('5');
  const [angle, setAngle] = useState('60');

  const r = parseFloat(radius);
  const theta = parseFloat(angle);

  const isValid = !isNaN(r) && r > 0;
  const area = isValid ? Math.PI * r * r : 0;
  const circ = isValid ? 2 * Math.PI * r : 0;
  const sectorArea = isValid && !isNaN(theta) ? (theta / 360) * area : 0;
  const arcLength = isValid && !isNaN(theta) ? (theta / 360) * circ : 0;
  const sphereVolume = isValid ? (4 / 3) * Math.PI * Math.pow(r, 3) : 0;
  const sphereArea = isValid ? 4 * Math.PI * Math.pow(r, 2) : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {lang === 'en' ? 'Circle & Sector Parameters' : '圆与扇形基础参量'}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Radius (r)' : '半径 r'}
              </label>
              <input
                type="number"
                step="any"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'en' ? 'Central Angle θ (°)' : '扇形圆心角 θ (度)'}
              </label>
              <input
                type="number"
                step="any"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Measurements grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs text-slate-500">{lang === 'en' ? 'Circle Area (πr²)' : '圆总面积 (πr²)'}</div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-1">{area.toFixed(3)}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs text-slate-500">{lang === 'en' ? 'Circumference (2πr)' : '圆周长 (2πr)'}</div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-1">{circ.toFixed(3)}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs text-slate-500">{lang === 'en' ? 'Arc Length (L)' : '扇形弧长 L'}</div>
              <div className="text-lg font-bold font-mono text-blue-700 mt-1">{arcLength.toFixed(3)}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs text-slate-500">{lang === 'en' ? 'Sector Area (S)' : '扇形面积 S'}</div>
              <div className="text-lg font-bold font-mono text-blue-700 mt-1">{sectorArea.toFixed(3)}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs text-slate-500">{lang === 'en' ? 'Sphere Volume (V)' : '球体体积 V'}</div>
              <div className="text-lg font-bold font-mono text-indigo-700 mt-1">{sphereVolume.toFixed(3)}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="text-xs text-slate-500">{lang === 'en' ? 'Sphere Area (4πr²)' : '球体表面积'}</div>
              <div className="text-lg font-bold font-mono text-indigo-700 mt-1">{sphereArea.toFixed(3)}</div>
            </div>
          </div>
        </div>

        {/* SVG Blueprint */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[240px]">
          <span className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
            {lang === 'en' ? 'Geometric Sector Visualizer' : '圆与扇形几何模型'}
          </span>
          <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto overflow-visible">
            {/* Full circle outline */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="#E2E8F0" strokeWidth="2" />

            {/* Sector arc */}
            {(() => {
              const radTheta = (Math.min(359.9, Math.max(0, theta)) * Math.PI) / 180;
              const x2 = 100 + 75 * Math.cos(radTheta);
              const y2 = 100 - 75 * Math.sin(radTheta);
              const largeArc = theta > 180 ? 1 : 0;
              const d = `M 100 100 L 175 100 A 75 75 0 ${largeArc} 0 ${x2} ${y2} Z`;

              return (
                <g>
                  <path d={d} fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="100" cy="100" r="3" fill="#1E40AF" />
                  <line x1="100" y1="100" x2="175" y2="100" stroke="#2563EB" strokeWidth="1.5" />
                  <text x="135" y="94" className="text-[10px] font-mono font-bold fill-blue-700">r={radius}</text>
                  <text x="110" y="85" className="text-[10px] font-mono font-bold fill-blue-900">θ={angle}°</text>
                </g>
              );
            })()}
          </svg>
          <div className="text-[11px] text-slate-500 mt-2 font-mono">
            A = πr² · S = ½r²θ
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. MathBridge LaTeX Studio                                                */
/* -------------------------------------------------------------------------- */
function MathBridgeStudio({ lang }: { lang: 'en' | 'zh' }) {
  const [latex, setLatex] = useState('\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}');
  const [copied, setCopied] = useState(false);

  const insertSymbol = (sym: string) => {
    setLatex((prev) => prev + sym);
  };

  const copyLatex = () => {
    navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const symbolPalette = [
    { label: '√x', val: '\\sqrt{x}' },
    { label: 'a/b', val: '\\frac{a}{b}' },
    { label: 'x²', val: '^{2}' },
    { label: '∑', val: '\\sum_{i=1}^{n}' },
    { label: '∫', val: '\\int_{a}^{b}' },
    { label: 'π', val: '\\pi' },
    { label: 'θ', val: '\\theta' },
    { label: 'α', val: '\\alpha' },
    { label: 'β', val: '\\beta' },
    { label: 'Δ', val: '\\Delta' },
    { label: '∞', val: '\\infty' },
    { label: '±', val: '\\pm' },
    { label: '≤', val: '\\le' },
    { label: '≥', val: '\\ge' },
    { label: '≈', val: '\\approx' },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {lang === 'en' ? 'LaTeX Formula & Typography Editor' : 'LaTeX 数学公式排版编辑器'}
        </span>
        <button
          onClick={copyLatex}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (lang === 'en' ? 'Copied' : '已复制') : (lang === 'en' ? 'Copy LaTeX' : '复制 LaTeX 代码')}</span>
        </button>
      </div>

      {/* Symbol Toolbar */}
      <div className="flex items-center gap-1.5 flex-wrap p-2 bg-slate-50 border border-slate-200 rounded-xl">
        <span className="text-[11px] font-medium text-slate-400 mr-1">{lang === 'en' ? 'Palette:' : '符号库:'}</span>
        {symbolPalette.map((s, idx) => (
          <button
            key={idx}
            onClick={() => insertSymbol(s.val)}
            className="px-2 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 text-xs font-mono rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Editor & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            {lang === 'en' ? 'Raw LaTeX Input' : 'LaTeX 源码输入'}
          </label>
          <textarea
            rows={4}
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            {lang === 'en' ? 'Typography Render Preview' : '学术公式渲染预览'}
          </label>
          <div className="w-full min-h-[105px] p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center font-serif text-lg text-slate-900 overflow-x-auto">
            {latex}
          </div>
        </div>
      </div>
    </div>
  );
}
