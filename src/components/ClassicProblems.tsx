import React, { useState } from 'react';
import { formatNumber } from '../utils/units';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Crown, ShieldCheck, AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface ClassicProblemsProps {
  lang: Language;
}

export const ClassicProblems: React.FC<ClassicProblemsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeProblem, setActiveProblem] = useState<
    'crown' | 'hollow' | 'displacement' | 'ice-melting'
  >('crown');

  // Problem 1: Archimedes Crown
  const [crownMass, setCrownMass] = useState<number>(1000); // g
  const [crownDisplacedVol, setCrownDisplacedVol] = useState<number>(65); // cm³
  const goldDensity = 19.32;
  const silverDensity = 10.49;

  const crownAvgDensity =
    crownDisplacedVol > 0 && crownMass > 0 ? crownMass / crownDisplacedVol : 0;
  const isPureGold = Math.abs(crownAvgDensity - goldDensity) < 0.15;
  const isHeavierThanGold = crownAvgDensity > goldDensity + 0.15;

  let silverMass = 0;
  let realGoldMass = crownMass;

  if (!isPureGold && !isHeavierThanGold && crownAvgDensity > 0) {
    const denom = 1 - goldDensity / silverDensity;
    const numer = crownMass - crownDisplacedVol * goldDensity;
    silverMass = Math.min(crownMass, Math.max(0, numer / denom));
    realGoldMass = Math.max(0, crownMass - silverMass);
  }

  // Problem 2: Hollow Ball
  const [ballMass, setBallMass] = useState<number>(157.4); // g
  const [ballOuterVol, setBallOuterVol] = useState<number>(30); // cm³
  const [materialDensity, setMaterialDensity] = useState<number>(7.87); // Iron

  const solidVol = materialDensity > 0 && ballMass > 0 ? ballMass / materialDensity : 0;
  const isPhysicallyImpossible = solidVol > ballOuterVol + 0.05 && ballOuterVol > 0;
  const isHollow = !isPhysicallyImpossible && ballOuterVol > solidVol + 0.05;
  const hollowVol = isHollow ? ballOuterVol - solidVol : 0;

  // Problem 3: Graduated Cylinder Displacement
  const [initWaterLevel, setInitWaterLevel] = useState<number>(50); // mL
  const [finalWaterLevel, setFinalWaterLevel] = useState<number>(85); // mL
  const [rockMass, setRockMass] = useState<number>(94.5); // g

  const isLevelValid = finalWaterLevel > initWaterLevel;
  const displacedVol = isLevelValid ? finalWaterLevel - initWaterLevel : 0;
  const rockDensity = displacedVol > 0 && rockMass > 0 ? rockMass / displacedVol : 0;

  // Problem 4: Ice melting liquid
  const [liquidType, setLiquidType] = useState<'pure-water' | 'salt-water' | 'alcohol'>(
    'pure-water'
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>{t.problemsTitle}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">{t.problemsDesc}</p>
      </div>

      {/* Problem Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'crown', label: t.probCrownTitle },
          { id: 'hollow', label: t.probHollowTitle },
          { id: 'displacement', label: t.probDisplacementTitle },
          { id: 'ice-melting', label: t.probIceTitle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveProblem(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeProblem === tab.id
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Problem 1: Archimedes Crown */}
      {activeProblem === 'crown' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Archimedes Crown Purity Simulator' : '阿基米德王冠鉴宝仿真'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'en'
                ? 'King Hiero II gave 1,000 g of gold to a goldsmith to make a crown. Archimedes determined if silver was substituted by comparing displaced water volume.'
                : '公元前245年叙拉古国王让工匠用1000g纯金制作纯金王冠，怀疑工匠偷掺了便宜的纯银。输入测量数值：'}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="crown-mass-input" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  {lang === 'en' ? 'Crown Mass m (g)' : '王冠称得质量 m (g)'}
                </label>
                <input
                  id="crown-mass-input"
                  name="crownMass"
                  type="number"
                  step="any"
                  value={crownMass}
                  onChange={(e) => setCrownMass(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  placeholder="1000"
                  aria-label={lang === 'en' ? 'Crown Mass m (g)' : '王冠称得质量 m (g)'}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="crown-vol-input" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  {lang === 'en' ? 'Displaced Water V (cm³)' : '浸水排开水体积 V (cm³)'}
                </label>
                <input
                  id="crown-vol-input"
                  name="crownDisplacedVol"
                  type="number"
                  step="any"
                  value={crownDisplacedVol}
                  onChange={(e) =>
                    setCrownDisplacedVol(Math.max(0.1, parseFloat(e.target.value) || 0.1))
                  }
                  placeholder="65"
                  aria-label={lang === 'en' ? 'Displaced Water V (cm³)' : '浸水排开水体积 V (cm³)'}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="text-2xs text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div>
                {lang === 'en'
                  ? 'Pure Gold: ρ = 19.32 g/cm³; Pure Silver: ρ = 10.49 g/cm³'
                  : '已知: 纯金密度 ρ金 = 19.32 g/cm³，纯银密度 ρ银 = 10.49 g/cm³'}
              </div>
              <div>
                {lang === 'en'
                  ? `Theoretical volume for ${crownMass}g pure gold: ${formatNumber(crownMass / 19.32, 2)} cm³`
                  : `${crownMass}g 纯金理论体积应为: ${formatNumber(crownMass / 19.32, 2)} cm³`}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              {lang === 'en' ? 'Purity Verification Result' : '判定结果与推导'}
            </h4>

            <div className="p-4 rounded-xl border border-slate-200/80 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  {lang === 'en' ? 'Crown Average Density:' : '王冠测定平均密度:'}
                </span>
                <span className="font-bold text-blue-700 text-base">
                  {formatNumber(crownAvgDensity, 2)} g/cm³
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                {isPureGold ? (
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {lang === 'en'
                        ? 'Verified 100% genuine pure gold crown!'
                        : '真金品质！为 100% 纯金王冠，未掺杂低密度杂质。'}
                    </span>
                  </div>
                ) : isHeavierThanGold ? (
                  <div className="p-2.5 bg-amber-50 rounded-lg text-amber-800 text-2xs space-y-1 font-sans">
                    <div className="font-bold flex items-center gap-1.5 text-xs text-amber-900">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{lang === 'en' ? 'Density Exceeds Gold' : '实测密度大于纯金'}</span>
                    </div>
                    <div>
                      {lang === 'en'
                        ? `The measured density (${formatNumber(crownAvgDensity, 2)} g/cm³) is higher than pure gold (19.32 g/cm³). Possible platinum inclusion or experimental measurement discrepancy.`
                        : `实测密度 (${formatNumber(crownAvgDensity, 2)} g/cm³) 高于纯金 (19.32 g/cm³)。可能含有高密度铂金等重金属或读数偏小。`}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 font-sans">
                    <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>
                        {lang === 'en'
                          ? 'Adulteration Confirmed! Density is lower than pure gold.'
                          : '检测出掺假！实测密度明显低于纯金 19.32 g/cm³。'}
                      </span>
                    </div>
                    <div className="text-slate-700 text-2xs space-y-0.5 font-mono">
                      <div>
                        • {lang === 'en' ? 'Substituted Silver Mass:' : '掺入白银质量:'}{' '}
                        <strong>{formatNumber(silverMass, 1)} g</strong> (
                        {((silverMass / crownMass) * 100).toFixed(1)}%)
                      </div>
                      <div>
                        • {lang === 'en' ? 'Genuine Gold Content:' : '实际纯金含量:'}{' '}
                        <strong>{formatNumber(realGoldMass, 1)} g</strong> (
                        {((realGoldMass / crownMass) * 100).toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem 2: Hollow Ball */}
      {activeProblem === 'hollow' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Hollow vs Solid Casting Solver' : '铸件 / 铁球空心实心速断器'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'en'
                ? 'Check whether a manufactured casting is solid or hollow based on measured mass and geometric displacement.'
                : '已知物体的实际称重质量与排水测出的外表体积，判定是否中空及空心腔体体积。'}
            </p>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="ball-mass-input" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  {t.massLabel} (g)
                </label>
                <input
                  id="ball-mass-input"
                  name="ballMass"
                  type="number"
                  step="any"
                  value={ballMass}
                  onChange={(e) => setBallMass(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  placeholder="157.4"
                  aria-label={`${t.massLabel} (g)`}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="ball-vol-input" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  {t.volumeLabel} (cm³)
                </label>
                <input
                  id="ball-vol-input"
                  name="ballOuterVol"
                  type="number"
                  step="any"
                  value={ballOuterVol}
                  onChange={(e) => setBallOuterVol(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  placeholder="30"
                  aria-label={`${t.volumeLabel} (cm³)`}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="ball-density-input" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  ρ (g/cm³)
                </label>
                <input
                  id="ball-density-input"
                  name="materialDensity"
                  type="number"
                  step="any"
                  value={materialDensity}
                  onChange={(e) =>
                    setMaterialDensity(Math.max(0.0001, parseFloat(e.target.value) || 0.0001))
                  }
                  placeholder="7.87"
                  aria-label="ρ (g/cm³)"
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2 font-mono text-xs">
            <h4 className="text-xs font-bold text-slate-900 font-sans">
              {lang === 'en' ? 'Analysis & Conclusion' : '推导与结论'}
            </h4>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {lang === 'en' ? 'Solid material volume:' : '纯材料实体体积 (V实):'}
                </span>
                <span className="font-bold text-slate-900">{formatNumber(solidVol, 2)} cm³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {lang === 'en' ? 'Measured outer volume:' : '外部测量体积 (V外):'}
                </span>
                <span className="font-bold text-slate-900">{formatNumber(ballOuterVol, 2)} cm³</span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                {isPhysicallyImpossible ? (
                  <div className="text-rose-700 font-bold text-xs font-sans">
                    ⚠️ {lang === 'en' ? 'Physical Conflict' : '测量数据物理矛盾'}
                    <div className="font-mono text-2xs font-normal text-slate-600 mt-0.5">
                      {lang === 'en'
                        ? 'Solid volume exceeds outer displacement volume! Please re-verify mass or volume inputs.'
                        : '实体体积 V实 大于外表体积 V外，实际不可能存在。请核实测量数值。'}
                    </div>
                  </div>
                ) : isHollow ? (
                  <div className="text-amber-800 font-bold text-xs font-sans">
                    {lang === 'en' ? 'Status: HOLLOW' : '结论: 该物体为【空心】！'}
                    <div className="font-mono text-2xs font-normal text-slate-700 mt-1">
                      {lang === 'en' ? 'Hollow cavity volume: ' : '空心腔体体积: '}
                      <strong>{formatNumber(hollowVol, 2)} cm³</strong>
                    </div>
                    <div className="font-mono text-2xs font-normal text-slate-500 mt-0.5">
                      {lang === 'en'
                        ? `Filled with water adds +${formatNumber(hollowVol * 1.0, 1)} g`
                        : `空心注满水将增重 +${formatNumber(hollowVol * 1.0, 1)} g`}
                    </div>
                  </div>
                ) : (
                  <div className="text-emerald-700 font-bold text-xs font-sans">
                    {lang === 'en' ? 'Status: SOLID' : '结论: 该物体为致密【实心】。'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Problem 3: Displacement */}
      {activeProblem === 'displacement' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Displacement Method (Graduated Cylinder)' : '排水法量筒测不规则物密度'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="disp-v1-input" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  V1 (mL)
                </label>
                <input
                  id="disp-v1-input"
                  name="initWaterLevel"
                  type="number"
                  step="any"
                  value={initWaterLevel}
                  onChange={(e) => setInitWaterLevel(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="50"
                  aria-label="Initial Water Level V1 (mL)"
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="disp-v2-input" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  V2 (mL)
                </label>
                <input
                  id="disp-v2-input"
                  name="finalWaterLevel"
                  type="number"
                  step="any"
                  value={finalWaterLevel}
                  onChange={(e) => setFinalWaterLevel(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="85"
                  aria-label="Final Water Level V2 (mL)"
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="disp-mass-input" className="block text-2xs font-semibold text-slate-600 mb-1 cursor-pointer">
                  m (g)
                </label>
                <input
                  id="disp-mass-input"
                  name="rockMass"
                  type="number"
                  step="any"
                  value={rockMass}
                  onChange={(e) => setRockMass(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  placeholder="94.5"
                  aria-label={`${t.massLabel} m (g)`}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2 font-mono text-xs">
            <h4 className="text-xs font-bold text-slate-900 font-sans">
              {lang === 'en' ? 'Calculated Values' : '测量结果'}
            </h4>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              {!isLevelValid ? (
                <div className="text-rose-600 text-xs font-sans">
                  ⚠️ {lang === 'en' ? 'Final level V2 must exceed initial level V1!' : '末读数 V2 必须大于初读数 V1！'}
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span>V = V2 - V1:</span>
                    <span className="font-bold text-blue-700">
                      {formatNumber(displacedVol)} cm³ (mL)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ρ = m / V:</span>
                    <span className="font-bold text-emerald-700">
                      {formatNumber(rockDensity, 3)} g/cm³ ({formatNumber(rockDensity * 1000, 1)} kg/m³)
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Problem 4: Ice melting */}
      {activeProblem === 'ice-melting' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? 'Ice Melting Water Level Rigorous Proof' : '冰块融化后水面升降严谨证明'}
            </h3>
            <div className="flex gap-1.5">
              <button
                onClick={() => setLiquidType('pure-water')}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  liquidType === 'pure-water' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {lang === 'en' ? 'Pure Water (ρ=1.0)' : '在纯水中 (ρ=1.0)'}
              </button>
              <button
                onClick={() => setLiquidType('salt-water')}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  liquidType === 'salt-water' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {lang === 'en' ? 'Salt Brine (ρ=1.15)' : '在浓盐水中 (ρ=1.15)'}
              </button>
              <button
                onClick={() => setLiquidType('alcohol')}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  liquidType === 'alcohol' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {lang === 'en' ? 'Alcohol (ρ=0.79)' : '在酒精中 (ρ=0.79)'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/60 text-xs space-y-2">
            <div className="font-bold text-sm text-blue-900">
              {liquidType === 'pure-water'
                ? lang === 'en'
                  ? '★ Theorem 1: In Pure Water — Water level remains STRICTLY UNCHANGED!'
                  : '★ 定理 1: 冰在纯水中融化 —— 液面恰好【绝对不变】！'
                : liquidType === 'salt-water'
                ? lang === 'en'
                  ? '★ Theorem 2: In Dense Salt Brine — Liquid level RISES!'
                  : '★ 定理 2: 冰在浓盐水中融化 —— 液面将会【上升】！'
                : lang === 'en'
                ? '★ Theorem 3: In Alcohol/Light Fluid (Ice sinks) — Liquid level FALLS (DROPS)!'
                : '★ 定理 3: 冰在酒精等轻液体中 (冰沉底) —— 液面将会【下降】！'}
            </div>
            <p className="text-slate-700 text-2xs leading-relaxed">
              {liquidType === 'pure-water'
                ? lang === 'en'
                  ? 'Floating ice satisfies F_buoyant = G_ice => ρ_water · g · V_disp = m_ice · g => V_disp = m_ice / ρ_water. When ice melts, mass is conserved: V_melt = m_water / ρ_water = m_ice / ρ_water. Since V_disp = V_melt, the melted water exactly occupies the previously displaced volume, causing no change in surface height.'
                  : '冰块漂浮时受平衡力：F浮 = G冰 => ρ水·g·V排 = m冰·g => V排 = m冰 / ρ水。融化后质量守恒：V化水 = m水 / ρ水 = m冰 / ρ水。由于 V排 = V化水，融化后的水恰好填满了原来排开的体积，水面高度绝对不变。'
                : liquidType === 'salt-water'
                ? lang === 'en'
                  ? 'In salt water, ρ_brine > ρ_water (1.15 > 1.0 g/cm³). Therefore V_disp = m_ice / ρ_brine < m_ice / ρ_water = V_melt. The volume of melted water exceeds the displaced brine volume, forcing the liquid level to rise.'
                  : '浓盐水密度 ρ盐水 > ρ水 (1.15 > 1.0 g/cm³)。因此 V排 = m冰/ρ盐水 < m冰/ρ水 = V化水。融化出的水的体积大于之前排开的盐水体积，因此液面上升。'
                : lang === 'en'
                ? 'In alcohol, ρ_alcohol < ρ_ice (0.789 < 0.917 g/cm³). Ice is denser than alcohol and sinks to the bottom! While sunk, it displaces its full solid volume: V_disp = V_ice = m_ice / 0.917. When it melts into liquid water (ρ=1.0), its volume shrinks to V_melt = m_ice / 1.0 < V_disp, causing the liquid level to drop.'
                : '酒精密度 ρ酒精 < ρ冰 (0.789 < 0.917 g/cm³)。冰在酒精中下沉到底部！沉底时排开体积等于冰的全部固体体积：V排 = V冰 = m冰/0.917。化成水后体积收缩为 V化水 = m冰/1.0 < V排，因此容器液面下降。'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
