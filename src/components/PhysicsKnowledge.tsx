import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { BookOpen, FlaskConical, AlertTriangle, Lightbulb, Award } from 'lucide-react';

interface PhysicsKnowledgeProps {
  lang: Language;
}

export const PhysicsKnowledge: React.FC<PhysicsKnowledgeProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeSection, setActiveSection] = useState<'concepts' | 'experiments' | 'traps' | 'applications'>('concepts');

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{t.knowledgeTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">{t.knowledgeDesc}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
            {[
              { id: 'concepts', label: lang === 'en' ? '1. Concepts & Nature' : '1. 概念与本质' },
              { id: 'experiments', label: lang === 'en' ? '2. Lab Experiments' : '2. 实验与误差' },
              { id: 'traps', label: lang === 'en' ? '3. Common Traps' : '3. 经典易错辨析' },
              { id: 'applications', label: lang === 'en' ? '4. Real-world Uses' : '4. 生活与工程应用' },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeSection === sec.id
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 1: Concepts & Essence */}
      {activeSection === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{lang === 'en' ? 'Definition & Inherent Property' : '密度的定义与物理属性'}</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100">
                <strong className="text-blue-900 block mb-1">
                  {lang === 'en' ? 'Physical Definition:' : '物理定义:'}
                </strong>
                {lang === 'en'
                  ? 'Density is defined as the mass of a substance divided by its volume: ρ = m / V. It measures how tightly matter is packed together.'
                  : '某种物质组成的物体的质量与它的体积之比叫做这种物质的密度。公式：ρ = m / V。'}
              </div>

              <div>
                <strong className="text-slate-900">
                  {lang === 'en' ? 'Physical Meaning:' : '物理意义:'}
                </strong>
                <p className="mt-0.5">
                  {lang === 'en'
                    ? 'The density of pure water is 1.0 × 10³ kg/m³. This means 1 cubic meter of pure water has a mass of 1,000 kilograms (or 1 cm³ equals 1 gram).'
                    : '例如纯水的密度为 1.0 × 10³ kg/m³，其物理意义是：每 1 立方米纯水的质量为 1000 千克。'}
                </p>
              </div>

              <div>
                <strong className="text-slate-900">
                  {lang === 'en' ? 'Inherent Material Property:' : '固有特性:'}
                </strong>
                <p className="mt-0.5">
                  {lang === 'en'
                    ? 'Density is an intensive characteristic property of matter. For a uniform substance at constant temperature and pressure, density is independent of total mass, size, or shape.'
                    : '密度是物质自身的一种固有特性。对于同种物质、同种状态，在温度压强不变时，密度大小与物体的质量大小、体积大小、形状位置均无关。'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>{lang === 'en' ? 'Environmental Influences' : '密度的外在影响因素'}</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">
                  {lang === 'en' ? '1. Temperature (Thermal Expansion):' : '1. 温度影响:'}
                </strong>
                {lang === 'en'
                  ? 'Most materials expand upon heating. As temperature increases, volume V expands while mass m remains unchanged, causing density ρ to decrease.'
                  : '大多数物质遵循“热胀冷缩”规律。温度升高时，质量 m 不变，体积 V 膨胀变大，密度 ρ 变小。'}
              </div>

              <div className="p-3 bg-cyan-50/60 rounded-lg border border-cyan-100">
                <strong className="text-cyan-900 block mb-1">
                  {lang === 'en' ? '2. Water Anomalous Expansion (4°C Maximum):' : '2. 水的反常膨胀 (4℃ 特性):'}
                </strong>
                {lang === 'en'
                  ? 'Water exhibits anomalous expansion between 0°C and 4°C, reaching its maximum density at 4°C (1.000 g/cm³). When freezing at 0°C, ice expands by ~9%, reducing density to 0.917 g/cm³.'
                  : '水在 0℃ 到 4℃ 之间遵循“热缩冷胀”，在 4℃ 时密度最大 (1.000 g/cm³)。结冰时体积膨胀约 9%，密度降低至 0.917 g/cm³，因而冰浮在水面上。'}
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">
                  {lang === 'en' ? '3. Compressibility of Gases:' : '3. 气体的可压缩性:'}
                </strong>
                {lang === 'en'
                  ? 'Gases are highly compressible. Compressing gas into a cylinder increases pressure and dramatically increases density.'
                  : '固体和液体难被压缩；而气体极易被压缩，压强增大或被压缩时，体积缩小，密度显著增大。'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Laboratory Experiments */}
      {activeSection === 'experiments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-blue-600" />
                <span>{lang === 'en' ? 'Exp 1: Measuring Solid Density' : '实验一: 测量固体的密度'}</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                  <strong className="text-slate-900 block">
                    {lang === 'en' ? 'Standard Protocol:' : '标准测量步骤:'}
                  </strong>
                  <div>1. {lang === 'en' ? 'Measure dry object mass m using a balance.' : '先用天平称出干燥固体的质量 m。'}</div>
                  <div>2. {lang === 'en' ? 'Pour water into graduated cylinder; record V1.' : '量筒注入适量水，记录初刻度 V1。'}</div>
                  <div>3. {lang === 'en' ? 'Submerge object gently with thin string; record V2.' : '用细线将固体完全浸入水中，记录末刻度 V2。'}</div>
                  <div>4. {lang === 'en' ? 'V = V2 - V1, then ρ = m / (V2 - V1).' : '体积 V = V2 - V1，密度 ρ = m / (V2 - V1)。'}</div>
                </div>

                <div className="p-3 bg-rose-50 rounded-lg border border-rose-100 text-rose-900 text-2xs">
                  <strong>⚠️ {lang === 'en' ? 'Critical Error Point:' : '关键误差剖析:'}</strong>
                  {lang === 'en'
                    ? ' If volume is measured first before mass, water sticking to the object makes measured mass too large, causing calculated density to be too high!'
                    : ' 若先测体积再测质量，物体表面沾水将导致称出的质量偏大，算出的密度偏大！'}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'en' ? 'Exp 2: Measuring Liquid Density' : '实验二: 测量液体的密度'}</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                  <strong className="text-slate-900 block">
                    {lang === 'en' ? 'Error-free Difference Method:' : '标准差量倒出法:'}
                  </strong>
                  <div>1. {lang === 'en' ? 'Weigh beaker with liquid: m1.' : '称出烧杯和液体的总质量 m1。'}</div>
                  <div>2. {lang === 'en' ? 'Pour portion into graduated cylinder; record volume V.' : '倒一部分液体入量筒，读出体积 V。'}</div>
                  <div>3. {lang === 'en' ? 'Weigh remaining beaker + liquid: m2.' : '称出剩余烧杯和液体的质量 m2。'}</div>
                  <div>4. {lang === 'en' ? 'ρ = (m1 - m2) / V.' : '倒出质量 m = m1 - m2，密度 ρ = (m1 - m2) / V。'}</div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-900 text-2xs">
                  <strong>⚠️ {lang === 'en' ? 'Why other methods fail:' : '为什么不能全倒进量筒:'}</strong>
                  {lang === 'en'
                    ? ' Residual liquid sticking to beaker walls prevents complete transfer, causing volume V to be underestimated and density to be artificially inflated.'
                    : ' 烧杯壁残留挂壁液体倒不干净，倒入量筒的体积 V 会偏小，算出的密度会偏大！'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Traps */}
      {activeSection === 'traps' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>{lang === 'en' ? 'High-Frequency Physics Exam Traps' : '中考物理常考易错点剖析'}</span>
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 space-y-1">
              <div className="font-bold text-slate-900">
                {lang === 'en'
                  ? 'Q1: If a brick is cut exactly in half, what happens to its mass, volume, and density?'
                  : 'Q1: 一块砖切去一半，剩余部分的质量、体积与密度如何变化？'}
              </div>
              <p className="text-slate-600">
                {lang === 'en'
                  ? 'Answer: Mass is halved, volume is halved, but density remains strictly CONSTANT because the material composition has not changed.'
                  : '解析: 质量 m 减半，体积 V 减半。因为材料和物态没有改变，所以密度 ρ 保持不变！'}
              </p>
            </div>

            <div className="py-3 space-y-1">
              <div className="font-bold text-slate-900">
                {lang === 'en'
                  ? 'Q2: A rigid medical oxygen tank has half its oxygen used. How does density change?'
                  : 'Q2: 医用氧气钢瓶用去了一半氧气，瓶内剩余氧气的密度如何变化？'}
              </div>
              <p className="text-slate-600">
                {lang === 'en'
                  ? 'Answer: Oxygen is a gas and fills the entire rigid volume of the tank (V remains constant). With half the mass gone, density is halved (ρ_new = ρ / 2).'
                  : '解析: 气体会自动充满整个刚性容器，所以体积 V 保持不变！质量减半，因此氧气密度变为原来的一半！'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Real-world Applications */}
      {activeSection === 'applications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>{lang === 'en' ? 'Daily Life & Agriculture' : '农业与生活中的密度应用'}</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">
                  {lang === 'en' ? 'Saltwater Seed Selection:' : '盐水选种:'}
                </strong>
                {lang === 'en'
                  ? 'Healthy, plump seeds have a higher density than the saltwater solution and sink to the bottom; hollow or insect-damaged seeds float.'
                  : '饱满优质种子因密度大于盐水而沉底；干瘪虫蛀种子因密度小于盐水而漂浮。'}
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">
                  {lang === 'en' ? 'Heater & AC Placement:' : '冷暖空调安装位置:'}
                </strong>
                {lang === 'en'
                  ? 'Radiators are placed near the floor because warm air is less dense and rises; AC units blow near the ceiling because cold air is denser and sinks.'
                  : '暖气安装在房间下方（热空气密度小上升）；空调制冷出风口朝上装在高处（冷空气密度大自然下沉）。'}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'en' ? 'Aerospace & Modern Engineering' : '航空航天与现代工程'}</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">
                  {lang === 'en' ? 'Lightweight Aerospace Alloys:' : '航空轻量化材料:'}
                </strong>
                {lang === 'en'
                  ? 'Modern aircraft use low-density, high-strength titanium (4.51 g/cm³) and carbon fiber composites (1.6 g/cm³) to minimize weight.'
                  : '飞机广泛使用高强度、低密度的钛合金 (4.51 g/cm³) 与碳纤维复合材料 (1.6 g/cm³) 以减少燃油消耗。'}
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 block mb-0.5">
                  {lang === 'en' ? 'Silica Aerogel ("Frozen Smoke"):' : '气凝胶 (超轻固态材料):'}
                </strong>
                {lang === 'en'
                  ? 'With a density of only 0.003 g/cm³, aerogel is the lightest solid known, providing extreme thermal insulation for Mars rovers and spacesuits.'
                  : '密度仅为 0.003 g/cm³，是已知最轻的固体材料，用于火星探测车与宇航服极温绝热。'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
