import React, { useState } from 'react';
import { Copy, Check, Sparkles, BookOpen, ChevronDown, ChevronUp, Layers, Calculator } from 'lucide-react';
import { SolveResult, decimalValFormat, roundDisplay } from '../utils/pythagorean';

interface Props {
  data: SolveResult;
  precision: number;
}

export const ResultDisplay: React.FC<Props> = ({ data, precision }) => {
  const [copiedResult, setCopiedResult] = useState(false);
  const [copiedSteps, setCopiedSteps] = useState(false);
  const [showDetailedSteps, setShowDetailedSteps] = useState(true);

  const { target, a, b, c, unit, radical, area, perimeter, heightC, inradius, circumradius, steps, isPythagoreanTriple } = data;

  const targetName = target === 'c' ? '斜边 c' : target === 'a' ? '直角边 a' : '直角边 b';
  const targetSymbol = target;
  const unitSuffix = unit ? ` ${unit}` : '';

  const formattedDecimal = decimalValFormat(radical.decimalValue, precision);

  const handleCopyResult = () => {
    const text = `${targetSymbol} = ${radical.exactString}${unitSuffix} (≈ ${formattedDecimal}${unitSuffix})`;
    navigator.clipboard.writeText(text);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  const handleCopyAllSteps = () => {
    const text = [
      `【勾股定理计算步骤】`,
      `已知: ${target === 'c' ? `a = ${a}, b = ${b}` : target === 'a' ? `c = ${c}, b = ${b}` : `c = ${c}, a = ${a}`}${unitSuffix}`,
      `1. 公式: ${steps.formula}`,
      `2. 代入数值: ${steps.substitution}`,
      `3. 平方计算: ${steps.squareCalculation}`,
      radical.factorizationSteps.length > 0 ? `4. 根号化简: ${steps.factorizationNote}` : '',
      `5. 最简结果: ${targetSymbol} = ${radical.exactString}${unitSuffix} ≈ ${formattedDecimal}${unitSuffix}`,
      `三角形面积: ${roundDisplay(area, precision)}${unit ? ` ${unit}²` : ''}`,
      `三角形周长: ${roundDisplay(perimeter, precision)}${unitSuffix}`,
      `斜边高: ${roundDisplay(heightC, precision)}${unitSuffix}`
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(text);
    setCopiedSteps(true);
    setTimeout(() => setCopiedSteps(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Primary Result Banner */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white rounded-2xl border-2 border-blue-200/90 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
              计算结果
            </span>
            <span className="text-slate-600 font-semibold text-sm">
              求得 {targetName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isPythagoreanTriple && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold">
                <Sparkles className="w-3 h-3 text-amber-600" />
                标准勾股数组合
              </span>
            )}
            <button
              onClick={handleCopyResult}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-xs font-medium shadow-2xs transition-all cursor-pointer"
              title="复制简要结果"
            >
              {copiedResult ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制结果</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Big Formula Result Display */}
        <div className="my-3 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
              {targetSymbol} =
            </span>
            {/* Primary Exact Form (Simplified Radical) */}
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight font-mono">
              {radical.exactString}
            </span>
            {unit && (
              <span className="text-lg font-semibold text-slate-600">
                {unit}
              </span>
            )}
          </div>

          {/* Approx Decimal badge if not exact integer */}
          {!radical.isInteger && (
            <div className="flex items-center gap-1.5 text-slate-600 font-mono text-base sm:text-lg">
              <span className="text-slate-400">≈</span>
              <span className="font-semibold text-slate-800">{formattedDecimal}</span>
              {unit && <span className="text-xs text-slate-500">{unit}</span>}
            </div>
          )}
        </div>

        {/* Radical details subline */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-blue-100 text-xs text-slate-600">
          <div>
            <span className="text-slate-400">最简二次根式: </span>
            <strong className="text-slate-800 font-mono">{radical.exactString}</strong>
          </div>
          <span className="text-slate-300">•</span>
          <div>
            <span className="text-slate-400">原始根号式: </span>
            <span className="text-slate-700 font-mono">{steps.radicalExpression}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div>
            <span className="text-slate-400">小数精度: </span>
            <span className="text-slate-700 font-mono">{precision} 位小数</span>
          </div>
        </div>
      </div>

      {/* Step by Step Breakdown (Accordion Card) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div
          onClick={() => setShowDetailedSteps(!showDetailedSteps)}
          className="w-full px-5 py-3.5 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h4 className="font-bold text-slate-800 text-sm">
              详细逐步解题推导过程 (Step-by-Step Solution)
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyAllSteps();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-medium transition-all"
            >
              {copiedSteps ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600">全部步骤已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-500" />
                  <span>复制完整步骤</span>
                </>
              )}
            </button>
            {showDetailedSteps ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </div>

        {showDetailedSteps && (
          <div className="p-5 space-y-4 text-sm">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="font-semibold text-slate-800">选用勾股定理变形公式：</p>
                <div className="mt-1 font-mono text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 inline-block font-medium">
                  {steps.formula}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="font-semibold text-slate-800">将已知数值代入公式中：</p>
                <div className="mt-1 font-mono text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 inline-block font-medium">
                  {steps.substitution}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="font-semibold text-slate-800">执行两数平方与加减算术：</p>
                <div className="mt-1 font-mono text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 inline-block font-medium">
                  {steps.squareCalculation}
                </div>
              </div>
            </div>

            {/* Step 4: Radical Simplification Factorization */}
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div>
                <p className="font-semibold text-slate-800">最简二次根式化简分析：</p>
                <div className="mt-1 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                  {radical.factorizationSteps.map((step, idx) => (
                    <div key={idx} className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="font-mono text-xs sm:text-sm text-slate-800">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5: Final Result */}
            <div className="flex items-start gap-3 pt-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                5
              </span>
              <div>
                <p className="font-semibold text-slate-800">得出结论：</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono font-bold">
                    精确根式: {targetSymbol} = {radical.exactString}{unitSuffix}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                    小数近似: ≈ {formattedDecimal}{unitSuffix}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Associated Triangle Properties Metric Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
        <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          全量几何属性一览 (Geometric Properties)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block mb-0.5">三角形面积 (S)</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {roundDisplay(area, precision)}
              <span className="text-xs font-normal text-slate-500 ml-1">
                {unit ? `${unit}²` : '平方单位'}
              </span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">S = ½ × a × b</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block mb-0.5">三角形周长 (P)</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {roundDisplay(perimeter, precision)}
              <span className="text-xs font-normal text-slate-500 ml-1">{unit}</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">P = a + b + c</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block mb-0.5">斜边上的高 (h_c)</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {roundDisplay(heightC, precision)}
              <span className="text-xs font-normal text-slate-500 ml-1">{unit}</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">h_c = (a × b) / c</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block mb-0.5">锐角 α (∠A)</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {roundDisplay(data.angleAlphaDeg, 2)}°
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              ≈ {roundDisplay(data.angleAlphaRad, 3)} rad
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block mb-0.5">锐角 β (∠B)</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {roundDisplay(data.angleBetaDeg, 2)}°
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              ≈ {roundDisplay(data.angleBetaRad, 3)} rad
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 block mb-0.5">外接圆半径 (R)</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {roundDisplay(circumradius, precision)}
              <span className="text-xs font-normal text-slate-500 ml-1">{unit}</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">R = c / 2 (斜边一半)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
