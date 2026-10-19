import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookMarked, Compass, Lightbulb, ShieldCheck, Ruler, Monitor, Building2 } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: '勾股定理的标准计算公式是什么？',
    a: '勾股定理（Pythagorean Theorem）指出：在平面上的任意直角三角形中，两直角边 a 和 b 的平方和等于斜边 c 的平方，公式表示为 a² + b² = c²。求斜边公式为 c = √(a² + b²)；已知斜边求直角边公式为 a = √(c² - b²) 或 b = √(c² - a²)。'
  },
  {
    q: '什么是“最简二次根式”？本计算器如何自动化简根号？',
    a: '当计算所得的斜边或直角边无法开出整数时，数学规范要求将其化为最简二次根式。最简二次根式满足两个条件：被开方数中不含能开得尽方的因数或因式，且分母中不含根号。例如，计算得到 √20 时，将其分解为 √(4 × 5) = √(2² × 5) = 2√5；计算 √18 则化为 3√2。本计算器内置质因数提取算法，能自动输出最简根式形式和小数逼近值。'
  },
  {
    q: '常见的勾股数有哪些？有什么记忆口诀？',
    a: '满足 a² + b² = c² 的正整数组合称为勾股数。常见基础勾股数组有：(3, 4, 5)、(5, 12, 13)、(7, 24, 25)、(8, 15, 17)、(9, 40, 41)、(11, 60, 61)、(12, 35, 37)、(20, 21, 29) 等。口诀简记如：“勾三股四弦五”、“五十二配十三”、“七二十四二十五”、“八十五十七”。同时，任何勾股数乘以任意正整数 k 所得的组（如 6, 8, 10）同样也是勾股数。'
  },
  {
    q: '勾股定理只能用于直角三角形吗？',
    a: '是的，勾股定理仅适用于有一个角为 90° 的直角三角形。对于一般的锐角三角形或钝角三角形，需要使用推广形式——余弦定理（Law of Cosines）：c² = a² + b² - 2ab·cos(C)。当 ∠C = 90° 时，cos(90°) = 0，余弦定理即蜕化为勾股定理 a² + b² = c²。'
  },
  {
    q: '什么是本原勾股数（Primitive Pythagorean Triples）？',
    a: '若一组勾股数 (a, b, c) 的最大公约数为 1（即三数两两互质），则称之为本原勾股数，例如 (3, 4, 5) 和 (5, 12, 13)。而 (6, 8, 10) 因有公约数 2，属于非本原（派生）勾股数。通过欧几里得参数公式，可以无遗漏地生成所有本原勾股数。'
  },
  {
    q: '在日常工程或生活中，勾股定理有哪些实用场景？',
    a: '1. 建筑施工放线（3-4-5法则找直角）；2. 电视、显示器或手机屏幕尺寸测量（按对角线计算宽高）；3. 梯子安全摆放计算（梯长与离墙安全距离）；4. 地图与 GPS 欧氏直线距离测算；5. 航海与无人机高空视距定位。'
  }
];

export const SeoContent: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-10">
      {/* Article Section: Comprehensive Math Knowledge for Google Indexing */}
      <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8 text-slate-700 leading-relaxed">
        <div>
          <span className="text-blue-600 font-bold text-xs uppercase tracking-wider block mb-1">
            权威几何知识指南 (Knowledge Base)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            什么是勾股定理？公式推导、几何证明与全流程解析
          </h2>
        </div>

        <div className="prose prose-slate max-w-none text-sm sm:text-base space-y-4">
          <p>
            <strong>勾股定理</strong>（西方称<strong>毕达哥拉斯定理</strong>，Pythagorean Theorem）是初等几何学中最重要的定理之一。
            在中国古代，《周髀算经》便记载了商高提出的“勾广三，股修四，径隅五”的论断，故在中国通常称直角三角形中较短的直角边为“勾”，较长的直角边为“股”，斜边为“弦”。
          </p>

          {/* Formula Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
              <span className="text-xs font-bold text-blue-700 block mb-1">基础公式 (Standard)</span>
              <div className="text-xl font-mono font-bold text-blue-900">a² + b² = c²</div>
              <p className="text-xs text-slate-600 mt-2">直角边平方和等于斜边平方</p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-700 block mb-1">求斜边 c (Hypotenuse)</span>
              <div className="text-xl font-mono font-bold text-indigo-900">c = √(a² + b²)</div>
              <p className="text-xs text-slate-600 mt-2">已知两直角边，求斜边长度</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 block mb-1">求直角边 a 或 b (Legs)</span>
              <div className="text-xl font-mono font-bold text-emerald-900">a = √(c² - b²)</div>
              <p className="text-xs text-slate-600 mt-2">已知斜边与一直角边，求另一直角边</p>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">
            赵爽弦图与经典的几何拼图证明法
          </h3>
          <p>
            三国时期的数学家赵爽在为《周髀算经》作注时，创制了著名的<strong>“赵爽弦图”</strong>。
            该证明通过将 4 个全等的直角三角形（边长分别为 a, b, c）拼成一个边长为 c 的大正方形，中央留下一个边长为 (b - a) 的小正方形：
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1 my-3">
            <div>大正方形面积 = 4个直角三角形面积 + 中间小正方形面积</div>
            <div>c² = 4 × (½ × a × b) + (b - a)²</div>
            <div>c² = 2ab + (b² - 2ab + a²)</div>
            <div className="font-bold text-blue-700">整理得：c² = a² + b²  （证毕）</div>
          </div>
          <p>
            这种纯几何直观的“割补证明法”逻辑严密、形式优美，成为世界数学史上最璀璨的明珠之一。
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">
            现实生活与工程项目中的 4 大核心应用
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">建筑与木工找直角 (3-4-5法则)</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  工人用皮尺测量两边分别为 3 米和 4 米，如果斜对角恰好是 5 米，则两堵墙之间完全垂直（90度）。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
              <Monitor className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">显示器与手机屏幕尺寸计算</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  市售屏幕标称的“55寸”或“6.7寸”是指对角线长度。结合 16:9 比例利用勾股定理可精确反推屏幕的宽与高。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
              <Ruler className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">梯子高空摆放安全距离</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  已知需要攀登的垂直高度与梯子本身长度，利用 a = √(c² - b²) 可计算梯脚离墙壁的安全距离，防止滑脱。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
              <Compass className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">航海、飞行与地图欧氏距离</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  平面直角坐标系中，两点 (x₁, y₁) 和 (x₂, y₂) 之间的直线距离 d = √[(x₂-x₁)² + (y₂-y₁)²]，本质上就是勾股定理。
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ Section with Rich Schema.org Snippet Intent */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-blue-600 font-bold text-xs uppercase tracking-wider block mb-1">
            常见问答 (Google Rich Snippets FAQ)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            关于勾股定理的常见疑问与技巧
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            收录搜索引擎上关于直角三角形求边长、开根号化简与勾股数的最高频热搜问题。
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left bg-white hover:bg-slate-50/80 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-bold">
                      Q
                    </span>
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 bg-white text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
