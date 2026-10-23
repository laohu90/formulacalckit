import React, { useState } from 'react';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { QuickSolverId } from '../types';

interface FormulaCheatSheetProps {
  lang: 'en' | 'zh';
  onSelectSolver?: (solverId: QuickSolverId) => void;
}

interface FormulaEntry {
  titleEn: string;
  titleZh: string;
  categoryEn: string;
  categoryZh: string;
  formula: string;
  formulaLatex: string;
  quickSolverId?: QuickSolverId;
  descEn: string;
  descZh: string;
  variables: Array<{ sym: string; nameEn: string; nameZh: string }>;
  exampleEn: string;
  exampleZh: string;
}

export const FormulaCheatSheet: React.FC<FormulaCheatSheetProps> = ({
  lang,
  onSelectSolver,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedAll, setExpandedAll] = useState(true);

  const formulas: FormulaEntry[] = [
    {
      titleEn: 'Pythagorean Theorem',
      titleZh: '勾股定理（毕达哥拉斯定理）',
      categoryEn: 'Geometry',
      categoryZh: '几何',
      formula: 'a² + b² = c²',
      formulaLatex: 'c = \\sqrt{a^2 + b^2}',
      quickSolverId: 'pythagorean',
      descEn:
        'In any right-angled triangle, the area of the square on the hypotenuse equals the sum of the areas of squares on the two legs.',
      descZh:
        '在任何平面直角三角形中，两条直角边的平方和等于斜边的平方。可快速求解第三边长或化简最简二次根式。',
      variables: [
        { sym: 'a, b', nameEn: 'Lengths of the two perpendicular legs', nameZh: '直角边 a 与 b' },
        { sym: 'c', nameEn: 'Length of the hypotenuse (opposite the 90° angle)', nameZh: '斜边 c' },
      ],
      exampleEn: 'If leg a = 3 and leg b = 4, then c = √(3² + 4²) = √25 = 5 (3-4-5 triple).',
      exampleZh: '若直角边 a = 3，b = 4，则斜边 c = √(3² + 4²) = √25 = 5（勾三股四弦五）。',
    },
    {
      titleEn: 'Quadratic Formula & Vieta',
      titleZh: '一元二次方程求根与韦达定理',
      categoryEn: 'Algebra',
      categoryZh: '代数',
      formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
      formulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      quickSolverId: 'quadratic',
      descEn:
        'Standard quadratic solver. The discriminant Δ = b² - 4ac governs real distinct roots, repeated root, or complex conjugates.',
      descZh:
        '标准一元二次方程 ax² + bx + c = 0 的求根公式。根据判别式 Δ > 0、= 0、< 0 确定两实根或复数虚根。',
      variables: [
        { sym: 'a, b, c', nameEn: 'Polynomial coefficients (a ≠ 0)', nameZh: '二次项、一次项及常数系数' },
        { sym: 'Δ', nameEn: 'Discriminant = b² - 4ac', nameZh: '判别式 Δ = b² - 4ac' },
      ],
      exampleEn: 'For x² - 5x + 6 = 0: Δ = 25 - 24 = 1 > 0. Roots x₁ = 3, x₂ = 2.',
      exampleZh: '对于 x² - 5x + 6 = 0：Δ = 25 - 24 = 1。求得根 x₁ = 3, x₂ = 2。',
    },
    {
      titleEn: 'Circle, Sector & Sphere Geometry',
      titleZh: '圆、扇形与球体几何体系',
      categoryEn: 'Geometry',
      categoryZh: '几何',
      formula: 'A = πr², C = 2πr, S_sector = ½r²θ, V_sphere = ⁴⁄₃πr³',
      formulaLatex: 'A = \\pi r^2, \\quad C = 2\\pi r, \\quad S = \\frac{1}{2}r^2\\theta',
      quickSolverId: 'circle',
      descEn:
        'Fundamental Euclidean circular measurements relating radius, arc length, sector surface, and spatial sphere volume.',
      descZh:
        '欧几里得圆几何基本公式族：求解圆周长、圆面积、扇形弧长、扇形面积与三维球体体积。',
      variables: [
        { sym: 'r', nameEn: 'Radius', nameZh: '圆或球体半径 r' },
        { sym: 'θ', nameEn: 'Central angle (radians or degrees)', nameZh: '圆心角 θ' },
      ],
      exampleEn: 'For radius r = 5, angle 60°: Arc length L = (60/360) × 10π ≈ 5.236.',
      exampleZh: '若半径 r = 5，圆心角 60°：弧长 L = 5 × (π/3) ≈ 5.236。',
    },
    {
      titleEn: "Ohm's Law & Dissipated Power",
      titleZh: '欧姆定律与电功率公式',
      categoryEn: 'Physics',
      categoryZh: '物理',
      formula: 'V = I · R, P = V · I = I²R = V²/R',
      formulaLatex: 'V = IR, \\quad P = VI = I^2R',
      quickSolverId: 'ohms_law',
      descEn:
        'Fundamental law of electrical circuits connecting voltage, current, resistance, and dissipated thermal power.',
      descZh:
        '直流与线性交流电路基本定律：描述电压、电流与电阻的相互约束以及能量耗散功率。',
      variables: [
        { sym: 'V', nameEn: 'Voltage (Volts, V)', nameZh: '电压 (V)' },
        { sym: 'I', nameEn: 'Current (Amperes, A)', nameZh: '电流 (A)' },
        { sym: 'R', nameEn: 'Resistance (Ohms, Ω)', nameZh: '电阻 (Ω)' },
        { sym: 'P', nameEn: 'Power (Watts, W)', nameZh: '功率 (W)' },
      ],
      exampleEn: 'With 12V and 4Ω load: Current I = 12/4 = 3A. Power P = 12 × 3 = 36W.',
      exampleZh: '12V 供电驱动 4Ω 负载：电流 I = 3A，消耗电功率 P = 36W。',
    },
    {
      titleEn: 'Physical Density & Buoyancy',
      titleZh: '物理密度与阿基米德浮力',
      categoryEn: 'Physics',
      categoryZh: '物理',
      formula: 'ρ = m / V, F_buoyancy = ρ_fluid · g · V_disp',
      formulaLatex: '\\rho = \\frac{m}{V}, \\quad F_b = \\rho g V',
      quickSolverId: 'ohms_law',
      descEn:
        'Volumetric mass density and fluid displacement buoyancy force formula in Newtonian mechanics.',
      descZh:
        '描述物体单位体积所包含质量的物理量，并结合阿基米德原理计算排开流体所受静浮力。',
      variables: [
        { sym: 'ρ', nameEn: 'Density (g/cm³ or kg/m³)', nameZh: '物质密度 ρ' },
        { sym: 'm', nameEn: 'Mass', nameZh: '质量 m' },
        { sym: 'V', nameEn: 'Volume', nameZh: '体积 V' },
      ],
      exampleEn: 'An iron block with mass 78.7g and volume 10cm³ has density ρ = 7.87 g/cm³.',
      exampleZh: '质量 78.7g、体积 10cm³ 的铁块密度 ρ = 78.7/10 = 7.87 g/cm³。',
    },
    {
      titleEn: 'Euclidean GCD & Prime Factorization',
      titleZh: '最大公约数与最小公倍数定理',
      categoryEn: 'Arithmetic',
      categoryZh: '算术',
      formula: 'gcd(a, b) · lcm(a, b) = |a · b|',
      formulaLatex: '\\gcd(a, b) \\cdot \\operatorname{lcm}(a, b) = |a \\cdot b|',
      quickSolverId: 'gcd_lcm',
      descEn:
        'Euclidean division algorithm for greatest common divisor and least common multiple factorization.',
      descZh:
        '通过辗转相除法带余除法逐步求取两数最大公约数，并利用 gcd 与 lcm 的互逆积定理快速求得公倍数。',
      variables: [
        { sym: 'a, b', nameEn: 'Positive integers', nameZh: '任意两正整数 a 与 b' },
        { sym: 'gcd, lcm', nameEn: 'Greatest common divisor and least common multiple', nameZh: '最大公约数与最小公倍数' },
      ],
      exampleEn: 'For a = 48, b = 18: gcd = 6, lcm = (48 × 18)/6 = 144.',
      exampleZh: '对于 a = 48, b = 18：gcd = 6，lcm = (48 × 18)/6 = 144。',
    },
  ];

  const handleCopy = async (formula: string, id: string) => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  const handleSolve = (id?: QuickSolverId) => {
    if (id && onSelectSolver) {
      onSelectSolver(id);
      const el = document.getElementById('workstation');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="cheat-sheet" className="scroll-mt-20 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
            <span>{lang === 'en' ? 'REFERENCE ARCHIVE' : '公式速查手册'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">
              {lang === 'en' ? 'Core STEM identities & mathematical definitions' : '核心数理定理 · 变量定义与典型算例'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {lang === 'en' ? 'Formula Reference & Mathematical Cheat Sheet' : '常用数学与科学公式速查库'}
          </h2>
        </div>

        <button
          onClick={() => setExpandedAll(!expandedAll)}
          className="self-start sm:self-auto text-xs text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1 cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          {expandedAll ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Collapse Details' : '折叠详情'}</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Expand Details' : '展开详情'}</span>
            </>
          )}
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4">
        {formulas.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs transition-all hover:border-slate-300"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {lang === 'en' ? item.categoryEn : item.categoryZh}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {lang === 'en' ? item.titleEn : item.titleZh}
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  {lang === 'en' ? item.descEn : item.descZh}
                </p>
              </div>

              {/* Actions & Code */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-mono text-xs font-semibold tracking-wide">
                  {item.formula}
                </span>

                <button
                  onClick={() => handleCopy(item.formula, `f-${idx}`)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title={lang === 'en' ? 'Copy formula' : '复制公式'}
                >
                  {copiedId === `f-${idx}` ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {item.quickSolverId && onSelectSolver && (
                  <button
                    onClick={() => handleSolve(item.quickSolverId)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lang === 'en' ? 'Solve' : '求解'}</span>
                  </button>
                )}
              </div>
            </div>

            {expandedAll && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Variables */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    {lang === 'en' ? 'Variable Definitions:' : '变量说明：'}
                  </h4>
                  <ul className="space-y-1.5 text-slate-600">
                    {item.variables.map((v, vIdx) => (
                      <li key={vIdx} className="flex items-start gap-2">
                        <span className="font-mono font-bold text-slate-900 shrink-0 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                          {v.sym}
                        </span>
                        <span>{lang === 'en' ? v.nameEn : v.nameZh}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    {lang === 'en' ? 'Practical Calculation Example:' : '实际计算算例：'}
                  </h4>
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl font-mono text-slate-700 leading-relaxed text-[11px]">
                    {lang === 'en' ? item.exampleEn : item.exampleZh}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
