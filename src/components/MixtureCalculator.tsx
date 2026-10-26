import React, { useState, useMemo } from 'react';
import { formatNumber } from '../utils/units';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Plus, Trash2, Layers, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ComponentItem {
  id: string;
  name: string;
  massG: number;
  densityGcm3: number;
}

interface MixtureCalculatorProps {
  lang: Language;
}

export const MixtureCalculator: React.FC<MixtureCalculatorProps> = ({ lang }) => {
  const isZh = lang === 'zh';
  const t = TRANSLATIONS[lang];
  const [components, setComponents] = useState<ComponentItem[]>([
    {
      id: '1',
      name: lang === 'en' ? 'Component A (Gold)' : '成分 A (纯金)',
      massG: 150,
      densityGcm3: 19.32,
    },
    {
      id: '2',
      name: lang === 'en' ? 'Component B (Copper)' : '成分 B (纯铜)',
      massG: 50,
      densityGcm3: 8.96,
    },
  ]);

  const [copied, setCopied] = useState(false);

  const loadPreset = (presetType: 'gold-alloy' | 'alcohol-water' | 'saline') => {
    if (presetType === 'gold-alloy') {
      setComponents([
        {
          id: '1',
          name: lang === 'en' ? 'Pure Gold (Au)' : '纯金 (Gold)',
          massG: 75,
          densityGcm3: 19.32,
        },
        {
          id: '2',
          name: lang === 'en' ? 'Pure Copper (Cu)' : '纯铜 (Copper)',
          massG: 25,
          densityGcm3: 8.96,
        },
      ]);
    } else if (presetType === 'alcohol-water') {
      setComponents([
        {
          id: '1',
          name: lang === 'en' ? 'Ethanol (Alcohol)' : '无水乙醇',
          massG: 78.9,
          densityGcm3: 0.789,
        },
        {
          id: '2',
          name: lang === 'en' ? 'Pure Water' : '纯水',
          massG: 100,
          densityGcm3: 1.0,
        },
      ]);
    } else if (presetType === 'saline') {
      setComponents([
        {
          id: '1',
          name: lang === 'en' ? 'Pure Water' : '纯水',
          massG: 500,
          densityGcm3: 1.0,
        },
        {
          id: '2',
          name: lang === 'en' ? 'Table Salt (NaCl)' : '食盐 (Salt)',
          massG: 75,
          densityGcm3: 2.16,
        },
      ]);
    }
  };

  const handleAddComponent = () => {
    setComponents([
      ...components,
      {
        id: `comp-${Date.now()}`,
        name: lang === 'en' ? `Component ${components.length + 1}` : `新组分 ${components.length + 1}`,
        massG: 100,
        densityGcm3: 2.7,
      },
    ]);
  };

  const handleRemoveComponent = (id: string) => {
    if (components.length <= 1) return;
    setComponents(components.filter((c) => c.id !== id));
  };

  const handleUpdate = (id: string, field: 'name' | 'massG' | 'densityGcm3', val: any) => {
    setComponents(
      components.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: val };
        }
        return c;
      })
    );
  };

  // Safe mixture calculation
  const calculation = useMemo(() => {
    let totalMassG = 0;
    let totalVolCm3 = 0;

    const detailedList = components.map((c) => {
      const safeMass = Math.max(0, typeof c.massG === 'number' ? c.massG : parseFloat(c.massG) || 0);
      const safeDensity = Math.max(0.0001, typeof c.densityGcm3 === 'number' ? c.densityGcm3 : parseFloat(c.densityGcm3) || 0.0001);
      const vol = safeMass / safeDensity;
      totalMassG += safeMass;
      totalVolCm3 += vol;
      return {
        ...c,
        volumeCm3: vol,
      };
    });

    const mixtureDensityGcm3 = totalVolCm3 > 0 ? totalMassG / totalVolCm3 : 0;
    const mixtureDensitySI = mixtureDensityGcm3 * 1000;

    return {
      totalMassG,
      totalVolCm3,
      mixtureDensityGcm3,
      mixtureDensitySI,
      detailedList,
    };
  }, [components]);

  const handleCopySteps = () => {
    const text = [
      lang === 'en' ? '【Alloy & Mixture Density Calculation】' : '【混合物/合金密度推导步骤】',
      `${t.totalMass}: ${formatNumber(calculation.totalMassG)} g`,
      `${t.totalVol}: ${formatNumber(calculation.totalVolCm3)} cm³`,
      `ρ_mix = m_total / V_total = ${formatNumber(calculation.totalMassG)} g / ${formatNumber(calculation.totalVolCm3)} cm³ = ${formatNumber(calculation.mixtureDensityGcm3, 4)} g/cm³ (${formatNumber(calculation.mixtureDensitySI, 2)} kg/m³)`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 20, spread: 45, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>{t.mixtureTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">{t.mixtureDesc}</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 shrink-0" role="group" aria-label="Mixture Presets">
            <span className="text-2xs text-slate-500 font-mono">{t.presetRatios}</span>
            <button
              type="button"
              onClick={() => loadPreset('gold-alloy')}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {isZh ? '18K 黄金 (Au+Cu)' : '18K Gold (Au+Cu)'}
            </button>
            <button
              type="button"
              onClick={() => loadPreset('alcohol-water')}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isZh ? '乙醇-水溶液' : 'Alcohol / Water'}
            </button>
            <button
              type="button"
              onClick={() => loadPreset('saline')}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {isZh ? '食盐水 (NaCl+水)' : 'Saline Solution'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Components Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                {t.compListTitle}
              </h3>
              <button
                type="button"
                onClick={handleAddComponent}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus className="w-3 h-3" />
                <span>{t.addCompBtn}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {components.map((comp, idx) => {
                const vol = comp.densityGcm3 > 0 ? comp.massG / comp.densityGcm3 : 0;
                const massRatio =
                  calculation.totalMassG > 0
                    ? ((comp.massG / calculation.totalMassG) * 100).toFixed(1)
                    : '0';

                return (
                  <div
                    key={comp.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        {lang === 'en' ? `Component ${idx + 1}` : `组分 ${idx + 1}`}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-mono text-slate-500">
                          {t.compMassShare}: <strong className="text-slate-900">{massRatio}%</strong>
                        </span>
                        {components.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveComponent(comp.id)}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            title="Delete"
                            aria-label={`Delete component ${idx + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label htmlFor={`mix-name-${comp.id}`} className="block text-2xs font-semibold text-slate-500 mb-0.5 cursor-pointer">
                          {t.colName}
                        </label>
                        <input
                          id={`mix-name-${comp.id}`}
                          name={`compName-${comp.id}`}
                          type="text"
                          value={comp.name}
                          onChange={(e) => handleUpdate(comp.id, 'name', e.target.value)}
                          placeholder={isZh ? '组分名称' : 'Component Name'}
                          aria-label={t.colName}
                          className="w-full px-2.5 py-1 text-xs rounded border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor={`mix-mass-${comp.id}`} className="block text-2xs font-semibold text-slate-500 mb-0.5 cursor-pointer">
                          {t.massLabel} (g)
                        </label>
                        <input
                          id={`mix-mass-${comp.id}`}
                          name={`compMass-${comp.id}`}
                          type="number"
                          step="any"
                          value={comp.massG}
                          onChange={(e) =>
                            handleUpdate(comp.id, 'massG', e.target.value === '' ? '' : parseFloat(e.target.value) || 0)
                          }
                          placeholder="100"
                          aria-label={`${t.massLabel} (g)`}
                          className="w-full px-2.5 py-1 text-xs font-mono rounded border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor={`mix-density-${comp.id}`} className="block text-2xs font-semibold text-slate-500 mb-0.5 cursor-pointer">
                          {t.densityLabel} (g/cm³)
                        </label>
                        <input
                          id={`mix-density-${comp.id}`}
                          name={`compDensity-${comp.id}`}
                          type="number"
                          step="any"
                          value={comp.densityGcm3}
                          onChange={(e) =>
                            handleUpdate(comp.id, 'densityGcm3', e.target.value === '' ? '' : parseFloat(e.target.value) || 0)
                          }
                          placeholder="1.0"
                          aria-label={`${t.densityLabel} (g/cm³)`}
                          className="w-full px-2.5 py-1 text-xs font-mono rounded border border-slate-300 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="text-2xs font-mono text-slate-400 flex justify-end">
                      V = {formatNumber(vol, 3)} cm³
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculation Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                {t.mixtureDensityTitle}
              </span>
              <button
                onClick={handleCopySteps}
                className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.copied : t.copySteps}</span>
              </button>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {t.mixtureDensityAvg}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-indigo-600 tabular-nums">
                  {formatNumber(calculation.mixtureDensityGcm3, 4)}
                </span>
                <span className="text-xs font-bold text-slate-700 font-mono">g/cm³</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                SI: {formatNumber(calculation.mixtureDensitySI, 2)} kg/m³
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">{t.totalMass}</span>
                <span className="font-bold text-slate-900">
                  {formatNumber(calculation.totalMassG, 2)} g
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.totalVol}</span>
                <span className="font-bold text-slate-900">
                  {formatNumber(calculation.totalVolCm3, 2)} cm³
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200/60 text-2xs text-amber-900 space-y-1">
              <div className="font-semibold">{t.mixtureTipTitle}</div>
              <div>{t.mixtureTipText}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
