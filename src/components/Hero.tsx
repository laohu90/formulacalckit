import React from 'react';

interface HeroProps {
  lang: 'en' | 'zh';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section className="pt-4 pb-2 text-center max-w-3xl mx-auto space-y-3">
      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {lang === 'en' ? (
          <>
            Precision Formula Solvers & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Scientific Tools
            </span>
          </>
        ) : (
          <>
            简洁实用的科学公式工具箱 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              精准在线计算与推导
            </span>
          </>
        )}
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
        {lang === 'en'
          ? 'Comprehensive mathematics, geometry, algebra, and physics calculators. Get instant calculations, radical simplifications, and step-by-step solutions.'
          : '为学术研究、工程计算与日常学习打造的公式工具箱，涵盖几何、代数、排版与物理，提供即时计算与步骤推导。'}
      </p>
    </section>
  );
};
