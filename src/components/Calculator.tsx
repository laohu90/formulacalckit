import React, { useState, useMemo } from 'react';
import {
  CalculationMode,
  DensityUnit,
  MassUnit,
  VolumeUnit,
  Substance,
} from '../types/density';
import {
  massToGram,
  gramToMass,
  volumeToCm3,
  cm3ToVolume,
  densityToGcm3,
  gcm3ToDensity,
  formatNumber,
  getSIEquivalents,
} from '../utils/units';
import {
  calculateUncertainty,
  countSignificantFigures,
  getWaterDensityTanaka,
  correctDensityForTemp,
  THERMAL_EXPANSION_PRESETS,
} from '../utils/engineering';
import { DEFAULT_SUBSTANCES } from '../data/materials';
import { Language, TRANSLATIONS } from '../i18n/translations';
import confetti from 'canvas-confetti';
import {
  Copy,
  Check,
  Scale,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Percent,
  Thermometer,
  RotateCcw,
} from 'lucide-react';

interface CalculatorProps {
  lang: Language;
  onSelectSubstanceForBuoyancy?: (substance: Substance) => void;
  onDensityChange?: (densityGcm3: number) => void;
  selectedDensityPreset?: number | null;
}

export const Calculator: React.FC<CalculatorProps> = ({
  lang,
  onDensityChange,
  selectedDensityPreset,
}) => {
  const isZh = lang === 'zh';
  const t = TRANSLATIONS[lang];
  const [mode, setMode] = useState<CalculationMode>('density');

  // Input States
  const [massInput, setMassInput] = useState<string>('78.7');
  const [massUnit, setMassUnit] = useState<MassUnit>('g');

  const [volumeInput, setVolumeInput] = useState<string>('10');
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>('cm³');

  const [densityInput, setDensityInput] = useState<string>('7.87');
  const [densityUnit, setDensityUnit] = useState<DensityUnit>('g/cm³');

  const [precision, setPrecision] = useState<number>(4);
  const [copied, setCopied] = useState<boolean>(false);
  const [showSteps, setShowSteps] = useState<boolean>(true);

  // Active preset state for full bilingual reactivity
  const [selectedSubstanceId, setSelectedSubstanceId] = useState<string | null>('iron');
  const [customMaterialName, setCustomMaterialName] = useState<string | null>(null);

  // Advanced Panels States
  const [showUncertainty, setShowUncertainty] = useState<boolean>(false);
  const [deltaMInput, setDeltaMInput] = useState<string>('0.05'); // in massUnit
  const [deltaVInput, setDeltaVInput] = useState<string>('0.1'); // in volumeUnit

  const [showTempCorrection, setShowTempCorrection] = useState<boolean>(false);
  const [targetTempC, setTargetTempC] = useState<string>('25');
  const [refTempC, setRefTempC] = useState<string>('20');
  const [tempPreset, setTempPreset] = useState<string>('water');
  const [customBeta, setCustomBeta] = useState<string>('0.000214');

  // Quick Material Presets with complete bilingual translations
  const quickSubstances = useMemo(() => {
    return [
      { id: 'water-4c', nameEn: 'Water (4°C)', nameZh: '纯水 (4℃)', val: 1.0 },
      { id: 'iron', nameEn: 'Iron / Steel', nameZh: '纯铁 / 纯钢', val: 7.87 },
      { id: 'aluminum', nameEn: 'Aluminum', nameZh: '纯铝', val: 2.7 },
      { id: 'copper', nameEn: 'Copper', nameZh: '纯铜', val: 8.96 },
      { id: 'gold', nameEn: 'Gold', nameZh: '黄金', val: 19.32 },
      { id: 'mercury', nameEn: 'Mercury', nameZh: '水银 / 汞', val: 13.6 },
      { id: 'alcohol', nameEn: 'Alcohol (Ethanol)', nameZh: '无水酒精', val: 0.789 },
      { id: 'ice', nameEn: 'Ice (0°C)', nameZh: '冰 (0℃)', val: 0.917 },
      { id: 'vegetable-oil', nameEn: 'Vegetable Oil', nameZh: '植物油', val: 0.92 },
      { id: 'glass', nameEn: 'Glass', nameZh: '平板玻璃', val: 2.5 },
      { id: 'air', nameEn: 'Air (0°C)', nameZh: '空气 (0℃)', val: 0.001293 },
    ];
  }, []);

  // Reactive substance display name that switches immediately when lang toggles
  const currentSubstanceDisplayName = useMemo(() => {
    if (customMaterialName) return customMaterialName;
    if (selectedSubstanceId) {
      const match = quickSubstances.find((s) => s.id === selectedSubstanceId);
      if (match) return isZh ? match.nameZh : match.nameEn;
    }
    return isZh ? '纯铁 / 纯钢' : 'Iron / Steel';
  }, [customMaterialName, selectedSubstanceId, quickSubstances, isZh]);

  // Apply density preset if selected from external scale
  React.useEffect(() => {
    if (selectedDensityPreset && selectedDensityPreset > 0) {
      const inCurrent = gcm3ToDensity(selectedDensityPreset, densityUnit);
      setDensityInput(formatNumber(inCurrent, 4));
      setSelectedSubstanceId(null);
      setCustomMaterialName(isZh ? '外部选定物质' : 'Selected Substance');
      if (mode === 'density') {
        setMode('mass');
      }
    }
  }, [selectedDensityPreset, densityUnit, mode, isZh]);

  const handleSelectMaterial = (sub: Substance) => {
    setSelectedSubstanceId(sub.id);
    setCustomMaterialName(null);
    const inCurrentUnit = gcm3ToDensity(sub.density, densityUnit);
    setDensityInput(formatNumber(inCurrentUnit, 4));

    if (mode === 'density') {
      setMode('mass');
    }
  };

  // Perform Calculations
  const calculation = useMemo(() => {
    const mNum = parseFloat(massInput);
    const vNum = parseFloat(volumeInput);
    const dNum = parseFloat(densityInput);

    let calculatedGcm3 = 0;
    let calculatedMassG = 0;
    let calculatedVolumeCm3 = 0;

    const massInG = !isNaN(mNum) && mNum > 0 ? massToGram(mNum, massUnit) : 0;
    const volInCm3 = !isNaN(vNum) && vNum > 0 ? volumeToCm3(vNum, volumeUnit) : 0;
    const densInGcm3 = !isNaN(dNum) && dNum > 0 ? densityToGcm3(dNum, densityUnit) : 0;

    let isValid = false;
    let errorMsg = '';
    let stepRows: { label: string; text: string }[] = [];

    if (mode === 'density') {
      if (isNaN(mNum) || mNum <= 0) {
        errorMsg = isZh ? '质量必须大于0' : 'Mass must be greater than 0';
      } else if (isNaN(vNum) || vNum <= 0) {
        errorMsg = isZh
          ? '体积不能为0或负数（除数不能为0）'
          : 'Volume cannot be zero or negative (division by zero)';
      } else {
        calculatedMassG = massInG;
        calculatedVolumeCm3 = volInCm3;
        calculatedGcm3 = massInG / volInCm3;
        isValid = true;

        stepRows = [
          {
            label: t.stepGiven,
            text: isZh
              ? `质量 m = ${massInput} ${massUnit}，体积 V = ${volumeInput} ${volumeUnit}`
              : `Mass m = ${massInput} ${massUnit}, Volume V = ${volumeInput} ${volumeUnit}`,
          },
          {
            label: t.stepUnits,
            text: `m = ${formatNumber(massInG)} g (${formatNumber(massInG / 1000, 6)} kg), V = ${formatNumber(volInCm3)} cm³ (${formatNumber(volInCm3 / 1e6, 8)} m³)`,
          },
          {
            label: t.stepFormula,
            text: 'ρ = m / V',
          },
          {
            label: t.stepSubstitute,
            text: `ρ = ${formatNumber(massInG)} g / ${formatNumber(volInCm3)} cm³ = ${formatNumber(calculatedGcm3, precision)} g/cm³`,
          },
          {
            label: t.stepResultSI,
            text: `ρ = ${formatNumber(calculatedGcm3 * 1000, precision)} kg/m³ (1 g/cm³ = 1,000 kg/m³)`,
          },
        ];
      }
    } else if (mode === 'mass') {
      if (isNaN(dNum) || dNum <= 0) {
        errorMsg = isZh ? '密度必须大于0' : 'Density must be greater than 0';
      } else if (isNaN(vNum) || vNum <= 0) {
        errorMsg = isZh ? '体积必须大于0' : 'Volume must be greater than 0';
      } else {
        calculatedGcm3 = densInGcm3;
        calculatedVolumeCm3 = volInCm3;
        calculatedMassG = densInGcm3 * volInCm3;
        isValid = true;

        stepRows = [
          {
            label: t.stepGiven,
            text: isZh
              ? `密度 ρ = ${densityInput} ${densityUnit}，体积 V = ${volumeInput} ${volumeUnit}`
              : `Density ρ = ${densityInput} ${densityUnit}, Volume V = ${volumeInput} ${volumeUnit}`,
          },
          {
            label: t.stepUnits,
            text: `ρ = ${formatNumber(densInGcm3)} g/cm³, V = ${formatNumber(volInCm3)} cm³`,
          },
          {
            label: t.stepFormula,
            text: 'm = ρ × V',
          },
          {
            label: t.stepSubstitute,
            text: `m = ${formatNumber(densInGcm3)} g/cm³ × ${formatNumber(volInCm3)} cm³ = ${formatNumber(calculatedMassG, precision)} g`,
          },
          {
            label: t.stepResultSI,
            text: `m = ${formatNumber(gramToMass(calculatedMassG, massUnit), precision)} ${massUnit} (${formatNumber(calculatedMassG / 1000, precision)} kg)`,
          },
        ];
      }
    } else if (mode === 'volume') {
      if (isNaN(mNum) || mNum <= 0) {
        errorMsg = isZh ? '质量必须大于0' : 'Mass must be greater than 0';
      } else if (isNaN(dNum) || dNum <= 0) {
        errorMsg = isZh
          ? '密度不能为0或负数（除数不能为0）'
          : 'Density cannot be zero or negative (division by zero)';
      } else {
        calculatedMassG = massInG;
        calculatedGcm3 = densInGcm3;
        calculatedVolumeCm3 = massInG / densInGcm3;
        isValid = true;

        stepRows = [
          {
            label: t.stepGiven,
            text: isZh
              ? `质量 m = ${massInput} ${massUnit}，密度 ρ = ${densityInput} ${densityUnit}`
              : `Mass m = ${massInput} ${massUnit}, Density ρ = ${densityInput} ${densityUnit}`,
          },
          {
            label: t.stepUnits,
            text: `m = ${formatNumber(massInG)} g, ρ = ${formatNumber(densInGcm3)} g/cm³`,
          },
          {
            label: t.stepFormula,
            text: 'V = m / ρ',
          },
          {
            label: t.stepSubstitute,
            text: `V = ${formatNumber(massInG)} g / ${formatNumber(densInGcm3)} g/cm³ = ${formatNumber(calculatedVolumeCm3, precision)} cm³`,
          },
          {
            label: t.stepResultSI,
            text: `V = ${formatNumber(cm3ToVolume(calculatedVolumeCm3, volumeUnit), precision)} ${volumeUnit} (${formatNumber(calculatedVolumeCm3 / 1e6, precision + 2)} m³)`,
          },
        ];
      }
    }

    const si = getSIEquivalents(calculatedGcm3, calculatedMassG, calculatedVolumeCm3);

    return {
      isValid,
      errorMsg,
      densityGcm3: calculatedGcm3,
      massG: calculatedMassG,
      volumeCm3: calculatedVolumeCm3,
      si,
      stepRows,
    };
  }, [mode, massInput, massUnit, volumeInput, volumeUnit, densityInput, densityUnit, precision, isZh, t]);

  // Sync density change upward if valid
  React.useEffect(() => {
    if (calculation.isValid && calculation.densityGcm3 > 0 && onDensityChange) {
      onDensityChange(calculation.densityGcm3);
    }
  }, [calculation.densityGcm3, calculation.isValid, onDensityChange]);

  // Uncertainty Calculation
  const uncertaintyCalc = useMemo(() => {
    const m = parseFloat(massInput);
    const v = parseFloat(volumeInput);
    const dm = parseFloat(deltaMInput);
    const dv = parseFloat(deltaVInput);

    if (!calculation.isValid || isNaN(dm) || isNaN(dv) || dm < 0 || dv < 0 || m <= 0 || v <= 0) {
      return null;
    }

    const dmG = massToGram(dm, massUnit);
    const dvCm3 = volumeToCm3(dv, volumeUnit);
    const mG = massToGram(m, massUnit);
    const vCm3 = volumeToCm3(v, volumeUnit);

    const res = calculateUncertainty(mG, dmG, vCm3, dvCm3, calculation.densityGcm3);

    const deltaRhoInUnit = gcm3ToDensity(res.deltaRho, densityUnit);
    const expandedDeltaRhoInUnit = gcm3ToDensity(res.expandedDeltaRho, densityUnit);
    const calcRhoInUnit = gcm3ToDensity(calculation.densityGcm3, densityUnit);

    const sigFigsM = countSignificantFigures(massInput);
    const sigFigsV = countSignificantFigures(volumeInput);
    const recommendedSigFigs = Math.min(sigFigsM, sigFigsV);

    return {
      ...res,
      deltaRhoInUnit,
      expandedDeltaRhoInUnit,
      calcRhoInUnit,
      sigFigsM,
      sigFigsV,
      recommendedSigFigs,
    };
  }, [calculation.isValid, calculation.densityGcm3, massInput, volumeInput, deltaMInput, deltaVInput, massUnit, volumeUnit, densityUnit]);

  // Temperature Correction
  const tempCorrectionCalc = useMemo(() => {
    if (!calculation.isValid || calculation.densityGcm3 <= 0) return null;

    const tTarget = parseFloat(targetTempC);
    const tRef = parseFloat(refTempC);
    const beta = parseFloat(customBeta) || 0.000214;

    if (isNaN(tTarget) || isNaN(tRef)) return null;

    let densityAtTargetGcm3 = 0;
    let densityAtRefGcm3 = calculation.densityGcm3;

    if (tempPreset === 'water') {
      const waterRefKgM3 = getWaterDensityTanaka(tRef);
      const waterTargetKgM3 = getWaterDensityTanaka(tTarget);
      densityAtRefGcm3 = waterRefKgM3 / 1000;
      densityAtTargetGcm3 = waterTargetKgM3 / 1000;
    } else {
      densityAtTargetGcm3 = correctDensityForTemp(densityAtRefGcm3, tRef, tTarget, beta);
    }

    const pctChange =
      densityAtRefGcm3 > 0
        ? ((densityAtTargetGcm3 - densityAtRefGcm3) / densityAtRefGcm3) * 100
        : 0;

    return {
      tTarget,
      tRef,
      densityAtRefGcm3,
      densityAtTargetGcm3,
      densityAtTargetInUnit: gcm3ToDensity(densityAtTargetGcm3, densityUnit),
      pctChange,
    };
  }, [calculation.isValid, calculation.densityGcm3, targetTempC, refTempC, tempPreset, customBeta, densityUnit]);

  const handleApplyTempPreset = (preset: typeof THERMAL_EXPANSION_PRESETS[0]) => {
    setTempPreset(preset.id);
    setCustomBeta(preset.beta.toString());
    setRefTempC(preset.refTemp.toString());
  };

  const handleCopySteps = async () => {
    if (!calculation.isValid) return;
    const headerLine = isZh ? '【物理密度计算推导步骤】' : '【Physics Density Derivation Steps】';
    const text = [
      headerLine,
      ...calculation.stepRows.map((s) => `${s.label}: ${s.text}`),
      isZh
        ? `最终结论: 密度 ρ = ${formatNumber(calculation.densityGcm3)} g/cm³ = ${formatNumber(calculation.si.densitySI)} kg/m³`
        : `Result: Density ρ = ${formatNumber(calculation.densityGcm3)} g/cm³ = ${formatNumber(calculation.si.densitySI)} kg/m³`,
    ].join('\n');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      confetti({ particleCount: 20, spread: 45, origin: { y: 0.8 } });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const closestSubstance = useMemo(() => {
    if (!calculation.isValid || calculation.densityGcm3 <= 0) return null;
    let closest = DEFAULT_SUBSTANCES[0];
    let minDiff = Math.abs(closest.density - calculation.densityGcm3);
    for (const s of DEFAULT_SUBSTANCES) {
      const diff = Math.abs(s.density - calculation.densityGcm3);
      if (diff < minDiff) {
        minDiff = diff;
        closest = s;
      }
    }
    const diffPct = (Math.abs(closest.density - calculation.densityGcm3) / closest.density) * 100;
    return {
      substance: closest,
      diffPct,
      name: isZh ? closest.name : closest.nameEn,
    };
  }, [calculation.densityGcm3, calculation.isValid, isZh]);

  const isVolumeZeroOrNegative =
    mode === 'density' && (parseFloat(volumeInput) <= 0 || isNaN(parseFloat(volumeInput)));

  return (
    <div className="space-y-6">
      {/* Target Selector & Precision Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
            {t.calcTarget}
          </span>
          <div className="flex items-center p-1 bg-slate-100 rounded-lg" role="tablist" aria-label="Calculation Mode Selector">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'density'}
              aria-label={t.targetDensity}
              onClick={() => setMode('density')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'density'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.targetDensity}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'mass'}
              aria-label={t.targetMass}
              onClick={() => setMode('mass')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'mass'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.targetMass}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'volume'}
              aria-label={t.targetVolume}
              onClick={() => setMode('volume')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'volume'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.targetVolume}
            </button>
          </div>
        </div>

        {/* Precision Setting */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">{t.precision}</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md" role="group" aria-label="Decimal Precision Selector">
            {[2, 3, 4, 6].map((p) => (
              <button
                key={p}
                type="button"
                aria-label={isZh ? `保留 ${p} 位有效小数` : `Format with ${p} decimal places`}
                onClick={() => setPrecision(p)}
                className={`px-2 py-0.5 text-xs font-mono rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  precision === p
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                <span>{t.inputParameters}</span>
              </h2>
              <span className="text-2xs text-slate-400 font-mono">
                {t.siAutoSync}
              </span>
            </div>

            {/* Mass Input */}
            {mode !== 'mass' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-mass-input" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    {t.massLabel}
                  </label>
                  <span id="calc-mass-helper" className="text-2xs font-mono text-slate-400">
                    {t.siBase}: {formatNumber(massToGram(parseFloat(massInput) || 0, massUnit) / 1000, 5)} kg
                  </span>
                </div>
                <div className="flex rounded-lg shadow-2xs">
                  <input
                    id="calc-mass-input"
                    name="mass"
                    type="number"
                    step="any"
                    value={massInput}
                    onChange={(e) => setMassInput(e.target.value)}
                    placeholder={t.massPlaceholder}
                    aria-label={t.massLabel}
                    aria-describedby="calc-mass-helper"
                    className="block w-full rounded-l-lg border-y border-l border-slate-300 px-3.5 py-2 text-slate-900 text-base font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <select
                    id="calc-mass-unit"
                    name="massUnit"
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value as MassUnit)}
                    aria-label={isZh ? '选择质量单位' : 'Select mass unit'}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="g">g (gram)</option>
                    <option value="kg">kg (SI base)</option>
                    <option value="mg">mg (milligram)</option>
                    <option value="t">t (metric ton)</option>
                    <option value="lb">lb (pound)</option>
                    <option value="oz">oz (ounce)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Volume Input */}
            {mode !== 'volume' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-volume-input" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    {t.volumeLabel}
                  </label>
                  <span id="calc-volume-helper" className="text-2xs font-mono text-slate-400">
                    {t.siBase}: {formatNumber(volumeToCm3(parseFloat(volumeInput) || 0, volumeUnit) / 1e6, 7)} m³
                  </span>
                </div>
                <div className="flex rounded-lg shadow-2xs">
                  <input
                    id="calc-volume-input"
                    name="volume"
                    type="number"
                    step="any"
                    value={volumeInput}
                    onChange={(e) => setVolumeInput(e.target.value)}
                    placeholder={t.volumePlaceholder}
                    aria-label={t.volumeLabel}
                    aria-describedby="calc-volume-helper"
                    className={`block w-full rounded-l-lg border-y border-l px-3.5 py-2 text-slate-900 text-base font-mono focus:ring-2 outline-none transition-colors ${
                      isVolumeZeroOrNegative
                        ? 'border-amber-400 bg-amber-50/20 focus:border-amber-500 focus:ring-amber-500'
                        : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  <select
                    id="calc-volume-unit"
                    name="volumeUnit"
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value as VolumeUnit)}
                    aria-label={isZh ? '选择体积单位' : 'Select volume unit'}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="cm³">cm³ (cubic centimeter)</option>
                    <option value="m³">m³ (SI base)</option>
                    <option value="dm³">dm³ (cubic decimeter)</option>
                    <option value="L">L (liter)</option>
                    <option value="mL">mL (milliliter)</option>
                    <option value="mm³">mm³</option>
                    <option value="ft³">ft³ (cubic foot)</option>
                    <option value="in³">in³ (cubic inch)</option>
                    <option value="gal">gal (US gallon)</option>
                  </select>
                </div>
                {isVolumeZeroOrNegative && (
                  <div className="flex items-center gap-1.5 text-2xs text-amber-700 font-medium pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                    <span>
                      {isZh
                        ? '体积不能为0或负数（数学除数不能为0，右侧显示未定义状态）。'
                        : 'Volume cannot be zero or negative (division by zero, shown as undefined on right).'}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Density Input */}
            {mode !== 'density' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-density-input" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    {t.densityLabel}
                  </label>
                  <span id="calc-density-helper" className="text-2xs font-mono text-slate-400">
                    {t.siBase}: {formatNumber(densityToGcm3(parseFloat(densityInput) || 0, densityUnit) * 1000, 4)} kg/m³
                  </span>
                </div>
                <div className="flex rounded-lg shadow-2xs">
                  <input
                    id="calc-density-input"
                    name="density"
                    type="number"
                    step="any"
                    value={densityInput}
                    onChange={(e) => {
                      setDensityInput(e.target.value);
                      setSelectedSubstanceId(null);
                      setCustomMaterialName(t.customMaterial);
                    }}
                    placeholder={t.densityPlaceholder}
                    aria-label={t.densityLabel}
                    aria-describedby="calc-density-helper"
                    className="block w-full rounded-l-lg border-y border-l border-slate-300 px-3.5 py-2 text-slate-900 text-base font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <select
                    id="calc-density-unit"
                    name="densityUnit"
                    value={densityUnit}
                    onChange={(e) => setDensityUnit(e.target.value as DensityUnit)}
                    aria-label={isZh ? '选择密度单位' : 'Select density unit'}
                    className="rounded-r-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="g/cm³">g/cm³</option>
                    <option value="kg/m³">kg/m³ (SI base)</option>
                    <option value="g/mL">g/mL</option>
                    <option value="kg/L">kg/L</option>
                    <option value="lb/ft³">lb/ft³</option>
                    <option value="lb/in³">lb/in³</option>
                  </select>
                </div>
              </div>
            )}

            {/* Quick Material Presets */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  {t.quickFill}
                </span>
                <span className="text-2xs text-blue-600 font-semibold font-mono">
                  {t.currentPreset}: {currentSubstanceDisplayName}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Material Presets">
                {quickSubstances.map((item) => {
                  const targetSub = DEFAULT_SUBSTANCES.find((s) => s.id === item.id);
                  const label = isZh ? item.nameZh : item.nameEn;
                  const isSelected = selectedSubstanceId === item.id && !customMaterialName;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`${label} (${item.val} g/cm³)`}
                      onClick={() => {
                        if (targetSub) handleSelectMaterial(targetSub);
                      }}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isSelected
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                          : 'bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border-slate-200/60'
                      }`}
                    >
                      {label} ({item.val} g/cm³)
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* ADVANCED ACCORDION 1: UNCERTAINTY & SIG FIGS       */}
          {/* ==================================================== */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <button
              type="button"
              aria-expanded={showUncertainty}
              onClick={() => setShowUncertainty(!showUncertainty)}
              className="w-full px-5 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800">
                  {isZh ? '测量不确定度与有效数字分析 (GUM 误差传递)' : 'Uncertainty & Significant Figures (GUM Error Propagation)'}
                </span>
              </div>
              {showUncertainty ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showUncertainty && (
              <div className="p-5 space-y-4 border-t border-slate-100 text-xs">
                <p className="text-2xs text-slate-500">
                  {isZh
                    ? '根据国际计量规范 (GUM/ISO)，输入天平与量筒的极限允差或标准不确定度，合成求得密度的组合不确定度与 95% 置信区间 (k=2)。'
                    : 'Input instrument tolerances (Δm, ΔV) to evaluate combined uncertainty via Gaussian error propagation and sig figs.'}
                </p>

                {/* Tolerance inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-2xs">
                      <label htmlFor="calc-delta-m" className="font-semibold text-slate-700 cursor-pointer">
                        {isZh ? '质量允许公差 ±Δm' : 'Mass Uncertainty (±Δm)'}
                      </label>
                      <span className="font-mono text-slate-400">{massUnit}</span>
                    </div>
                    <input
                      id="calc-delta-m"
                      name="deltaM"
                      type="number"
                      step="any"
                      value={deltaMInput}
                      onChange={(e) => setDeltaMInput(e.target.value)}
                      placeholder="0.01"
                      aria-label={isZh ? '质量允许公差' : 'Mass tolerance'}
                      className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-2xs">
                      <label htmlFor="calc-delta-v" className="font-semibold text-slate-700 cursor-pointer">
                        {isZh ? '体积允许公差 ±ΔV' : 'Volume Uncertainty (±ΔV)'}
                      </label>
                      <span className="font-mono text-slate-400">{volumeUnit}</span>
                    </div>
                    <input
                      id="calc-delta-v"
                      name="deltaV"
                      type="number"
                      step="any"
                      value={deltaVInput}
                      onChange={(e) => setDeltaVInput(e.target.value)}
                      placeholder="0.1"
                      aria-label={isZh ? '体积允许公差' : 'Volume tolerance'}
                      className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                {/* Uncertainty output card */}
                {uncertaintyCalc && (
                  <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-2 font-mono text-2xs">
                    <div className="flex justify-between items-center text-indigo-900 font-bold">
                      <span>{isZh ? '标准不确定度 u_c(ρ):' : 'Combined Uncertainty u_c(ρ):'}</span>
                      <span>
                        ± {formatNumber(uncertaintyCalc.deltaRhoInUnit, 5)} {densityUnit} (
                        {formatNumber(uncertaintyCalc.relDeltaRho, 2)}%)
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-indigo-950 font-bold text-xs pt-1 border-t border-indigo-200/50">
                      <span>{isZh ? '扩展不确定度 (95%置信度, k=2):' : 'Expanded Uncertainty (95%, k=2):'}</span>
                      <span className="text-indigo-700">
                        ± {formatNumber(uncertaintyCalc.expandedDeltaRhoInUnit, 4)} {densityUnit}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 pt-1">
                      <span>{isZh ? '最终科学表述:' : 'Scientific Result:'}</span>
                      <span className="font-bold text-slate-900">
                        ρ = ({formatNumber(uncertaintyCalc.calcRhoInUnit, 4)} ±{' '}
                        {formatNumber(uncertaintyCalc.expandedDeltaRhoInUnit, 4)}) {densityUnit}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-indigo-200/50 text-slate-500 font-sans">
                      <span>
                        {isZh
                          ? `有效数字分析：质量 ${uncertaintyCalc.sigFigsM} 位有效数字，体积 ${uncertaintyCalc.sigFigsV} 位，依乘除法则建议结果保留 ${uncertaintyCalc.recommendedSigFigs} 位有效数字。`
                          : `Significant figures: Mass has ${uncertaintyCalc.sigFigsM} sig figs, Volume has ${uncertaintyCalc.sigFigsV}. Recommended result precision is ${uncertaintyCalc.recommendedSigFigs} sig figs.`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ==================================================== */}
          {/* ADVANCED ACCORDION 2: TEMPERATURE & THERMAL EXPANSION */}
          {/* ==================================================== */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <button
              type="button"
              aria-expanded={showTempCorrection}
              onClick={() => setShowTempCorrection(!showTempCorrection)}
              className="w-full px-5 py-3.5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-800">
                  {isZh ? '温度校正与流体/固态热膨胀 (Tanaka & 热膨胀模型)' : 'Temperature Correction & Thermal Expansion (Tanaka ITS-90)'}
                </span>
              </div>
              {showTempCorrection ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showTempCorrection && (
              <div className="p-5 space-y-4 border-t border-slate-100 text-xs">
                <p className="text-2xs text-slate-500">
                  {isZh
                    ? '温度变化会引发介质体积膨胀导致密度下降。纯水采用 Tanaka et al. (2001) 国际计量公式精确模拟 3.98℃ 反常膨胀曲线；其他流体与固体按体膨胀系数 β 修正。'
                    : 'Correct density for thermal expansion. Water uses the Tanaka et al. ITS-90 model; other media apply volumetric coefficient β.'}
                </p>

                {/* Preset selectors */}
                <div className="space-y-1">
                  <label className="text-2xs font-semibold text-slate-500 font-mono">
                    {isZh ? '热膨胀物性常数预设:' : 'Thermal Expansion Presets:'}
                  </label>
                  <div className="flex flex-wrap gap-1.5" role="group" aria-label="Thermal Expansion Presets">
                    {THERMAL_EXPANSION_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleApplyTempPreset(p)}
                        className={`px-2.5 py-1 text-2xs font-mono rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          tempPreset === p.id
                            ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {isZh ? p.nameZh : p.nameEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Temp inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="calc-ref-temp" className="text-2xs font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '基准温度 T₀ (°C)' : 'Reference Temp T₀ (°C)'}
                    </label>
                    <input
                      id="calc-ref-temp"
                      name="refTemp"
                      type="number"
                      step="0.1"
                      value={refTempC}
                      onChange={(e) => setRefTempC(e.target.value)}
                      placeholder="20"
                      aria-label={isZh ? '基准温度 T0' : 'Reference temperature'}
                      className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="calc-target-temp" className="text-2xs font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '实测/目标温度 T (°C)' : 'Target Temp T (°C)'}
                    </label>
                    <input
                      id="calc-target-temp"
                      name="targetTemp"
                      type="number"
                      step="0.1"
                      value={targetTempC}
                      onChange={(e) => setTargetTempC(e.target.value)}
                      placeholder="25"
                      aria-label={isZh ? '实测目标温度' : 'Target temperature'}
                      className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="calc-thermal-beta" className="text-2xs font-semibold text-slate-700 cursor-pointer">
                      {isZh ? '体膨胀系数 β (1/°C)' : 'Expansion Coeff β (1/°C)'}
                    </label>
                    <input
                      id="calc-thermal-beta"
                      name="thermalBeta"
                      type="number"
                      step="0.00001"
                      value={customBeta}
                      onChange={(e) => {
                        setCustomBeta(e.target.value);
                        setTempPreset('custom');
                      }}
                      placeholder="0.000214"
                      aria-label={isZh ? '体积膨胀系数' : 'Volumetric expansion coefficient'}
                      className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Output */}
                {tempCorrectionCalc && (
                  <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2 font-mono text-2xs">
                    <div className="flex justify-between items-center text-amber-900 font-bold">
                      <span>
                        {isZh ? `校正后密度 (${tempCorrectionCalc.tTarget}°C):` : `Corrected Density at ${tempCorrectionCalc.tTarget}°C:`}
                      </span>
                      <span className="text-sm font-extrabold text-amber-800">
                        {formatNumber(tempCorrectionCalc.densityAtTargetInUnit, 5)} {densityUnit}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600">
                      <span>{isZh ? '相对密度偏差 (Δρ/ρ₀):' : 'Density Difference:'}</span>
                      <span className="font-bold">
                        {tempCorrectionCalc.pctChange > 0 ? '+' : ''}
                        {formatNumber(tempCorrectionCalc.pctChange, 3)}%
                      </span>
                    </div>

                    <div className="text-slate-500 font-sans pt-1 border-t border-amber-200/50">
                      {isZh
                        ? `基准温度 ${tempCorrectionCalc.tRef}°C 标称密度为 ${formatNumber(gcm3ToDensity(tempCorrectionCalc.densityAtRefGcm3, densityUnit), 4)} ${densityUnit}。`
                        : `Baseline at ${tempCorrectionCalc.tRef}°C is ${formatNumber(gcm3ToDensity(tempCorrectionCalc.densityAtRefGcm3, densityUnit), 4)} ${densityUnit}.`}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Derivation Steps Accordion */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <button
                type="button"
                aria-expanded={showSteps}
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{t.derivationTitle}</span>
                {showSteps ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                )}
              </button>

              <button
                type="button"
                onClick={handleCopySteps}
                disabled={!calculation.isValid}
                className="flex items-center gap-1.5 px-2.5 py-1 text-2xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                title={t.copySteps}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{t.copySteps}</span>
                  </>
                )}
              </button>
            </div>

            {showSteps &&
              (calculation.isValid ? (
                <div className="space-y-2 pt-1">
                  {calculation.stepRows.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50/70 rounded-lg border border-slate-100 flex flex-col sm:flex-row sm:items-baseline gap-2 text-xs"
                    >
                      <span className="text-2xs font-mono font-semibold text-indigo-600 min-w-32 shrink-0">
                        {step.label}
                      </span>
                      <span className="font-mono text-slate-800 break-all">
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-slate-400 font-sans">
                  {isVolumeZeroOrNegative
                    ? (isZh ? '体积为 0 时除法未定义，等待输入大于零的有效体积生成物理推导步骤。' : 'Volume cannot be zero (division by zero); please enter a positive volume.')
                    : t.invalidInputsPrompt}
                </div>
              ))}
          </div>
        </div>

        {/* Right Column: Unified Output Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                {t.calcResultTitle}
              </span>
              <span
                className={`text-2xs font-mono font-semibold px-2 py-0.5 rounded transition-all duration-200 ${
                  calculation.isValid
                    ? 'text-emerald-700 bg-emerald-50'
                    : isVolumeZeroOrNegative
                    ? 'text-amber-800 bg-amber-50 border border-amber-200'
                    : 'text-slate-600 bg-slate-100'
                }`}
              >
                {calculation.isValid
                  ? t.calcCompleted
                  : isVolumeZeroOrNegative
                  ? (isZh ? 'V = 0 (除零无意义，密度未定义)' : 'Volume = 0 (Division by zero)')
                  : (isZh ? '等待有效输入' : 'Awaiting Valid Input')}
              </span>
            </div>

            {/* Unified Result & Zero Volume Undefined Card */}
            {isVolumeZeroOrNegative ? (
              <div className="my-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-900 font-mono">
                    {mode === 'density' ? t.densityResult : t.volumeResult}
                  </span>
                  <span className="text-2xs font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                    {isZh ? '数学除法未定义' : 'Undefined'}
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold font-mono text-amber-800 tracking-tight">
                    {isZh ? '未定义 (—)' : 'Undefined (—)'}
                  </div>
                  <p className="text-2xs text-amber-900/80 mt-1 leading-relaxed">
                    {isZh
                      ? `密度基本公式为 ρ = m / V。当前输入体积 V = 0，在实数域中除以零无意义，密度不可计算，因此系统不显示任何虚假 0 值。`
                      : `Formula: ρ = m / V. With volume V = 0, division by zero is mathematically undefined. No misleading zero is displayed.`}
                  </p>
                </div>

                {/* Quick Recovery Button */}
                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-2xs text-amber-800 font-mono">
                    {isZh ? '快捷恢复有效计算:' : 'Quick Fix:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setVolumeInput('10')}
                    className="inline-flex items-center gap-1 px-3 py-1 text-2xs font-semibold rounded-md bg-amber-600 hover:bg-amber-700 text-white transition-colors cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{isZh ? '一键设为 10 cm³' : 'Set V = 10 cm³'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="my-5">
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  {mode === 'density' ? t.densityResult : mode === 'mass' ? t.massResult : t.volumeResult}
                </span>

                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-4xl font-extrabold font-mono tracking-tight tabular-nums ${
                      calculation.isValid ? 'text-blue-600' : 'text-slate-300'
                    }`}
                  >
                    {calculation.isValid
                      ? mode === 'density'
                        ? formatNumber(gcm3ToDensity(calculation.densityGcm3, densityUnit), precision)
                        : mode === 'mass'
                        ? formatNumber(gramToMass(calculation.massG, massUnit), precision)
                        : formatNumber(cm3ToVolume(calculation.volumeCm3, volumeUnit), precision)
                      : '—'}
                  </span>
                  <span
                    className={`text-base font-bold font-mono ${
                      calculation.isValid ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {calculation.isValid
                      ? mode === 'density'
                        ? densityUnit
                        : mode === 'mass'
                        ? massUnit
                        : volumeUnit
                      : '—'}
                  </span>
                </div>
              </div>
            )}

            {/* Standard SI Unit Output */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">{t.siOutputTitle}</span>
                <span className="text-slate-400 font-mono text-2xs">kg, m³, kg/m³</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-2xs">ρ (SI)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {calculation.isValid ? `${formatNumber(calculation.si.densitySI, precision)} kg/m³` : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-2xs">m (SI)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {calculation.isValid ? `${formatNumber(calculation.si.massSI, precision)} kg` : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-2xs">V (SI)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {calculation.isValid ? `${formatNumber(calculation.si.volumeSI, precision + 2)} m³` : '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Water Buoyancy Assessment */}
            {calculation.isValid && calculation.densityGcm3 > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{t.waterFloatStatus}:</span>
                  <span
                    className={`font-semibold font-mono ${
                      calculation.densityGcm3 < 1.0
                        ? 'text-sky-600'
                        : Math.abs(calculation.densityGcm3 - 1.0) < 1e-4
                        ? 'text-teal-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {calculation.densityGcm3 < 1.0
                      ? `${t.floatsInWater} (${((1 - calculation.densityGcm3) * 100).toFixed(1)}% exposed)`
                      : Math.abs(calculation.densityGcm3 - 1.0) < 1e-4
                      ? t.suspendedInWater
                      : `${t.sinksInWater} (${(calculation.densityGcm3).toFixed(2)}× water)`}
                  </span>
                </div>

                {closestSubstance && (
                  <div className="text-2xs p-2 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center justify-between">
                    <span className="text-slate-600">{t.closestMaterial}:</span>
                    <span className="font-bold text-blue-700">
                      {closestSubstance.name} ({closestSubstance.substance.density} g/cm³)
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Equivalents Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-2xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              {t.conversionMatrix}
            </h4>
            <div className="divide-y divide-slate-100 text-xs font-mono">
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500">1 g/cm³</span>
                <span className="font-semibold text-slate-900">= 1,000 kg/m³ = 1 g/mL</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500">1 g/cm³ (Imperial)</span>
                <span className="font-semibold text-slate-900">= 62.428 lb/ft³ ≈ 0.0361 lb/in³</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500">1 m³</span>
                <span className="font-semibold text-slate-900">= 1,000 L = 1,000 dm³ = 10⁶ cm³</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="text-slate-500">1 kg</span>
                <span className="font-semibold text-slate-900">= 1,000 g = 10⁶ mg = 0.001 t</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
