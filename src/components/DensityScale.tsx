import React from 'react';
import { Language } from '../i18n/translations';
import { Compass, MapPin, Sparkles, Check } from 'lucide-react';
import { formatNumber } from '../utils/units';

interface DensityScaleProps {
  lang: Language;
  currentDensity?: number;
  onSelectDensity?: (density: number) => void;
}

interface Milestone {
  id: string;
  nameEn: string;
  nameZh: string;
  val: string;
  numVal: number;
  tagEn: string;
  tagZh: string;
  groupEn: string;
  groupZh: string;
  isBaseline?: boolean;
}

export const DensityScale: React.FC<DensityScaleProps> = ({
  lang,
  currentDensity = 7.87,
  onSelectDensity,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const ladder: Milestone[] = [
    {
      id: 'h2',
      nameEn: 'Hydrogen (H₂)',
      nameZh: '氢气 (H₂)',
      val: '0.0000899 g/cm³',
      numVal: 0.0000899,
      tagEn: 'Lightest known gas',
      tagZh: '已知最轻气体',
      groupEn: 'Gases',
      groupZh: '气体',
    },
    {
      id: 'air',
      nameEn: 'Air (0°C, 1 atm)',
      nameZh: '干燥空气 (0℃)',
      val: '0.001293 g/cm³',
      numVal: 0.001293,
      tagEn: 'Atmospheric standard',
      tagZh: '地球大气基准',
      groupEn: 'Gases',
      groupZh: '气体',
    },
    {
      id: 'aerogel',
      nameEn: 'Silica Aerogel',
      nameZh: '气凝胶 (冻烟)',
      val: '0.003 g/cm³',
      numVal: 0.003,
      tagEn: 'Ultralight solid',
      tagZh: '超轻固体',
      groupEn: 'Ultralight Solids',
      groupZh: '超轻材料',
    },
    {
      id: 'cork',
      nameEn: 'Cork Wood',
      nameZh: '软木塞',
      val: '0.24 g/cm³',
      numVal: 0.24,
      tagEn: 'Floats with high buoyancy',
      tagZh: '高浮力木料',
      groupEn: 'Floating Solids',
      groupZh: '浮水固体',
    },
    {
      id: 'ice',
      nameEn: 'Ice (0°C)',
      nameZh: '冰 (0℃)',
      val: '0.917 g/cm³',
      numVal: 0.917,
      tagEn: '1/11 exposed on water',
      tagZh: '浮于水面 (1/11露出)',
      groupEn: 'Floating Solids',
      groupZh: '浮水固体',
    },
    {
      id: 'water',
      nameEn: 'Pure Water (4°C)',
      nameZh: '纯水 (4℃)',
      val: '1.000 g/cm³',
      numVal: 1.000,
      tagEn: 'Metric & Physics Baseline',
      tagZh: '国际物理法定基准',
      groupEn: 'Standard Reference',
      groupZh: '基准参照',
      isBaseline: true,
    },
    {
      id: 'al',
      nameEn: 'Aluminum (Al)',
      nameZh: '纯铝 (Al)',
      val: '2.70 g/cm³',
      numVal: 2.70,
      tagEn: 'Aerospace light metal',
      tagZh: '航空轻金属',
      groupEn: 'Metals & Solids',
      groupZh: '常用金属',
    },
    {
      id: 'fe',
      nameEn: 'Iron / Steel (Fe)',
      nameZh: '钢铁 / 纯铁 (Fe)',
      val: '7.87 g/cm³',
      numVal: 7.87,
      tagEn: 'Industrial foundation',
      tagZh: '工业基石',
      groupEn: 'Metals & Solids',
      groupZh: '常用金属',
    },
    {
      id: 'cu',
      nameEn: 'Copper (Cu)',
      nameZh: '纯铜 (Cu)',
      val: '8.96 g/cm³',
      numVal: 8.96,
      tagEn: 'High electrical conductor',
      tagZh: '优良导电金属',
      groupEn: 'Metals & Solids',
      groupZh: '常用金属',
    },
    {
      id: 'pb',
      nameEn: 'Lead (Pb)',
      nameZh: '金属铅 (Pb)',
      val: '11.34 g/cm³',
      numVal: 11.34,
      tagEn: 'Radiation shielding',
      tagZh: '防辐射重金属',
      groupEn: 'Heavy Elements',
      groupZh: '高密元素',
    },
    {
      id: 'hg',
      nameEn: 'Mercury (Hg)',
      nameZh: '水银 / 汞 (Hg)',
      val: '13.60 g/cm³',
      numVal: 13.60,
      tagEn: 'Heavy liquid metal',
      tagZh: '常温液态金属',
      groupEn: 'Heavy Elements',
      groupZh: '高密元素',
    },
    {
      id: 'au',
      nameEn: 'Pure Gold (Au)',
      nameZh: '纯金 (Au)',
      val: '19.32 g/cm³',
      numVal: 19.32,
      tagEn: 'Dense precious metal',
      tagZh: '高密度贵金属',
      groupEn: 'Precious & Rare',
      groupZh: '贵重金属',
    },
    {
      id: 'os',
      nameEn: 'Osmium (Os)',
      nameZh: '金属锇 (Os)',
      val: '22.59 g/cm³',
      numVal: 22.59,
      tagEn: 'Densest natural element',
      tagZh: '地球密度最高天然单质',
      groupEn: 'Precious & Rare',
      groupZh: '贵重金属',
    },
    {
      id: 'neutron',
      nameEn: 'Neutron Star',
      nameZh: '中子星物质',
      val: '~10¹⁴ g/cm³',
      numVal: 1e14,
      tagEn: 'Extreme cosmic collapse',
      tagZh: '极端宇宙天体 (亿吨/cm³)',
      groupEn: 'Cosmic Extremes',
      groupZh: '宇宙极端',
    },
  ];

  // Find the milestone closest in logarithmic distance to current calculated density
  let closestIdx = -1;
  let minDiff = Infinity;
  if (currentDensity > 0) {
    ladder.forEach((item, idx) => {
      const diff = Math.abs(Math.log10(item.numVal) - Math.log10(currentDensity));
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
  }

  const closestItem = closestIdx >= 0 ? ladder[closestIdx] : null;

  const handleCardClick = (item: Milestone) => {
    if (onSelectDensity) {
      onSelectDensity(item.numVal);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              {lang === 'en'
                ? 'Cosmic & Material Density Spectrum'
                : '自然与宇宙物质密度全景光谱阶梯'}
            </h3>
            <span className="text-2xs text-slate-400 font-mono hidden md:inline">
              (10⁻⁵ → 10¹⁴ g/cm³)
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {lang === 'en'
              ? 'Click any milestone material to automatically load its density into the calculator.'
              : '点击任意阶梯物质，可直接将其标准密度一键导入上方计算器。'}
          </p>
        </div>

        {/* Current position banner */}
        {closestItem && currentDensity > 0 && (
          <div className="flex items-center gap-2 text-xs font-mono text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 animate-pulse" />
            <span>
              {lang === 'en' ? (
                <>
                  Active Value: <strong>{formatNumber(currentDensity, 3)} g/cm³</strong> ≈{' '}
                  <span className="text-blue-900 font-bold">
                    #{closestIdx + 1} {closestItem.nameEn}
                  </span>
                </>
              ) : (
                <>
                  当前计算值: <strong>{formatNumber(currentDensity, 3)} g/cm³</strong> ≈{' '}
                  <span className="text-blue-900 font-bold">
                    #{closestIdx + 1} {closestItem.nameZh}
                  </span>
                </>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Logarithmic Spectrum Bar Visual */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between text-2xs font-mono text-slate-500">
          <span>{lang === 'en' ? 'Ultralight Gases (H₂)' : '超轻气体 (H₂)'}</span>
          <span className="font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
            ★ {lang === 'en' ? 'Water Baseline (1.000 g/cm³)' : '水基准线 (1.000 g/cm³)'}
          </span>
          <span>{lang === 'en' ? 'Cosmic Extremes (Neutron Star)' : '宇宙坍缩 (中子星)'}</span>
        </div>

        {/* Visual Bar with colored zones */}
        <div className="relative h-2 w-full rounded-full bg-linear-to-r from-sky-200 via-emerald-200 via-amber-200 to-indigo-400 overflow-hidden">
          {/* Subtle water divider line at ~38% */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-cyan-700 shadow-xs z-10"
            style={{ left: '38%' }}
            title="Pure Water 1.000 g/cm³"
          />
        </div>
      </div>

      {/* Milestone Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {ladder.map((item, idx) => {
          const isCurrentCalculated = idx === closestIdx && currentDensity > 0;
          const isWaterStandard = item.isBaseline;
          const isCopied = copiedId === item.id;

          // Distinct styling: Active match is highlighted in blue, Water baseline is clear cyan reference
          let cardClasses =
            'border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-xs';
          if (isCurrentCalculated) {
            cardClasses =
              'border-blue-500 bg-blue-50/90 ring-2 ring-blue-400/60 shadow-xs transform scale-[1.02]';
          } else if (isWaterStandard) {
            cardClasses =
              'border-cyan-300 bg-cyan-50/40 hover:bg-cyan-50/80 hover:border-cyan-400';
          }

          const displayName = lang === 'en' ? item.nameEn : item.nameZh;
          const displayTag = lang === 'en' ? item.tagEn : item.tagZh;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => handleCardClick(item)}
              title={
                lang === 'en'
                  ? `Click to load ${item.nameEn} (${item.val}) into calculator`
                  : `点击将 ${item.nameZh} (${item.val}) 导入计算器`
              }
              className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative group focus:outline-none focus:ring-2 focus:ring-blue-500 ${cardClasses}`}
            >
              {/* Card Header: Rank & Status */}
              <div className="flex items-center justify-between gap-1 mb-1.5 w-full">
                <span className="text-slate-400 font-mono text-3xs font-bold">
                  #{idx + 1}
                </span>

                {isCopied ? (
                  <span className="inline-flex items-center gap-0.5 text-3xs font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    <Check className="w-2.5 h-2.5" />
                    {lang === 'en' ? 'Loaded' : '已填入'}
                  </span>
                ) : isCurrentCalculated ? (
                  <span className="inline-flex items-center gap-0.5 text-3xs font-extrabold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded shadow-2xs animate-pulse">
                    <MapPin className="w-2.5 h-2.5" />
                    {lang === 'en' ? 'Your Value' : '当前匹配'}
                  </span>
                ) : isWaterStandard ? (
                  <span className="inline-flex items-center gap-0.5 text-3xs font-bold text-cyan-800 bg-cyan-100/90 px-1.5 py-0.5 rounded">
                    ★ {lang === 'en' ? 'Baseline' : '基准'}
                  </span>
                ) : null}
              </div>

              {/* Substance Name & Numeric Density */}
              <div>
                <span className="font-bold text-slate-900 block text-xs leading-tight group-hover:text-blue-600 transition-colors">
                  {displayName}
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 block mt-1 tracking-tight">
                  {item.val}
                </span>
              </div>

              {/* Descriptive Tag */}
              <div className="mt-2 pt-1.5 border-t border-slate-200/50 text-3xs text-slate-500 line-clamp-1">
                {displayTag}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
