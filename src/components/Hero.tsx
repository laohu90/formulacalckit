import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  lang: 'en' | 'zh';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section className="text-center max-w-3xl mx-auto space-y-3">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-blue-700 text-xs font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        <span>
          {lang === 'en'
            ? 'High-Precision Formula Solvers & Scientific Suite'
            : '高精度公式求解器 · 科学计算工具箱'}
        </span>
      </div>

      {/* Main Title - Balanced typography without dangling conjunctions */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {lang === 'en' ? (
          <>
            Precision Formula Solvers <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
              & Scientific Tools Hub
            </span>
          </>
        ) : (
          <>
            精密公式求解器 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
              科学计算与推导工具箱
            </span>
          </>
        )}
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
        {lang === 'en'
          ? 'Comprehensive mathematics, geometry, algebra, and physics calculators. Instant calculations, radical simplifications, and step-by-step solutions.'
          : '全面覆盖几何图形、代数方程、物理定律与公式排版。提供即时计算、最简二次根式化简与分步推导解答。'}
      </p>
    </section>
  );
};
