import React, { useState, useMemo } from 'react';
import { Language } from '../i18n/translations';
import {
  GAS_PRESETS,
  calculateGasDensity,
  getPowderFlowabilityRating,
} from '../utils/engineering';
import { formatNumber } from '../utils/units';
import {
  Layers,
  FlaskConical,
  Wind,
  Gauge,
  Info,
  Check,
  Copy,
  Sliders,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface EngineeringSuiteProps {
  lang: Language;
}

export const EngineeringSuite: React.FC<EngineeringSuiteProps> = ({ lang }) => {
  const isZh = lang === 'zh';
  const [activeTab, setActiveTab] = useState<'powder' | 'slurry' | 'gas'>('powder');

  // Copy state
  const [copied, setCopied] = useState(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ==========================================
  // Module 1: Powder Metallurgy States
  // ==========================================
  const [powderPreset, setPowderPreset] = useState('fe-atomized');
  const [apparentDensity, setApparentDensity] = useState('2.92'); // g/cm³
  const [tapDensity, setTapDensity] = useState('3.65'); // g/cm³
  const [trueDensity, setTrueDensity] = useState('7.87'); // g/cm³
  const [compactDensity, setCompactDensity] = useState('6.95'); // g/cm³

  const powderPresets = [
    {
      id: 'fe-atomized',
      nameEn: 'Water-Atomized Iron Powder (Fe)',
      nameZh: '水雾化纯铁粉 (Fe - 模压冶金级)',
      app: 2.92,
      tap: 3.65,
      true: 7.87,
      compact: 6.95,
    },
    {
      id: 'ti-64',
      nameEn: 'Ti-6Al-4V Powder (3D Printing / SLM)',
      nameZh: 'Ti-6Al-4V 钛合金粉 (增材制造/3D打印)',
      app: 2.5,
      tap: 2.95,
      true: 4.43,
      compact: 4.15,
    },
    {
      id: 'wc-co',
      nameEn: 'Tungsten Carbide (WC-10%Co Hardmetal)',
      nameZh: '碳化钨-钴粉末 (WC-10Co 硬质合金)',
      app: 4.8,
      tap: 6.2,
      true: 14.5,
      compact: 12.8,
    },
    {
      id: 'al2o3',
      nameEn: 'Alumina Ceramic Powder (Al₂O₃)',
      nameZh: '氧化铝结构陶瓷造粒粉 (Al₂O₃)',
      app: 1.1,
      tap: 1.65,
      true: 3.97,
      compact: 2.45,
    },
    {
      id: 'cu-electrolytic',
      nameEn: 'Electrolytic Copper Powder (Cu)',
      nameZh: '电解纯铜粉 (Cu 电工电极)',
      app: 2.6,
      tap: 3.5,
      true: 8.96,
      compact: 7.6,
    },
    {
      id: 'quartz-sand',
      nameEn: 'Fine Quartz / Foundry Sand',
      nameZh: '铸造精密石英细砂 (SiO₂)',
      app: 1.45,
      tap: 1.72,
      true: 2.65,
      compact: 1.95,
    },
  ];

  const handleApplyPowderPreset = (preset: typeof powderPresets[0]) => {
    setPowderPreset(preset.id);
    setApparentDensity(preset.app.toString());
    setTapDensity(preset.tap.toString());
    setTrueDensity(preset.true.toString());
    setCompactDensity(preset.compact.toString());
  };

  const powderCalc = useMemo(() => {
    const rhoApp = parseFloat(apparentDensity);
    const rhoTap = parseFloat(tapDensity);
    const rhoTrue = parseFloat(trueDensity);
    const rhoCompact = parseFloat(compactDensity);

    const emptyResult = {
      isValid: false,
      error: '',
      rhoApp: 0,
      rhoTap: 0,
      rhoTrue: 0,
      hausnerRatio: 0,
      carrIndex: 0,
      bedPorosity: 0,
      apparentPorosity: 0,
      greenRelativeDensity: null as number | null,
      flowability: null as ReturnType<typeof getPowderFlowabilityRating> | null,
    };

    if (
      isNaN(rhoApp) ||
      isNaN(rhoTap) ||
      isNaN(rhoTrue) ||
      rhoApp <= 0 ||
      rhoTap <= 0 ||
      rhoTrue <= 0
    ) {
      return { ...emptyResult, error: isZh ? '密度输入必须大于0' : 'Densities must be > 0' };
    }

    if (rhoTap < rhoApp) {
      return {
        ...emptyResult,
        error: isZh
          ? '振实密度 (ρ_tap) 物理上不可小于松装密度 (ρ_apparent)'
          : 'Tap density cannot be less than apparent density',
      };
    }

    const hausnerRatio = rhoTap / rhoApp;
    const carrIndex = 100 * (1 - rhoApp / rhoTap);
    const bedPorosity = 100 * (1 - rhoTap / rhoTrue);
    const apparentPorosity = 100 * (1 - rhoApp / rhoTrue);
    const greenRelativeDensity =
      !isNaN(rhoCompact) && rhoCompact > 0 ? (rhoCompact / rhoTrue) * 100 : null;
    const flowability = getPowderFlowabilityRating(hausnerRatio);

    return {
      isValid: true,
      error: '',
      rhoApp,
      rhoTap,
      rhoTrue,
      hausnerRatio,
      carrIndex,
      bedPorosity,
      apparentPorosity,
      greenRelativeDensity,
      flowability,
    };
  }, [apparentDensity, tapDensity, trueDensity, compactDensity, isZh]);

  // ==========================================
  // Module 2: Slurry & Suspension States
  // ==========================================
  const [slurryMode, setSlurryMode] = useState<'fromMassFraction' | 'fromSlurryDensity'>('fromMassFraction');
  const [solidDensity, setSolidDensity] = useState('2.70'); // g/cm³ (Quartz / Ore)
  const [liquidDensity, setLiquidDensity] = useState('1.00'); // g/cm³ (Water)
  const [massFractionInput, setMassFractionInput] = useState('35'); // wt%
  const [slurryDensityInput, setSlurryDensityInput] = useState('1.27'); // g/cm³
  const [slurryFlowRate, setSlurryFlowRate] = useState('100'); // m³/h

  const slurryPresets = [
    {
      id: 'quartz-tailings',
      nameEn: 'Mineral Tailings (Silica Sand / Water)',
      nameZh: '选矿厂尾矿砂浆 (石英矿砂 / 水体系)',
      solid: 2.65,
      liquid: 1.0,
      massFrac: 35,
    },
    {
      id: 'iron-magnetite',
      nameEn: 'Iron Ore Concentrate (Magnetite)',
      nameZh: '磁铁矿精矿矿浆 (高密度固相 5.18 g/cm³)',
      solid: 5.18,
      liquid: 1.0,
      massFrac: 55,
    },
    {
      id: 'bentonite-mud',
      nameEn: 'Drilling Mud (Bentonite / Water)',
      nameZh: '钻井膨润土护壁泥浆 (Bentonite)',
      solid: 2.4,
      liquid: 1.0,
      massFrac: 15,
    },
    {
      id: 'cement-grout',
      nameEn: 'Portland Cement Grout',
      nameZh: '建筑水下灌浆水泥浆 (水灰比 W/C ≈ 0.5)',
      solid: 3.15,
      liquid: 1.0,
      massFrac: 66.7,
    },
    {
      id: 'coal-slurry',
      nameEn: 'Coal Water Slurry (CWS fuel)',
      nameZh: '水煤浆 (洁净水煤浆燃料 CWS)',
      solid: 1.35,
      liquid: 1.0,
      massFrac: 65,
    },
  ];

  const handleApplySlurryPreset = (p: typeof slurryPresets[0]) => {
    setSolidDensity(p.solid.toString());
    setLiquidDensity(p.liquid.toString());
    setMassFractionInput(p.massFrac.toString());
    setSlurryMode('fromMassFraction');
  };

  const slurryCalc = useMemo(() => {
    const rhoS = parseFloat(solidDensity);
    const rhoL = parseFloat(liquidDensity);
    const flowM3h = parseFloat(slurryFlowRate) || 0;

    const emptyResult = {
      isValid: false,
      error: '',
      rhoM: 0,
      rhoMSI: 0,
      Cw: 0,
      Cv: 0,
      liquidSolidRatio: 0,
      drySolidsKgM3: 0,
      drySolidsMassFlowTonPerHour: 0,
    };

    if (isNaN(rhoS) || isNaN(rhoL) || rhoS <= 0 || rhoL <= 0) {
      return { ...emptyResult, error: isZh ? '固液相密度必须大于0' : 'Densities must be > 0' };
    }
    if (rhoS <= rhoL) {
      return {
        ...emptyResult,
        error: isZh
          ? '固相骨架密度 (ρ_solid) 必须大于液相载体密度 (ρ_liquid)'
          : 'Solid density must be greater than liquid density',
      };
    }

    let calculatedSlurryDensity = 0;
    let calculatedMassFraction = 0; // wt%
    let calculatedVolFraction = 0; // vol%

    if (slurryMode === 'fromMassFraction') {
      const Cw = parseFloat(massFractionInput);
      if (isNaN(Cw) || Cw < 0 || Cw >= 100) {
        return { ...emptyResult, error: isZh ? '质量浓度必须在 0 ~ 100% 之间' : 'Mass fraction must be between 0 and 100%' };
      }
      calculatedMassFraction = Cw;
      // Formula: rho_m = 100 / ( (Cw / rho_s) + ((100 - Cw) / rho_l) )
      const denom = Cw / rhoS + (100 - Cw) / rhoL;
      calculatedSlurryDensity = 100 / denom;
      calculatedVolFraction = ((calculatedSlurryDensity - rhoL) / (rhoS - rhoL)) * 100;
    } else {
      const rhoM = parseFloat(slurryDensityInput);
      if (isNaN(rhoM) || rhoM <= rhoL || rhoM >= rhoS) {
        return {
          ...emptyResult,
          error: isZh
            ? `矿浆混合密度必须介于液相 (${rhoL}) 与固相 (${rhoS}) 之间`
            : `Slurry density must be between liquid (${rhoL}) and solid (${rhoS})`,
        };
      }
      calculatedSlurryDensity = rhoM;
      // Formula: Cw = (rho_s * (rho_m - rho_l)) / (rho_m * (rho_s - rho_l)) * 100
      calculatedMassFraction =
        ((rhoS * (rhoM - rhoL)) / (rhoM * (rhoS - rhoL))) * 100;
      calculatedVolFraction = ((rhoM - rhoL) / (rhoS - rhoL)) * 100;
    }

    const liquidSolidRatio =
      calculatedMassFraction > 0 ? (100 - calculatedMassFraction) / calculatedMassFraction : 0;
    // Dry solid mass per m³ slurry = rho_m (g/cm³) * Cw (%) * 10 -> kg/m³
    const drySolidsKgM3 = calculatedSlurryDensity * calculatedMassFraction * 10;
    const drySolidsMassFlowTonPerHour =
      flowM3h > 0 ? (flowM3h * drySolidsKgM3) / 1000 : 0;

    return {
      isValid: true,
      error: '',
      rhoM: calculatedSlurryDensity,
      rhoMSI: calculatedSlurryDensity * 1000,
      Cw: calculatedMassFraction,
      Cv: calculatedVolFraction,
      liquidSolidRatio,
      drySolidsKgM3,
      drySolidsMassFlowTonPerHour,
    };
  }, [slurryMode, solidDensity, liquidDensity, massFractionInput, slurryDensityInput, slurryFlowRate, isZh]);

  // ==========================================
  // Module 3: Gas STP / Operating Conditions
  // ==========================================
  const [selectedGasId, setSelectedGasId] = useState('air');
  const [customMolarMass, setCustomMolarMass] = useState('28.964');
  const [operatingTempC, setOperatingTempC] = useState('80'); // °C
  const [pressureValue, setPressureValue] = useState('250'); // kPa
  const [pressureType, setPressureType] = useState<'gauge' | 'absolute'>('gauge');
  const [compressibilityZ, setCompressibilityZ] = useState('1.0');
  const [gasVolFlowAct, setGasVolFlowAct] = useState('500'); // m³/h

  const activeGasPreset = GAS_PRESETS.find((g) => g.id === selectedGasId);

  const handleGasChange = (id: string) => {
    setSelectedGasId(id);
    const found = GAS_PRESETS.find((g) => g.id === id);
    if (found) {
      setCustomMolarMass(found.molarMass.toString());
    }
  };

  const gasCalc = useMemo(() => {
    const M = parseFloat(customMolarMass);
    const Tact = parseFloat(operatingTempC);
    const Pinput = parseFloat(pressureValue);
    const Z = parseFloat(compressibilityZ) || 1.0;
    const flowAct = parseFloat(gasVolFlowAct) || 0;

    const emptyResult = {
      isValid: false,
      error: '',
      M: 0,
      TactK: 0,
      PabsKPa: 0,
      actDensityKgM3: 0,
      actDensityGcm3: 0,
      stpDensityKgM3: 0,
      ntpDensityKgM3: 0,
      specificGravityAir: 0,
      normFlowNm3h: 0,
      massFlowKgH: 0,
      expansionRatio: 1,
    };

    if (isNaN(M) || isNaN(Tact) || isNaN(Pinput) || M <= 0 || Z <= 0) {
      return { ...emptyResult, error: isZh ? '分子量与压力必须大于0' : 'Molar mass and pressure must be > 0' };
    }

    const TactK = Tact + 273.15;
    if (TactK <= 0) {
      return { ...emptyResult, error: isZh ? '温度不能低于绝对零度 (-273.15℃)' : 'Temperature cannot be below absolute zero' };
    }

    const PabsKPa = pressureType === 'gauge' ? Pinput + 101.325 : Pinput;
    if (PabsKPa <= 0) {
      return { ...emptyResult, error: isZh ? '绝对压力必须大于0' : 'Absolute pressure must be > 0' };
    }

    // Operating condition density:
    const actDensityKgM3 = calculateGasDensity(PabsKPa, Tact, M, Z);

    // Standard conditions:
    // STP (0°C, 101.325 kPa):
    const stpDensityKgM3 = calculateGasDensity(101.325, 0, M, 1.0);
    // NTP (20°C, 101.325 kPa):
    const ntpDensityKgM3 = calculateGasDensity(101.325, 20, M, 1.0);

    // Specific gravity relative to dry air at STP:
    const specificGravityAir = M / 28.964;

    // Flow conversions:
    // Q_N (Nm³/h at STP: 0°C, 101.325 kPa)
    // Q_N = Q_act * (P_abs / 101.325) * (273.15 / T_act_K) * (1 / Z)
    const normFlowNm3h =
      flowAct > 0 ? flowAct * (PabsKPa / 101.325) * (273.15 / TactK) * (1 / Z) : 0;
    const massFlowKgH = flowAct > 0 ? flowAct * actDensityKgM3 : 0;
    const expansionRatio = actDensityKgM3 > 0 ? stpDensityKgM3 / actDensityKgM3 : 1;

    return {
      isValid: true,
      error: '',
      M,
      TactK,
      PabsKPa,
      actDensityKgM3,
      actDensityGcm3: actDensityKgM3 / 1000,
      stpDensityKgM3,
      ntpDensityKgM3,
      specificGravityAir,
      normFlowNm3h,
      massFlowKgH,
      expansionRatio,
    };
  }, [customMolarMass, operatingTempC, pressureValue, pressureType, compressibilityZ, gasVolFlowAct, isZh]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Module Selector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-2xs font-mono font-bold uppercase rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {isZh ? '工科与工业实战计算引擎' : 'Industrial Physics & Engineering Suite'}
              </span>
              <span className="text-2xs text-slate-400 font-mono">
                ASTM B527 · ISO 13443 · Perry ChemEng
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {isZh ? '专业工程场景密度与物性分析' : 'Specialized Engineering Density Solvers'}
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl">
              {isZh
                ? '针对粉末冶金松装/振实、选矿浮选固液矿浆质量体积浓度、以及气体工况与标态 (STP/NTP) 流量折算提供严密工业物理计算。'
                : 'Advanced modules for powder compressibility, solid-liquid metallurgical slurry concentrations, and real gas STP/NTP state conversions.'}
            </p>
          </div>

          {/* Sub-tab Pills */}
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('powder')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'powder'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isZh ? '粉末冶金散料' : 'Powder Metallurgy'}</span>
            </button>

            <button
              onClick={() => setActiveTab('slurry')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'slurry'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
              <span>{isZh ? '矿浆/固液悬浮液' : 'Slurry & Pulp'}</span>
            </button>

            <button
              onClick={() => setActiveTab('gas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'gas'
                  ? 'bg-white text-emerald-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isZh ? '气体工况与标态' : 'Gas STP / NTP'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: POWDER METALLURGY & BULK DENSITY             */}
      {/* ==================================================== */}
      {activeTab === 'powder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Inputs & Presets (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  {isZh ? '粉体几何参数与物理测定输入' : 'Powder Density Measurements (ASTM B527)'}
                </span>
                <span className="text-2xs font-mono text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                  ISO 3953 · USP &lt;616&gt;
                </span>
              </div>

              {/* Quick Material Presets */}
              <div className="space-y-1.5">
                <label className="text-2xs font-semibold text-slate-500 font-mono">
                  {isZh ? '经典工业粉末与颗粒标样一键载入:' : 'Industrial Material Presets:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {powderPresets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleApplyPowderPreset(p)}
                      className={`px-2.5 py-1 text-2xs font-mono rounded-lg border transition-all cursor-pointer ${
                        powderPreset === p.id
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {isZh ? p.nameZh : p.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Apparent Density */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="powder-app-density" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '松装密度 ρ_app (自由堆积)' : 'Apparent Density (ρ_app)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">g/cm³</span>
                  </div>
                  <input
                    id="powder-app-density"
                    name="apparentDensity"
                    type="number"
                    step="0.01"
                    value={apparentDensity}
                    onChange={(e) => setApparentDensity(e.target.value)}
                    placeholder="2.92"
                    aria-label={isZh ? '松装密度' : 'Apparent Density'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block">
                    {isZh ? '斯柯特容量计或漏斗自流堆积' : 'Scott volumeter or Hall funnel'}
                  </span>
                </div>

                {/* Tap Density */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="powder-tap-density" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '振实密度 ρ_tap (机械捣实)' : 'Tap Density (ρ_tap)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">g/cm³</span>
                  </div>
                  <input
                    id="powder-tap-density"
                    name="tapDensity"
                    type="number"
                    step="0.01"
                    value={tapDensity}
                    onChange={(e) => setTapDensity(e.target.value)}
                    placeholder="3.65"
                    aria-label={isZh ? '振实密度' : 'Tap Density'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block">
                    {isZh ? '按标准经1250~3000次机械敲击' : 'Tapped 1,250–3,000 taps per spec'}
                  </span>
                </div>

                {/* True Skeleton Density */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="powder-true-density" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '骨架真密度 ρ_true (无孔隙)' : 'True Skeleton Density (ρ_true)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">g/cm³</span>
                  </div>
                  <input
                    id="powder-true-density"
                    name="trueDensity"
                    type="number"
                    step="0.01"
                    value={trueDensity}
                    onChange={(e) => setTrueDensity(e.target.value)}
                    placeholder="7.87"
                    aria-label={isZh ? '骨架真密度' : 'True Skeleton Density'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block">
                    {isZh ? '氦气比重瓶法排气测定值' : 'Helium pycnometer theoretical limit'}
                  </span>
                </div>

                {/* Green Compact Density */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="powder-compact-density" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '压坯密度 ρ_green (可选)' : 'Green Compact Density (Optional)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">g/cm³</span>
                  </div>
                  <input
                    id="powder-compact-density"
                    name="compactDensity"
                    type="number"
                    step="0.01"
                    value={compactDensity}
                    onChange={(e) => setCompactDensity(e.target.value)}
                    placeholder="6.95"
                    aria-label={isZh ? '压坯密度' : 'Green Compact Density'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block">
                    {isZh ? '成型模压后未烧结生坯' : 'As-pressed green compact density'}
                  </span>
                </div>
              </div>

              {/* Validation Warning */}
              {!powderCalc.isValid && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
                  {powderCalc.error}
                </div>
              )}
            </div>

            {/* Powder Metallurgy Formulas Guide */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-3">
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>{isZh ? '粉末冶金核心标准公式解析' : 'Mathematical Principles & Standards'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-2xs font-mono">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block font-sans font-semibold">Hausner Ratio (HR):</span>
                  <span className="text-indigo-700 font-bold">HR = ρ_tap / ρ_apparent</span>
                  <span className="text-slate-500 block mt-1 font-sans">
                    {isZh ? '表征粉粒间内摩擦阻力，越接近1流动性越优' : 'Indicator of inter-particle friction & cohesion'}
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block font-sans font-semibold">Carr Index (CI %):</span>
                  <span className="text-indigo-700 font-bold">CI = 100 × (1 - ρ_app / ρ_tap)%</span>
                  <span className="text-slate-500 block mt-1 font-sans">
                    {isZh ? '压缩度指数，用于判定模具充型是否需微震' : 'Compressibility index for hopper flow'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Results Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  {isZh ? '粉体流变与孔隙率评估报告' : 'Powder Rheology & Void Analysis'}
                </span>
                <span
                  className={`text-2xs font-mono font-semibold px-2 py-0.5 rounded ${
                    powderCalc.isValid ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {powderCalc.isValid ? (isZh ? '评定合格' : 'Evaluated') : (isZh ? '输入有误' : 'Invalid')}
                </span>
              </div>

              {/* Main Indicator: Hausner Ratio & Carr Index */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    {isZh ? '霍斯纳比率 (Hausner Ratio, HR)' : 'Hausner Ratio (HR)'}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold font-mono tracking-tight text-indigo-700 tabular-nums">
                      {powderCalc.isValid ? formatNumber(powderCalc.hausnerRatio, 3) : '—'}
                    </span>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      (CI: {powderCalc.isValid ? `${formatNumber(powderCalc.carrIndex, 1)}%` : '—'})
                    </span>
                  </div>
                </div>

                {/* Flowability Rating Badge */}
                {powderCalc.isValid && powderCalc.flowability && (
                  <div className={`p-3 rounded-xl border ${powderCalc.flowability.color} space-y-1`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        {isZh ? '工业流动性分级:' : 'Flowability Rating:'}
                      </span>
                      <span className="text-xs font-mono font-extrabold">
                        {isZh ? powderCalc.flowability.levelZh : powderCalc.flowability.levelEn}
                      </span>
                    </div>
                    <p className="text-2xs leading-normal">
                      {isZh ? powderCalc.flowability.descriptionZh : powderCalc.flowability.descriptionEn}
                    </p>
                  </div>
                )}

                {/* Porosity and Compaction Metrics */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-sans">{isZh ? '振实床层孔隙率 (ε_bed):' : 'Tapped Bed Porosity:'}</span>
                    <span className="font-bold text-slate-900">
                      {powderCalc.isValid ? `${formatNumber(powderCalc.bedPorosity, 1)}%` : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-sans">{isZh ? '松装自由孔隙率 (ε_app):' : 'Apparent Void Fraction:'}</span>
                    <span className="font-bold text-slate-900">
                      {powderCalc.isValid ? `${formatNumber(powderCalc.apparentPorosity, 1)}%` : '—'}
                    </span>
                  </div>
                  {powderCalc.greenRelativeDensity !== null && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="text-slate-700 font-sans font-semibold">
                        {isZh ? '压坯相对致密度 (ρ_rel):' : 'Green Relative Density:'}
                      </span>
                      <span className="font-bold text-indigo-700 text-sm">
                        {powderCalc.isValid ? `${formatNumber(powderCalc.greenRelativeDensity, 1)}%` : '—'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: SLURRY & SUSPENSION PULP CONCENTRATION       */}
      {/* ==================================================== */}
      {activeTab === 'slurry' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Slurry Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  {isZh ? '矿浆/泥浆悬浮体系工艺参数' : 'Slurry & Suspension Parameters'}
                </span>
                <span className="text-2xs font-mono text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                  Perry ChemEng Standard
                </span>
              </div>

              {/* Slurry Material Presets */}
              <div className="space-y-1.5">
                <label className="text-2xs font-semibold text-slate-500 font-mono">
                  {isZh ? '典型矿浆/泥浆/水煤浆工况预设:' : 'Industrial Slurry Presets:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {slurryPresets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleApplySlurryPreset(p)}
                      className="px-2.5 py-1 text-2xs font-mono rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
                    >
                      {isZh ? p.nameZh : p.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode switch */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setSlurryMode('fromMassFraction')}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    slurryMode === 'fromMassFraction'
                      ? 'bg-white text-blue-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isZh ? '已知固相质量浓度 (Cw wt%) 求矿浆密度' : 'Solve Slurry Density from Mass % (Cw)'}
                </button>
                <button
                  onClick={() => setSlurryMode('fromSlurryDensity')}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    slurryMode === 'fromSlurryDensity'
                      ? 'bg-white text-blue-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isZh ? '已知矿浆密度 (ρ_m) 求质量/体积分数' : 'Solve Mass / Vol % from Slurry Density'}
                </button>
              </div>

              {/* Phase Densities Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="slurry-solid-density" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '固相矿物骨架密度 (ρ_solid)' : 'Dry Solid Density (ρ_solid)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">g/cm³</span>
                  </div>
                  <input
                    id="slurry-solid-density"
                    name="solidDensity"
                    type="number"
                    step="0.01"
                    value={solidDensity}
                    onChange={(e) => setSolidDensity(e.target.value)}
                    placeholder="2.70"
                    aria-label={isZh ? '固相矿物骨架密度' : 'Dry Solid Density'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block">
                    {isZh ? '石英2.65, 磁铁矿5.18, 煤1.35' : 'Quartz 2.65, Magnetite 5.18, Coal 1.35'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="slurry-liquid-density" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '液相载体流体密度 (ρ_liquid)' : 'Liquid Carrier Density (ρ_liquid)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">g/cm³</span>
                  </div>
                  <input
                    id="slurry-liquid-density"
                    name="liquidDensity"
                    type="number"
                    step="0.01"
                    value={liquidDensity}
                    onChange={(e) => setLiquidDensity(e.target.value)}
                    placeholder="1.00"
                    aria-label={isZh ? '液相载体流体密度' : 'Liquid Carrier Density'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block">
                    {isZh ? '常温纯水 1.00, 盐水 1.03~1.08' : 'Pure water 1.00, Seawater 1.03'}
                  </span>
                </div>
              </div>

              {/* Target Input based on Mode */}
              {slurryMode === 'fromMassFraction' ? (
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="slurry-mass-fraction" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '固相质量浓度 / 固含量 (Cw)' : 'Solid Mass Fraction / Weight % (Cw)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">wt% (0~100%)</span>
                  </div>
                  <div className="relative">
                    <input
                      id="slurry-mass-fraction"
                      name="massFraction"
                      type="number"
                      step="0.1"
                      min="0"
                      max="99.9"
                      value={massFractionInput}
                      onChange={(e) => setMassFractionInput(e.target.value)}
                      placeholder="35"
                      aria-label={isZh ? '固相质量浓度' : 'Solid Mass Fraction (Cw)'}
                      className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-400">%</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="slurry-density-input" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '实测矿浆比重/密度 (ρ_m)' : 'Measured Slurry Density (ρ_m)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">g/cm³</span>
                  </div>
                  <input
                    id="slurry-density-input"
                    name="slurryDensity"
                    type="number"
                    step="0.01"
                    value={slurryDensityInput}
                    onChange={(e) => setSlurryDensityInput(e.target.value)}
                    placeholder="1.27"
                    aria-label={isZh ? '实测矿浆比重' : 'Measured Slurry Density'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              )}

              {/* Optional Slurry Volumetric Flow */}
              <div className="space-y-1 pt-1 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="slurry-flow-rate" className="font-semibold text-slate-700 cursor-pointer">
                    {isZh ? '矿浆管路体积流量 (Q_slurry, 可选)' : 'Pipeline Volumetric Flow (Q_slurry, Optional)'}
                  </label>
                  <span className="text-2xs text-slate-400 font-mono">m³/h</span>
                </div>
                <input
                  id="slurry-flow-rate"
                  name="slurryFlowRate"
                  type="number"
                  step="1"
                  value={slurryFlowRate}
                  onChange={(e) => setSlurryFlowRate(e.target.value)}
                  placeholder="100"
                  aria-label={isZh ? '矿浆管路体积流量' : 'Pipeline Volumetric Flow'}
                  className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="text-2xs text-slate-400 block">
                  {isZh ? '自动换算干固体绝干处理量 (吨/小时)' : 'Calculates dry solid mass throughput (tons/h)'}
                </span>
              </div>

              {!slurryCalc.isValid && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
                  {slurryCalc.error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Slurry Output Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  {isZh ? '矿浆浓度与固液配比结果' : 'Pulp & Slurry Engineering Output'}
                </span>
                <span
                  className={`text-2xs font-mono font-semibold px-2 py-0.5 rounded ${
                    slurryCalc.isValid ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {slurryCalc.isValid ? (isZh ? '计算完成' : 'Solved') : (isZh ? '等待有效输入' : 'Invalid')}
                </span>
              </div>

              {/* Slurry Density */}
              <div>
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  {isZh ? '矿浆综合密度 (ρ_slurry)' : 'Calculated Slurry Density (ρ_m)'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold font-mono tracking-tight text-blue-600 tabular-nums">
                    {slurryCalc.isValid ? formatNumber(slurryCalc.rhoM, 4) : '—'}
                  </span>
                  <span className="text-base font-bold text-slate-700 font-mono">
                    g/cm³
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ({slurryCalc.isValid ? `${formatNumber(slurryCalc.rhoMSI, 1)} kg/m³` : '—'})
                  </span>
                </div>
              </div>

              {/* Details table */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans">{isZh ? '质量浓度 (Cw wt%):' : 'Solid Mass Fraction (Cw):'}</span>
                  <span className="font-bold text-slate-900">
                    {slurryCalc.isValid ? `${formatNumber(slurryCalc.Cw, 2)}%` : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans">{isZh ? '体积分数 (Cv vol%):' : 'Solid Volume Fraction (Cv):'}</span>
                  <span className="font-bold text-slate-900">
                    {slurryCalc.isValid ? `${formatNumber(slurryCalc.Cv, 2)}%` : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans">{isZh ? '液固质量比 (R = 液/固):' : 'Liquid-to-Solid Ratio (R):'}</span>
                  <span className="font-bold text-slate-900">
                    {slurryCalc.isValid ? `${formatNumber(slurryCalc.liquidSolidRatio, 2)} : 1` : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-sans">{isZh ? '每立方米矿浆含干固相:' : 'Dry Solids per m³ Slurry:'}</span>
                  <span className="font-bold text-blue-700">
                    {slurryCalc.isValid ? `${formatNumber(slurryCalc.drySolidsKgM3, 1)} kg` : '—'}
                  </span>
                </div>
                {slurryCalc.drySolidsMassFlowTonPerHour > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-sans">{isZh ? '干矿石绝干质量处理量:' : 'Dry Solid Mass Flowrate:'}</span>
                    <span className="font-bold text-indigo-700">
                      {slurryCalc.isValid ? `${formatNumber(slurryCalc.drySolidsMassFlowTonPerHour, 2)} t/h` : '—'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: GAS STATE & STP / NTP CONVERSIONS            */}
      {/* ==================================================== */}
      {activeTab === 'gas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Gas Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  {isZh ? '气体介质与工况热力学输入' : 'Gas Thermodynamic State Inputs'}
                </span>
                <span className="text-2xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  ISO 13443 · Real Gas Law
                </span>
              </div>

              {/* Gas Selector */}
              <div className="space-y-1.5">
                <label className="text-2xs font-semibold text-slate-500 font-mono">
                  {isZh ? '常见工况气体一键选择:' : 'Select Gas Species:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GAS_PRESETS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleGasChange(g.id)}
                      className={`px-2.5 py-1 text-2xs font-mono rounded-lg border transition-all cursor-pointer ${
                        selectedGasId === g.id
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {isZh ? g.nameZh : g.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thermodynamic Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Molar Mass */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="gas-molar-mass" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '气体摩尔质量 (M)' : 'Molar Mass (M)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">g/mol (kg/kmol)</span>
                  </div>
                  <input
                    id="gas-molar-mass"
                    name="molarMass"
                    type="number"
                    step="0.001"
                    value={customMolarMass}
                    onChange={(e) => setCustomMolarMass(e.target.value)}
                    placeholder="28.964"
                    aria-label={isZh ? '气体摩尔质量' : 'Gas Molar Mass'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block">
                    {activeGasPreset ? (isZh ? activeGasPreset.nameZh : activeGasPreset.nameEn) : 'Custom Gas'}
                  </span>
                </div>

                {/* Temperature */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="gas-operating-temp" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '现场工况温度 (T_act)' : 'Operating Temperature (T_act)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">°C</span>
                  </div>
                  <input
                    id="gas-operating-temp"
                    name="operatingTemp"
                    type="number"
                    step="0.1"
                    value={operatingTempC}
                    onChange={(e) => setOperatingTempC(e.target.value)}
                    placeholder="80"
                    aria-label={isZh ? '现场工况温度' : 'Operating Temperature'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block font-mono">
                    T = {(parseFloat(operatingTempC) + 273.15 || 0).toFixed(2)} K
                  </span>
                </div>

                {/* Pressure Value & Mode */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="gas-pressure-input" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '现场工况压力 (P)' : 'Operating Pressure (P)'}
                    </label>
                    <div className="flex items-center gap-1" role="group" aria-label="Pressure Mode">
                      <button
                        type="button"
                        onClick={() => setPressureType('gauge')}
                        aria-pressed={pressureType === 'gauge'}
                        className={`px-1.5 py-0.5 text-2xs rounded font-mono cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                          pressureType === 'gauge' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isZh ? '表压 Gauge' : 'Gauge'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPressureType('absolute')}
                        aria-pressed={pressureType === 'absolute'}
                        className={`px-1.5 py-0.5 text-2xs rounded font-mono cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                          pressureType === 'absolute' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isZh ? '绝压 Abs' : 'Abs'}
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      id="gas-pressure-input"
                      name="pressure"
                      type="number"
                      step="1"
                      value={pressureValue}
                      onChange={(e) => setPressureValue(e.target.value)}
                      placeholder="250"
                      aria-label={isZh ? '现场工况压力' : 'Operating Pressure'}
                      className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-400">kPa</span>
                  </div>
                  <span className="text-2xs text-slate-400 block">
                    {pressureType === 'gauge'
                      ? (isZh ? `绝压 P_abs = ${((parseFloat(pressureValue) || 0) + 101.325).toFixed(1)} kPa` : `P_abs = ${((parseFloat(pressureValue) || 0) + 101.325).toFixed(1)} kPa`)
                      : 'Absolute Pressure'}
                  </span>
                </div>

                {/* Compressibility Factor Z */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="gas-compressibility-z" className="font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '压缩因子 (Z, 真实气体修正)' : 'Compressibility Factor (Z)'}
                    </label>
                    <span className="text-2xs text-slate-400 font-mono">1.0 = Ideal</span>
                  </div>
                  <input
                    id="gas-compressibility-z"
                    name="compressibilityZ"
                    type="number"
                    step="0.001"
                    value={compressibilityZ}
                    onChange={(e) => setCompressibilityZ(e.target.value)}
                    placeholder="1.0"
                    aria-label={isZh ? '气体压缩因子 Z' : 'Compressibility factor Z'}
                    className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <span className="text-2xs text-slate-400 block">
                    {isZh ? '常压下中低温理想气体默认为 1.0' : 'Near ambient conditions Z ≈ 1.0'}
                  </span>
                </div>
              </div>

              {/* Operating Volumetric Flow */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="gas-vol-flow" className="font-semibold text-slate-700 cursor-pointer">
                    {isZh ? '现场工况体积流量 (Q_act, 可选)' : 'Operating Volumetric Flow (Q_act, Optional)'}
                  </label>
                  <span className="text-2xs text-slate-400 font-mono">m³/h</span>
                </div>
                <input
                  id="gas-vol-flow"
                  name="gasVolFlow"
                  type="number"
                  step="1"
                  value={gasVolFlowAct}
                  onChange={(e) => setGasVolFlowAct(e.target.value)}
                  placeholder="500"
                  aria-label={isZh ? '现场工况体积流量' : 'Operating Volumetric Flow'}
                  className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-2xs text-slate-400 block">
                  {isZh ? '自动折算为标准状况 Nm³/h (0℃, 101.325 kPa) 及质量流量' : 'Auto converts to Normal Nm³/h (0°C, 101.3 kPa)'}
                </span>
              </div>

              {!gasCalc.isValid && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
                  {gasCalc.error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Gas Output Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  {isZh ? '气体工况与标况物性对比' : 'Gas Thermodynamic State Output'}
                </span>
                <span
                  className={`text-2xs font-mono font-semibold px-2 py-0.5 rounded ${
                    gasCalc.isValid ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {gasCalc.isValid ? (isZh ? '折算完成' : 'Converted') : (isZh ? '等待有效输入' : 'Invalid')}
                </span>
              </div>

              {/* Operating Density */}
              <div>
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  {isZh ? '现场工况实际密度 (ρ_actual)' : 'Actual Operating Density (ρ_act)'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold font-mono tracking-tight text-emerald-700 tabular-nums">
                    {gasCalc.isValid ? formatNumber(gasCalc.actDensityKgM3, 4) : '—'}
                  </span>
                  <span className="text-base font-bold text-slate-700 font-mono">
                    kg/m³
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ({gasCalc.isValid ? `${formatNumber(gasCalc.actDensityGcm3, 6)} g/cm³` : '—'})
                  </span>
                </div>
              </div>

              {/* Comparison Matrix */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans">{isZh ? 'IUPAC STP 标态密度 (0℃, 101.3 kPa):' : 'STP Density (0°C, 101.3 kPa):'}</span>
                  <span className="font-bold text-slate-900">
                    {gasCalc.isValid ? `${formatNumber(gasCalc.stpDensityKgM3, 4)} kg/m³` : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans">{isZh ? 'ISO NTP 常态密度 (20℃, 101.3 kPa):' : 'NTP Density (20°C, 101.3 kPa):'}</span>
                  <span className="font-bold text-slate-900">
                    {gasCalc.isValid ? `${formatNumber(gasCalc.ntpDensityKgM3, 4)} kg/m³` : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans">{isZh ? '空气相对比重 (SG vs Dry Air):' : 'Specific Gravity (Air = 1.0):'}</span>
                  <span className="font-bold text-emerald-800">
                    {gasCalc.isValid ? formatNumber(gasCalc.specificGravityAir, 3) : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-sans">{isZh ? '工况标况膨胀比率 (V_act / V_stp):' : 'Volume Expansion (Act / STP):'}</span>
                  <span className="font-bold text-slate-900">
                    {gasCalc.isValid ? `${formatNumber(gasCalc.expansionRatio, 3)}×` : '—'}
                  </span>
                </div>
                {gasCalc.normFlowNm3h > 0 && (
                  <>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-700 font-sans font-semibold">
                        {isZh ? '折算标准状态流量 (Q_norm):' : 'Normalized Flow (Q_norm):'}
                      </span>
                      <span className="font-bold text-emerald-700 text-sm">
                        {gasCalc.isValid ? `${formatNumber(gasCalc.normFlowNm3h, 1)} Nm³/h` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-sans">{isZh ? '气体质量流量 (Mass Flow):' : 'Gas Mass Flowrate:'}</span>
                      <span className="font-bold text-slate-900">
                        {gasCalc.isValid ? `${formatNumber(gasCalc.massFlowKgH, 1)} kg/h` : '—'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
