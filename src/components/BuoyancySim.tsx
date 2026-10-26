import React, { useState, useMemo } from 'react';
import { Substance } from '../types/density';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { formatNumber } from '../utils/units';
import { Waves, ArrowDown, ArrowUp, Info } from 'lucide-react';

interface BuoyancySimProps {
  lang: Language;
  initialObject?: Substance | null;
}

export const BuoyancySim: React.FC<BuoyancySimProps> = ({ lang, initialObject }) => {
  const isZh = lang === 'zh';
  const t = TRANSLATIONS[lang];

  // Presets definition
  const liquidPresets = useMemo(() => [
    { id: 'water', nameEn: 'Pure Water (4°C)', nameZh: '纯水 (4℃)', density: 1.0 },
    { id: 'seawater', nameEn: 'Standard Seawater', nameZh: '标准海水', density: 1.025 },
    { id: 'alcohol', nameEn: 'Medical Alcohol', nameZh: '医用酒精', density: 0.789 },
    { id: 'oil', nameEn: 'Vegetable Oil', nameZh: '植物油', density: 0.92 },
    { id: 'mercury', nameEn: 'Mercury (Hg)', nameZh: '水银 / 汞', density: 13.6 },
    { id: 'saline', nameEn: 'Dense Saline', nameZh: '浓盐水 (选种)', density: 1.15 },
  ], []);

  const objectPresets = useMemo(() => [
    { id: 'ice', nameEn: 'Ice Block', nameZh: '冰块', density: 0.917 },
    { id: 'oak', nameEn: 'Oak Wood', nameZh: '橡木块', density: 0.75 },
    { id: 'aluminum', nameEn: 'Aluminum Block', nameZh: '纯铝块', density: 2.7 },
    { id: 'iron', nameEn: 'Iron / Steel', nameZh: '纯铁块', density: 7.87 },
    { id: 'gold', nameEn: 'Pure Gold', nameZh: '纯金块', density: 19.32 },
    { id: 'cork', nameEn: 'Cork', nameZh: '软木塞', density: 0.24 },
    { id: 'pe', nameEn: 'PE Plastic', nameZh: 'PE塑料', density: 0.95 },
  ], []);

  // Object settings
  const [objectDensity, setObjectDensity] = useState<number>(
    initialObject ? initialObject.density : 0.917
  );
  const [objectVolume, setObjectVolume] = useState<number>(100);
  const [selectedObjId, setSelectedObjId] = useState<string | null>(initialObject ? null : 'ice');
  const [customObjectName, setCustomObjectName] = useState<string | null>(
    initialObject ? (isZh ? initialObject.name : initialObject.nameEn) : null
  );

  // Liquid settings
  const [liquidDensity, setLiquidDensity] = useState<number>(1.0);
  const [selectedLiqId, setSelectedLiqId] = useState<string | null>('water');
  const [customLiquidName, setCustomLiquidName] = useState<string | null>(null);
  const [gravityG, setGravityG] = useState<number>(9.8);

  // Responsive reactive names
  const currentObjectName = useMemo(() => {
    if (customObjectName) return customObjectName;
    if (selectedObjId) {
      const match = objectPresets.find((p) => p.id === selectedObjId);
      if (match) return isZh ? match.nameZh : match.nameEn;
    }
    return isZh ? '冰块' : 'Ice Block';
  }, [customObjectName, selectedObjId, objectPresets, isZh]);

  const currentLiquidName = useMemo(() => {
    if (customLiquidName) return customLiquidName;
    if (selectedLiqId) {
      const match = liquidPresets.find((l) => l.id === selectedLiqId);
      if (match) return isZh ? match.nameZh : match.nameEn;
    }
    return isZh ? '纯水 (4℃)' : 'Pure Water (4°C)';
  }, [customLiquidName, selectedLiqId, liquidPresets, isZh]);

  // Safe Physics calculation with zero protection
  const physics = useMemo(() => {
    const safeObjDensity = Math.max(0.0001, objectDensity || 0.0001);
    const safeObjVolume = Math.max(0.0001, objectVolume || 0.0001);
    const safeLiqDensity = Math.max(0.0001, liquidDensity || 0.0001);

    const massG = safeObjDensity * safeObjVolume;
    const massKg = massG / 1000;
    const forceG = massKg * gravityG;

    const densityRatio = safeObjDensity / safeLiqDensity;

    let state: 'floating' | 'suspended' | 'sunk';
    let submergedRatio = 0;
    let vDisplacedCm3 = 0;
    let buoyancyForceN = 0;
    let normalForceN = 0;

    if (Math.abs(densityRatio - 1.0) < 0.001) {
      state = 'suspended';
      submergedRatio = 1.0;
      vDisplacedCm3 = safeObjVolume;
      buoyancyForceN = forceG;
      normalForceN = 0;
    } else if (densityRatio < 1.0) {
      state = 'floating';
      submergedRatio = densityRatio;
      vDisplacedCm3 = safeObjVolume * submergedRatio;
      buoyancyForceN = forceG;
      normalForceN = 0;
    } else {
      state = 'sunk';
      submergedRatio = 1.0;
      vDisplacedCm3 = safeObjVolume;
      const displacedMassKg = (safeLiqDensity * vDisplacedCm3) / 1000;
      buoyancyForceN = displacedMassKg * gravityG;
      normalForceN = Math.max(0, forceG - buoyancyForceN);
    }

    const exposedRatio = 1 - submergedRatio;

    return {
      massG,
      forceG,
      densityRatio,
      state,
      submergedRatio,
      exposedRatio,
      vDisplacedCm3,
      buoyancyForceN,
      normalForceN,
    };
  }, [objectDensity, objectVolume, liquidDensity, gravityG]);

  // SVG representation geometry
  const tankWidth = 360;
  const tankHeight = 300;
  const liquidLevelY = 130;
  const tankBottomY = 280;

  const blockSize = Math.min(Math.max(Math.cbrt(objectVolume || 1) * 16, 45), 100);
  const blockX = (tankWidth - blockSize) / 2;

  let blockY = liquidLevelY - blockSize * physics.exposedRatio;
  if (physics.state === 'suspended') {
    blockY = liquidLevelY + (tankBottomY - liquidLevelY - blockSize) / 2;
  } else if (physics.state === 'sunk') {
    blockY = tankBottomY - blockSize;
  }

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Waves className="w-4 h-4 text-blue-600" />
              <span>{t.buoyancyTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">{t.buoyancyDesc}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0" role="group" aria-label="Gravity Constant">
            <span className="text-2xs font-mono text-slate-500">{t.gravityConst}:</span>
            <button
              type="button"
              aria-label="Gravity 9.8 N/kg"
              onClick={() => setGravityG(9.8)}
              className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                gravityG === 9.8 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              9.8 N/kg
            </button>
            <button
              type="button"
              aria-label="Gravity 10 N/kg"
              onClick={() => setGravityG(10)}
              className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                gravityG === 10 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              10 N/kg
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Setup (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Object Setup Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center justify-between">
              <span>{t.testObjTitle}</span>
              <span className="text-blue-600 normal-case font-bold">{currentObjectName}</span>
            </h3>

            <div>
              <span className="text-2xs text-slate-500 block mb-1.5">{t.quickSelectObj}</span>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Object Presets">
                {objectPresets.map((p) => {
                  const label = isZh ? p.nameZh : p.nameEn;
                  const isSelected = selectedObjId === p.id && !customObjectName;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`${label} (${p.density} g/cm³)`}
                      onClick={() => {
                        setSelectedObjId(p.id);
                        setCustomObjectName(null);
                        setObjectDensity(p.density);
                      }}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isSelected
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {label} ({p.density})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="buoyancy-obj-density" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  {t.objDensity}
                </label>
                <input
                  id="buoyancy-obj-density"
                  name="objDensity"
                  type="number"
                  step="any"
                  value={objectDensity}
                  onChange={(e) => {
                    setObjectDensity(parseFloat(e.target.value) || 0.0001);
                    setSelectedObjId(null);
                    setCustomObjectName(t.customMaterial);
                  }}
                  placeholder="0.917"
                  aria-label={t.objDensity}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="buoyancy-obj-volume" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  {t.objVolume}
                </label>
                <input
                  id="buoyancy-obj-volume"
                  name="objVolume"
                  type="number"
                  step="any"
                  value={objectVolume}
                  onChange={(e) => setObjectVolume(parseFloat(e.target.value) || 1)}
                  placeholder="100"
                  aria-label={t.objVolume}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Liquid Setup Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center justify-between">
              <span>{t.liquidMediumTitle}</span>
              <span className="text-blue-600 normal-case font-bold">{currentLiquidName}</span>
            </h3>

            <div>
              <span className="text-2xs text-slate-500 block mb-1.5">{t.quickSelectLiq}</span>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Liquid Presets">
                {liquidPresets.map((l) => {
                  const label = isZh ? l.nameZh : l.nameEn;
                  const isSelected = selectedLiqId === l.id && !customLiquidName;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      aria-label={`${label} (${l.density} g/cm³)`}
                      onClick={() => {
                        setSelectedLiqId(l.id);
                        setCustomLiquidName(null);
                        setLiquidDensity(l.density);
                      }}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isSelected
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {label} ({l.density})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-1">
              <label htmlFor="buoyancy-liq-density" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                {t.liqDensity}
              </label>
              <input
                id="buoyancy-liq-density"
                name="liqDensity"
                type="number"
                step="any"
                value={liquidDensity}
                onChange={(e) => {
                  setLiquidDensity(parseFloat(e.target.value) || 0.0001);
                  setSelectedLiqId(null);
                  setCustomLiquidName(isZh ? '自定义液体' : 'Custom Liquid');
                }}
                placeholder="1.0"
                aria-label={t.liqDensity}
                className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Physics Analysis Summary */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2 font-mono text-xs">
            <h4 className="font-bold text-slate-900 font-sans text-xs flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.forceBalanceTitle}</span>
            </h4>

            <div className="divide-y divide-slate-100 text-2xs">
              <div className="py-1.5 flex justify-between items-center">
                <span className="text-slate-500">{t.objMass}</span>
                <span className="font-semibold text-slate-900">
                  {formatNumber(physics.massG, 2)} g ({formatNumber(physics.massG / 1000, 4)} kg)
                </span>
              </div>
              <div className="py-1.5 flex justify-between items-center">
                <span className="text-slate-500">{t.gravityForce}</span>
                <span className="font-semibold text-rose-600">{formatNumber(physics.forceG, 3)} N ↓</span>
              </div>
              <div className="py-1.5 flex justify-between items-center">
                <span className="text-slate-500">{t.displacedVol}</span>
                <span className="font-semibold text-slate-900">
                  {formatNumber(physics.vDisplacedCm3, 2)} cm³ (
                  {formatNumber(physics.submergedRatio * 100, 1)}%)
                </span>
              </div>
              <div className="py-1.5 flex justify-between items-center">
                <span className="text-slate-500">{t.buoyancyForce}</span>
                <span className="font-semibold text-blue-600">{formatNumber(physics.buoyancyForceN, 3)} N ↑</span>
              </div>
              {physics.normalForceN > 0 && (
                <div className="py-1.5 flex justify-between items-center">
                  <span className="text-slate-500">{t.normalForce}</span>
                  <span className="font-semibold text-amber-600">{formatNumber(physics.normalForceN, 3)} N ↑</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Simulation Tank (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                {physics.state === 'floating'
                  ? t.stateFloating
                  : physics.state === 'suspended'
                  ? t.stateSuspended
                  : t.stateSunk}
              </span>
              <span className="text-2xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                ρ物 / ρ液 = {formatNumber(physics.densityRatio, 3)}
              </span>
            </div>

            {/* Interactive SVG Water Tank */}
            <div className="relative w-full aspect-4/3 max-h-[360px] bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center p-2">
              <svg viewBox={`0 0 ${tankWidth} ${tankHeight}`} className="w-full h-full select-none">
                <defs>
                  <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="objectGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>

                {/* Tank Body & Wall */}
                <rect
                  x="20"
                  y="40"
                  width={tankWidth - 40}
                  height={tankHeight - 60}
                  fill="#ffffff"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  rx="6"
                />

                {/* Liquid Level */}
                <rect
                  x="22"
                  y={liquidLevelY}
                  width={tankWidth - 44}
                  height={tankBottomY - liquidLevelY}
                  fill="url(#liquidGrad)"
                  rx="2"
                />

                {/* Liquid Surface Line */}
                <line
                  x1="22"
                  y1={liquidLevelY}
                  x2={tankWidth - 22}
                  y2={liquidLevelY}
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />

                {/* Water Surface Text */}
                <text
                  x="30"
                  y={liquidLevelY - 8}
                  fill="#0369a1"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {currentLiquidName} ({liquidDensity} g/cm³)
                </text>

                {/* Testing Block (Substance Object) */}
                <rect
                  x={blockX}
                  y={blockY}
                  width={blockSize}
                  height={blockSize}
                  fill="url(#objectGrad)"
                  stroke="#b45309"
                  strokeWidth="2"
                  rx="4"
                  className="transition-all duration-300 ease-out"
                />

                {/* Object Label inside block */}
                <text
                  x={blockX + blockSize / 2}
                  y={blockY + blockSize / 2 + 4}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={Math.max(9, blockSize / 6)}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  {currentObjectName}
                </text>

                {/* Force Vectors */}
                {/* Gravity (Downwards Arrow) */}
                <g className="transition-all duration-300">
                  <line
                    x1={blockX + blockSize / 2 - 12}
                    y1={blockY + blockSize / 2}
                    x2={blockX + blockSize / 2 - 12}
                    y2={blockY + blockSize / 2 + 35}
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    markerEnd="url(#arrow-down)"
                  />
                  <text
                    x={blockX + blockSize / 2 - 16}
                    y={blockY + blockSize / 2 + 25}
                    fill="#dc2626"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    G
                  </text>
                </g>

                {/* Buoyancy (Upwards Arrow) */}
                <g className="transition-all duration-300">
                  <line
                    x1={blockX + blockSize / 2 + 12}
                    y1={blockY + blockSize / 2}
                    x2={blockX + blockSize / 2 + 12}
                    y2={blockY + blockSize / 2 - 35}
                    stroke="#2563eb"
                    strokeWidth="2.5"
                  />
                  <text
                    x={blockX + blockSize / 2 + 16}
                    y={blockY + blockSize / 2 - 20}
                    fill="#2563eb"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="start"
                  >
                    F浮
                  </text>
                </g>
              </svg>
            </div>

            {/* Submersion Breakdown Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-2xs text-slate-600 font-mono">
                <span>{t.exposedSubmerged}:</span>
                <span className="font-semibold text-slate-800">
                  {isZh
                    ? `露出 ${(physics.exposedRatio * 100).toFixed(1)}% · 浸入 ${(physics.submergedRatio * 100).toFixed(1)}%`
                    : `Exposed ${(physics.exposedRatio * 100).toFixed(1)}% · Submerged ${(physics.submergedRatio * 100).toFixed(1)}%`}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                <div
                  style={{ width: `${physics.exposedRatio * 100}%` }}
                  className="bg-amber-400 h-full transition-all duration-300"
                  title="Exposed volume ratio"
                />
                <div
                  style={{ width: `${physics.submergedRatio * 100}%` }}
                  className="bg-blue-500 h-full transition-all duration-300"
                  title="Submerged volume ratio"
                />
              </div>
            </div>

            {/* Physical Law Interpretation */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1 leading-relaxed">
              <span className="font-bold text-slate-800 block">{t.physicsExplainTitle}</span>
              <p className="text-2xs">
                {physics.state === 'floating' && t.floatingLaw}
                {physics.state === 'suspended' && t.suspendedLaw}
                {physics.state === 'sunk' && t.sunkLaw}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
