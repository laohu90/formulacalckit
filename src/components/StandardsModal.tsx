import React from 'react';
import { Language } from '../i18n/translations';
import { X, BookCheck, ExternalLink, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface StandardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const StandardsModal: React.FC<StandardsModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const isZh = lang === 'zh';

  const standards = [
    {
      code: 'Tanaka et al. (2001) / Metrologia 38',
      titleEn: 'Recommended Table for the Density of Water Between 0 °C and 40 °C (ITS-90)',
      titleZh: '0℃至40℃纯水国际标准密度推荐公式 (基于ITS-90国际温标)',
      orgEn: 'BIPM & National Metrology Institute of Japan (NMIJ)',
      orgZh: '国际计量局(BIPM) 与 日本国家计量研究所(NMIJ)',
      applicationEn: 'High-precision temperature correction for pure water density (accurate to ~1 ppm).',
      applicationZh: '水温热膨胀高精度密度修正模型（精密度达百万分之一，用于精密流体标定与比重瓶）。',
      formula: 'ρ(t) = a₅ · [1 - (t + a₁)²(t + a₂) / (a₃(t + a₄))]',
      url: 'https://iopscience.iop.org/article/10.1088/0026-1394/38/4/3',
    },
    {
      code: 'ASTM B527 / ISO 3953 / USP <616>',
      titleEn: 'Standard Test Method for Tap Density of Metal Powders and Compounds',
      titleZh: '金属粉末与化合物振实密度国际测试规范 (含药典散料流动性标准)',
      orgEn: 'ASTM International & International Organization for Standardization',
      orgZh: '美国材料与试验协会 (ASTM) & 国际标准化组织 (ISO)',
      applicationEn: 'Powder metallurgy apparent density, tap density, Hausner Ratio (HR), and Carr Compressibility Index (CI).',
      applicationZh: '粉末冶金松装密度、振实密度、霍斯纳比率(HR)与卡尔压缩度指数(CI)流动性分级评定。',
      formula: 'HR = ρ_tap / ρ_apparent, CI = 100 × (1 - ρ_apparent / ρ_tap)%',
      url: 'https://www.astm.org/b0527-20.html',
    },
    {
      code: 'ISO 13443 / IUPAC Standard Reference Conditions',
      titleEn: 'Natural Gas and Gas Mixtures – Standard Reference Conditions (STP / NTP)',
      titleZh: '天然气及工况气体标准参考状态与标态换算 (STP / NTP / SATP)',
      orgEn: 'ISO & International Union of Pure and Applied Chemistry (IUPAC)',
      orgZh: '国际标准化组织 (ISO) & 国际纯粹与应用化学联合会 (IUPAC)',
      applicationEn: 'Conversion between actual operating conditions (act m³/h) and standard state (Nm³/h) using Real Gas Law.',
      applicationZh: '基于实际/理想气体状态方程将现场工况体积流量(m³/h)与标况标方(Nm³/h)精确折算。',
      formula: 'ρ = (P · M) / (Z · R · T), Q_norm = Q_act · (P_act / 101.325) · (273.15 / T_K)',
      url: 'https://www.iso.org/standard/21798.html',
    },
    {
      code: 'Perry\'s Chemical Engineers\' Handbook (9th Ed.)',
      titleEn: 'Mineral Slurry, Suspensions and Pulp Density Formulation',
      titleZh: '矿浆、泥浆与固液悬浮体系冶金化工密度方程',
      orgEn: 'McGraw-Hill Chemical Engineering Standards',
      orgZh: '美国麦格劳-希尔化工权威手册',
      applicationEn: 'Calculates slurry density, mass fraction (Cw wt%), volume fraction (Cv vol%), and liquid/solid ratio.',
      applicationZh: '矿山选矿浮选尾矿、钻井泥浆及水泥浆固体质量分数Cw、体积分数Cv与矿浆密度ρm换算。',
      formula: 'ρ_slurry = 100 / [ (Cw / ρ_solid) + ((100 - Cw) / ρ_liquid) ]',
      url: 'https://www.accessengineeringlibrary.com/content/book/9780071834087',
    },
    {
      code: 'JCGM 100:2008 (GUM)',
      titleEn: 'Guide to the Expression of Uncertainty in Measurement',
      titleZh: '测量不确定度表示指南 (GUM) - 误差合成与传递',
      orgEn: 'Joint Committee for Guides in Metrology (BIPM, IEC, IFCC, ILAC, ISO, IUPAC, IUPAP, OIML)',
      orgZh: '国际计量组织联合委员会 (JCGM)',
      applicationEn: 'Propagation of mass and volume measurement errors into combined standard uncertainty and expanded uncertainty.',
      applicationZh: '质量天平与量筒刻度误差按偏导数与方差合成合成标准不确定度及95%置信区间(k=2)。',
      formula: 'u_c(ρ) = ρ · √[ (Δm/m)² + (ΔV/V)² ], U = k · u_c(ρ) (k=2)',
      url: 'https://www.bipm.org/en/committees/jc/jcgm/publications',
    },
    {
      code: 'NIST Chemistry WebBook (SRD 69)',
      titleEn: 'Thermophysical Properties of Fluid Systems and Reference Standards',
      titleZh: '美国国家标准与技术研究院 (NIST) 流体热物理物性数据库',
      orgEn: 'National Institute of Standards and Technology (NIST)',
      orgZh: '美国国家标准与技术研究院 (NIST)',
      applicationEn: 'Primary reference for pure elemental densities, thermal expansion coefficients, and molar masses.',
      applicationZh: '纯物质单质与化合物标准密度常数、体积膨胀系数与摩尔质量标定基准源。',
      formula: 'ρ(T, P) from fundamental Helmholtz energy equations of state',
      url: 'https://webbook.nist.gov/chemistry/fluid/',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <BookCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isZh ? '权威国际计量标准与数据溯源规范' : 'Authoritative International Standards & Metrology Basis'}
              </h3>
              <p className="text-2xs text-slate-500 font-mono">
                {isZh
                  ? '严格遵循 BIPM / NIST / ISO / ASTM / IUPAC 科学规范与数学推导'
                  : 'Grounded in NIST, ISO, ASTM, BIPM & IUPAC metrological formulations'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed">
          <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-blue-900 block">
                {isZh ? '科学严谨性与数据真实性承诺' : 'Commitment to Scientific Rigor & Accuracy'}
              </span>
              <p className="text-2xs text-blue-800">
                {isZh
                  ? '本工具彻底超越简易的「ρ = m/V」表层换算器，所有公式、物性参数、流体热膨胀系数、粉体散料流变模型与气体状态方程均对照国家级与国际标准建立，并在除零或越界时提供严格的数值防护。'
                  : 'This platform integrates full engineering rigor: temperature/pressure corrections, GUM measurement uncertainty, powder metallurgy compressibility, metallurgical slurry fractions, and ideal/real gas STP state conversions.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              {isZh ? '引用的国际标准与计算模型规范列表' : 'Referenced Standards & Formal Engineering Models'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {standards.map((s, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 text-2xs font-mono font-bold bg-white text-blue-700 border border-blue-200 rounded">
                        {s.code}
                      </span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                        title={isZh ? '查看原始标准文献' : 'View official specification'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <h5 className="font-bold text-slate-800 text-xs">
                      {isZh ? s.titleZh : s.titleEn}
                    </h5>
                    <div className="text-2xs text-slate-500 font-mono">
                      {isZh ? s.orgZh : s.orgEn}
                    </div>
                    <p className="text-2xs text-slate-600 leading-normal">
                      {isZh ? s.applicationZh : s.applicationEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 font-mono text-2xs text-indigo-700 bg-white/70 px-2.5 py-1.5 rounded border border-indigo-100/50 break-all">
                    {s.formula}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-100 rounded-xl space-y-2 text-2xs text-slate-500 border border-slate-200">
            <span className="font-bold text-slate-700 block">
              {isZh ? '标准计量与环境参考基准声明' : 'Reference Metrology & Ambient Condition Declarations'}
            </span>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                {isZh
                  ? '标准固体与液体密度默认在 20.0 °C (293.15 K) 和 101.325 kPa (1.000 atm) 下标定。'
                  : 'Solid and liquid baseline densities are standardized at 20.0 °C (293.15 K) and 101.325 kPa (1 atm).'}
              </li>
              <li>
                {isZh
                  ? '纯水最大密度出现在 3.983 °C，在此温度下空气脱气纯水密度经 Tananka (2001) 测定为 999.97495 kg/m³ (≈ 1.00000 g/cm³)。'
                  : 'Pure water density reaches its maximum at 3.983 °C (999.97495 kg/m³ ≈ 1.00000 g/cm³ per Tanaka et al.).'}
              </li>
              <li>
                {isZh
                  ? 'IUPAC STP (标准状况) 定义为 0 °C (273.15 K) 与 100.0 kPa (或传统 101.325 kPa)；ISO NTP (常温常压) 定义为 20 °C 与 101.325 kPa。'
                  : 'IUPAC STP is 0 °C (273.15 K) & 101.325 kPa; ISO NTP is 20 °C & 101.325 kPa.'}
              </li>
              <li>
                {isZh
                  ? '除数不能为0防护：当体积 V ≤ 0 或质量 m ≤ 0 时，计算核心即刻中断并返回空值（显示“—”），彻底杜绝除零发散与虚假 0 值。'
                  : 'Division-by-zero safeguard: strictly yields em-dash "—" when V ≤ 0 or m ≤ 0, preventing misleading zero or infinity results.'}
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-2xs text-slate-500 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isZh ? '公式与工程单位已通过 SI 与工科校验' : 'Verified against SI & Engineering Datasets'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs"
          >
            {isZh ? '我已知悉并返回' : 'Got it, Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
