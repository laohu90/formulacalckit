import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { roundDisplay } from '../utils/pythagorean';

interface Props {
  onApplySpecial?: (a: number, b: number) => void;
}

export const SpecialTriangles: React.FC<Props> = ({ onApplySpecial }) => {
  // Mini interactive state for 30-60-90
  const [shortLeg30, setShortLeg30] = useState<number>(1);
  // Mini interactive state for 45-45-90
  const [leg45, setLeg45] = useState<number>(1);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          几何速查 · 特殊直角三角形
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          经典特殊直角三角形与边长比率
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
          在初高中几何考试与工程制图中，30°-60°-90° 与 45°-45°-90° 是最常考的两类特殊直角三角形。掌握其固定比例可免去复杂的开方计算。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: 45°-45°-90° 等腰直角三角形 */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-lg">
                45° - 45° - 90° 等腰直角三角形
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold">
                1 : 1 : √2
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              两直角边长相等，斜边长度是直角边的 <strong className="text-slate-800">√2 倍（约 1.414 倍）</strong>。常见于正方形的对角线分割。
            </p>

            {/* Formula badge */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1 mb-4">
              <div>• 直角边 a = b = x</div>
              <div>• 斜边 c = x√2 ≈ 1.4142x</div>
              <div>• 面积 S = ½x²</div>
            </div>

            {/* Live Interactive Ratio Tester */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                设定直角边 x:
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={leg45}
                onChange={(e) => setLeg45(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-sm font-bold text-slate-800 mb-2"
              />
              <div className="text-slate-600 font-mono space-y-0.5 pt-1 border-t border-slate-100">
                <div>斜边 c = {leg45 === 1 ? '√2' : `${leg45}√2`} ≈ {roundDisplay(leg45 * Math.SQRT2, 4)}</div>
                <div>面积 S = {roundDisplay(0.5 * leg45 * leg45, 4)}</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200/80">
            {onApplySpecial && (
              <button
                onClick={() => onApplySpecial(leg45, leg45)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                代入主计算器查看完整推导
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Card 2: 30°-60°-90° 直角三角形 */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-lg">
                30° - 60° - 90° 直角三角形
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-mono font-bold">
                1 : √3 : 2
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              30°角所对的直角边（短边）为斜边的一半；60°角所对直角边（长边）是短边的 <strong className="text-slate-800">√3 倍（约 1.732 倍）</strong>。
            </p>

            {/* Formula badge */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1 mb-4">
              <div>• 短直角边 a = x (对 30° 角)</div>
              <div>• 长直角边 b = x√3 ≈ 1.7321x (对 60° 角)</div>
              <div>• 斜边 c = 2x</div>
              <div>• 面积 S = (√3 / 2)x²</div>
            </div>

            {/* Live Interactive Ratio Tester */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                设定短边 a (x):
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={shortLeg30}
                onChange={(e) => setShortLeg30(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-sm font-bold text-slate-800 mb-2"
              />
              <div className="text-slate-600 font-mono space-y-0.5 pt-1 border-t border-slate-100">
                <div>长直角边 b = {shortLeg30 === 1 ? '√3' : `${shortLeg30}√3`} ≈ {roundDisplay(shortLeg30 * Math.sqrt(3), 4)}</div>
                <div>斜边 c = {roundDisplay(2 * shortLeg30, 4)}</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200/80">
            {onApplySpecial && (
              <button
                onClick={() => onApplySpecial(shortLeg30, roundDisplay(shortLeg30 * Math.sqrt(3), 4) as any)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                代入主计算器查看完整推导
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
