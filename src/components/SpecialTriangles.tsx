import React, { useState } from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { roundDisplay } from '../utils/pythagorean';
import { Language, translations } from '../i18n/translations';

interface Props {
  lang: Language;
  onApplySpecial?: (a: number, b: number) => void;
}

export const SpecialTriangles: React.FC<Props> = ({ lang, onApplySpecial }) => {
  const [shortLeg30, setShortLeg30] = useState<number>(1);
  const [leg45, setLeg45] = useState<number>(1);

  const t = translations[lang].special;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          {t.badge}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t.title}
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: 45°-45°-90° 等腰直角三角形 */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-lg">
                {t.t45Title}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold">
                {t.t45Ratio}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {t.t45Desc}
            </p>

            {/* Formula badge */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1 mb-4">
              <div>{t.t45FormulaLeg}</div>
              <div>{t.t45FormulaHyp}</div>
              <div>{t.t45FormulaArea}</div>
            </div>

            {/* Live Interactive Ratio Tester */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                {t.t45InputLabel}
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
                <div>
                  c = {leg45 === 1 ? '√2' : `${leg45}√2`} ≈ {roundDisplay(leg45 * Math.SQRT2, 4)}
                </div>
                <div>S = {roundDisplay(0.5 * leg45 * leg45, 4)}</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200/80">
            {onApplySpecial && (
              <button
                onClick={() => onApplySpecial(leg45, leg45)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                {t.t45ApplyBtn}
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
                {t.t30Title}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-mono font-bold">
                {t.t30Ratio}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {t.t30Desc}
            </p>

            {/* Formula badge */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1 mb-4">
              <div>{t.t30FormulaShort}</div>
              <div>{t.t30FormulaLong}</div>
              <div>{t.t30FormulaHyp}</div>
              <div>{t.t30FormulaArea}</div>
            </div>

            {/* Live Interactive Ratio Tester */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                {t.t30InputLabel}
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
                <div>
                  b = {shortLeg30 === 1 ? '√3' : `${shortLeg30}√3`} ≈ {roundDisplay(shortLeg30 * Math.sqrt(3), 4)}
                </div>
                <div>c = {roundDisplay(2 * shortLeg30, 4)}</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200/80">
            {onApplySpecial && (
              <button
                onClick={() => onApplySpecial(shortLeg30, roundDisplay(shortLeg30 * Math.sqrt(3), 4) as any)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                {t.t30ApplyBtn}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
