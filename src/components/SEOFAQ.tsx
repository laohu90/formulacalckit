import React, { useState } from 'react';
import { Language } from '../i18n/translations';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface SEOFAQProps {
  lang: Language;
}

interface FAQItem {
  qEn: string;
  aEn: string;
  qZh: string;
  aZh: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    qEn: 'What is the formula for calculating density?',
    aEn: 'The standard formula for density is ρ = m / V, where ρ (rho) represents density, m is mass, and V is volume. In the International System of Units (SI), density is measured in kilograms per cubic meter (kg/m³), while in laboratory science grams per cubic centimeter (g/cm³) is commonly used.',
    qZh: '密度的基本计算公式是什么？',
    aZh: '密度的标准计算公式为 ρ = m / V，其中 ρ (rho) 表示密度，m 表示质量，V 表示体积。在国际单位制 (SI) 中，密度的法定单位是千克每立方米 (kg/m³)，在实验室和日常物理中常用克每立方厘米 (g/cm³)。',
  },
  {
    qEn: 'How do you calculate mass from density and volume?',
    aEn: 'To find mass when density and volume are known, rearrange the density formula: m = ρ × V. Simply multiply the substance density by the object volume, ensuring both variables use compatible measurement units.',
    qZh: '已知密度和体积，如何计算质量？',
    aZh: '由密度公式 ρ = m / V 变形推导可得：m = ρ × V。只需将物质的密度乘以物体的体积即可求出质量，计算前请确保单位统一（如 g/cm³ 与 cm³，或 kg/m³ 与 m³）。',
  },
  {
    qEn: 'How do you convert g/cm³ to kg/m³?',
    aEn: 'Multiply by 1000. Because 1 gram = 10⁻³ kg and 1 cm³ = 10⁻⁶ m³, dividing 10⁻³ by 10⁻⁶ equals 10³ = 1000. Therefore: 1 g/cm³ = 1,000 kg/m³ = 1 g/mL = 1 kg/L.',
    qZh: 'g/cm³ 与 kg/m³ 如何相互换算？',
    aZh: '直接乘以 1000 即可。因为 1 g = 10⁻³ kg，1 cm³ = 10⁻⁶ m³，两者相除得到 10³ = 1000。因此：1 g/cm³ = 1000 kg/m³ = 1 g/mL = 1 kg/L。反向换算时除以 1000。',
  },
  {
    qEn: 'What is the density of pure water?',
    aEn: 'Pure water reaches its maximum density of exactly 1.0000 g/cm³ (1000 kg/m³) at 4°C (39.2°F). At standard room temperature (20°C / 68°F), the density of water is approximately 0.9982 g/cm³ (998.2 kg/m³).',
    qZh: '纯水的密度是多少？',
    aZh: '纯水在 4℃ 时密度达到最大值，恰好为 1.0000 g/cm³ (1000 kg/m³)。在常温 20℃ 下，纯水的实际密度约为 0.9982 g/cm³ (998.2 kg/m³)。通常物理计算中取 1.0 g/cm³ 或 1.0 × 10³ kg/m³ 作为基准常数。',
  },
  {
    qEn: 'Why does ice float on liquid water?',
    aEn: 'Ice floats on water because its crystalline structure forms open hexagonal rings upon freezing, causing its volume to expand by approximately 9%. This reduces its density to 0.917 g/cm³, which is less than liquid water (1.000 g/cm³). According to Archimedes principle, any object with a lower density than the surrounding fluid floats in equilibrium.',
    qZh: '为什么冰块会浮在水面上？',
    aZh: '因为水在 0℃ 结冰时具有“反常膨胀”特性，水分子形成六角形开放晶格，体积膨胀约 9%，密度降低至 0.917 g/cm³。由于冰的密度小于液态水的密度 (1.000 g/cm³)，根据阿基米德浮力定律，物体受到的向上浮力等于其重力，因而稳定漂浮在水面上，约有 1/11 的体积露出水面。',
  },
  {
    qEn: 'What is the difference between density and specific gravity?',
    aEn: 'Density is an absolute physical quantity with dimensions (mass per unit volume, e.g., kg/m³ or g/cm³). Specific gravity (relative density) is a dimensionless ratio comparing a material density to a reference substance (usually pure water at 4°C). Because water density is 1.0 g/cm³, the numerical value of specific gravity equals the density in g/cm³, but has no units.',
    qZh: '密度与比重（相对密度）有什么区别？',
    aZh: '密度是有物理量纲与单位的物理量（质量/体积，如 kg/m³ 或 g/cm³）。比重（相对密度）是一个无量纲的纯比例数值，指物质的密度与标准参考物质（通常为 4℃ 的水）密度的比值。在以 g/cm³ 为单位时，两者的数值完全相等，但比重没有单位。',
  },
];

export const SEOFAQ: React.FC<SEOFAQProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>
              {lang === 'en'
                ? 'Frequently Asked Questions (FAQ) on Density'
                : '关于密度 (ρ = m/V) 核心物理问题解答'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'en'
              ? 'Key physics concepts, formula derivations, and international unit conversions.'
              : 'Google 核心检索高频物理概念、公式推导与国际单位换算详解。'}
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const question = lang === 'en' ? item.qEn : item.qZh;
          const answer = lang === 'en' ? item.aEn : item.aZh;

          return (
            <div key={idx} className="py-4">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {question}
                </span>
                <span className="text-slate-400 group-hover:text-blue-600 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="mt-2 text-xs text-slate-600 leading-relaxed font-sans pr-6">
                  {answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
