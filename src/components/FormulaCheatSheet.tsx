import React, { useState } from 'react';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface FormulaCheatSheetProps {
  lang: 'en' | 'zh';
}

interface FormulaEntry {
  titleEn: string;
  titleZh: string;
  category: string;
  formula: string;
  formulaLatex: string;
  descEn: string;
  descZh: string;
  variables: Array<{ sym: string; nameEn: string; nameZh: string }>;
  exampleEn: string;
  exampleZh: string;
}

export const FormulaCheatSheet: React.FC<FormulaCheatSheetProps> = ({ lang }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedAll, setExpandedAll] = useState(true);

  const formulas: FormulaEntry[] = [
    {
      titleEn: 'Pythagorean Theorem',
      titleZh: '勾股定理（毕达哥拉斯定理）',
      category: 'Geometry',
      formula: 'a² + b² = c²',
      formulaLatex: 'c = \\sqrt{a^2 + b^2}',
      descEn:
        'In any right-angled triangle, the area of the square whose side is the hypotenuse is equal to the sum of the areas of the squares whose sides are the two legs.',
      descZh:
        '在任何直角三角形中，两条直角边的平方和等于斜边的平方。可用于计算直角三角形的任意缺失边长及空间距离。',
      variables: [
        { sym: 'a, b', nameEn: 'Lengths of the two legs (perpendicular sides)', nameZh: '直角边 a 与 b' },
        { sym: 'c', nameEn: 'Length of the hypotenuse (opposite the 90° angle)', nameZh: '斜边 c' },
      ],
      exampleEn: 'If leg a = 3 and leg b = 4, then c = √(3² + 4²) = √(9 + 16) = √25 = 5.',
      exampleZh: '若直角边 a = 3，b = 4，则斜边 c = √(3² + 4²) = √25 = 5（勾三股四弦五）。',
    },
    {
      titleEn: 'Quadratic Formula',
      titleZh: '一元二次方程求根公式',
      category: 'Algebra',
      formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
      formulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      descEn:
        'Provides the closed-form solutions to any standard quadratic equation ax² + bx + c = 0. The discriminant Δ = b² - 4ac dictates whether roots are real or complex.',
      descZh:
        '标准一元二次方程 ax² + bx + c = 0 的求根通式。判别式 Δ = b² - 4ac > 0 时有两个不等实根，Δ = 0 时有两个相等实根，Δ < 0 时有两个共轭虚根。',
      variables: [
        { sym: 'a', nameEn: 'Quadratic coefficient (a ≠ 0)', nameZh: '二次项系数 (a ≠ 0)' },
        { sym: 'b', nameEn: 'Linear coefficient', nameZh: '一次项系数' },
        { sym: 'c', nameEn: 'Constant term', nameZh: '常数项' },
        { sym: 'Δ', nameEn: 'Discriminant = b² - 4ac', nameZh: '判别式 Δ = b² - 4ac' },
      ],
      exampleEn: 'For x² - 5x + 6 = 0: a=1, b=-5, c=6. Δ = 25 - 24 = 1. x = (5 ± 1)/2 => x₁ = 3, x₂ = 2.',
      exampleZh: '例如 x² - 5x + 6 = 0：a=1, b=-5, c=6。Δ = 25 - 24 = 1。x = (5 ± 1)/2，得到根为 3 和 2。',
    },
    {
      titleEn: 'Circle & Sphere Geometry',
      titleZh: '圆与球体几何核心公式',
      category: 'Geometry',
      formula: 'A = πr², C = 2πr, V = ⁴⁄₃πr³',
      formulaLatex: 'A = \\pi r^2, \\quad V = \\frac{4}{3}\\pi r^3',
      descEn:
        'Fundamental formulas governing 2D circular boundary/surface and 3D spherical volume based on constant π ≈ 3.14159265.',
      descZh:
        '圆的周长与面积、球体的表面积（S = 4πr²）与体积公式，基于数学常数 π 计算。',
      variables: [
        { sym: 'r', nameEn: 'Radius of circle or sphere', nameZh: '圆或球体半径' },
        { sym: 'd', nameEn: 'Diameter (2r)', nameZh: '直径 (d = 2r)' },
        { sym: 'π', nameEn: 'Archimedes constant (~3.14159)', nameZh: '圆周率常数' },
      ],
      exampleEn: 'For radius r = 3: Area = π(3²) ≈ 28.274, Sphere Volume = (4/3)π(27) ≈ 113.097.',
      exampleZh: '若半径 r = 3：圆面积 A = 9π ≈ 28.274，球体积 V = (4/3)π(27) = 36π ≈ 113.097。',
    },
    {
      titleEn: "Ohm's Law & Electric Power",
      titleZh: '欧姆定律与焦耳电功率',
      category: 'Physics',
      formula: 'V = I · R, P = V · I = I²R = V²/R',
      formulaLatex: 'V = IR, \\quad P = VI = I^2 R = \\frac{V^2}{R}',
      descEn:
        'The foundational law of electrical circuits relating electromotive force (volts), direct current (amperes), resistance (ohms), and dissipated power (watts).',
      descZh:
        '经典电学基石：描述电压、电流与电阻的线性关系，以及能量耗散功率的计算公式。',
      variables: [
        { sym: 'V', nameEn: 'Voltage (Volts, V)', nameZh: '电压 (伏特, V)' },
        { sym: 'I', nameEn: 'Current (Amperes, A)', nameZh: '电流 (安培, A)' },
        { sym: 'R', nameEn: 'Resistance (Ohms, Ω)', nameZh: '电阻 (欧姆, Ω)' },
        { sym: 'P', nameEn: 'Power (Watts, W)', nameZh: '电功率 (瓦特, W)' },
      ],
      exampleEn: 'With 12V supply across 4Ω resistor: Current I = 12/4 = 3A. Power P = 12 × 3 = 36W.',
      exampleZh: '12V 供电驱动 4Ω 负载：电流 I = 12/4 = 3A，功率 P = 12 × 3 = 36W。',
    },
    {
      titleEn: "Heron's Formula (Triangle Area from 3 Sides)",
      titleZh: '海伦公式（三边求任意三角形面积）',
      category: 'Geometry',
      formula: 'A = √(s(s-a)(s-b)(s-c)), where s = (a+b+c)/2',
      formulaLatex: 's = \\frac{a+b+c}{2}, \\quad A = \\sqrt{s(s-a)(s-b)(s-c)}',
      descEn:
        'Computes the area of any general scalene, isosceles, or equilateral triangle using only the lengths of its three sides without requiring height calculation.',
      descZh:
        '仅通过三角形三边长度直接计算面积，无需做高线。必须满足三角不等式 (a+b>c, a+c>b, b+c>a)。',
      variables: [
        { sym: 'a, b, c', nameEn: 'Three side lengths', nameZh: '三角形三条边长' },
        { sym: 's', nameEn: 'Semi-perimeter = (a + b + c)/2', nameZh: '半周长 s' },
      ],
      exampleEn: 'For sides 7, 8, 9: s = 12. Area = √(12 × 5 × 4 × 3) = √720 = 12√5 ≈ 26.83.',
      exampleZh: '三边为 7, 8, 9：半周长 s = 12。面积 A = √(12 × 5 × 4 × 3) = √720 = 12√5 ≈ 26.83。',
    },
  ];

  const handleCopy = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="cheat-sheet" className="scroll-mt-20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {lang === 'en'
                ? 'Mathematical & Science Formula Cheat Sheet'
                : '常用数学与科学公式速查手册'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'en'
              ? 'Complete reference guide with equations, variable definitions, and step-by-step examples.'
              : '权威公式推导、变量解析与实用算例参考，便于学生与工程师日常速查。'}
          </p>
        </div>

        <button
          onClick={() => setExpandedAll(!expandedAll)}
          className="self-start sm:self-auto text-xs text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1 cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          {expandedAll ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Collapse All' : '折叠全部'}</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Expand All' : '展开全部'}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {formulas.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs transition-all hover:border-slate-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
                    {lang === 'en' ? item.titleEn : item.titleZh}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {lang === 'en' ? item.descEn : item.descZh}
                </p>
              </div>

              {/* Formula code banner */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-mono text-xs font-semibold tracking-wide">
                  {item.formula}
                </span>
                <button
                  onClick={() => handleCopy(item.formula, `f-${idx}`)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Copy formula text"
                >
                  {copiedId === `f-${idx}` ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {expandedAll && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Variables list */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    {lang === 'en' ? 'Variable Definitions:' : '变量说明：'}
                  </h4>
                  <ul className="space-y-1.5 text-slate-600">
                    {item.variables.map((v, vIdx) => (
                      <li key={vIdx} className="flex items-start gap-2">
                        <span className="font-mono font-bold text-slate-900 shrink-0 bg-slate-100 px-1 rounded-xs">
                          {v.sym}
                        </span>
                        <span>{lang === 'en' ? v.nameEn : v.nameZh}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example calculation */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h4 className="font-semibold text-slate-800 mb-1">
                    {lang === 'en' ? 'Practical Example:' : '实际计算范例：'}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-mono text-[11px]">
                    {lang === 'en' ? item.exampleEn : item.exampleZh}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
