import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Compass, Ruler, Monitor, Building2 } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface Props {
  lang: Language;
}

export const SeoContent: React.FC<Props> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const t = translations[lang].seoContent;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-10">
      {/* Article Section: Comprehensive Math Knowledge for Google Indexing */}
      <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8 text-slate-700 leading-relaxed">
        <div>
          <span className="text-blue-600 font-bold text-xs uppercase tracking-wider block mb-1">
            {t.articleTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.articleTitle}
          </h2>
        </div>

        <div className="prose prose-slate max-w-none text-sm sm:text-base space-y-4">
          <p>{t.articleIntro}</p>

          {/* Formula Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
              <span className="text-xs font-bold text-blue-700 block mb-1">{t.formulaCard1Title}</span>
              <div className="text-xl font-mono font-bold text-blue-900">a² + b² = c²</div>
              <p className="text-xs text-slate-600 mt-2">{t.formulaCard1Desc}</p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-700 block mb-1">{t.formulaCard2Title}</span>
              <div className="text-xl font-mono font-bold text-indigo-900">c = √(a² + b²)</div>
              <p className="text-xs text-slate-600 mt-2">{t.formulaCard2Desc}</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 block mb-1">{t.formulaCard3Title}</span>
              <div className="text-xl font-mono font-bold text-emerald-900">a = √(c² - b²)</div>
              <p className="text-xs text-slate-600 mt-2">{t.formulaCard3Desc}</p>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">
            {t.proofTitle}
          </h3>
          <p>{t.proofDesc}</p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1 my-3">
            <div>c² = 4 × (½ × a × b) + (b - a)²</div>
            <div>c² = 2ab + (b² - 2ab + a²)</div>
            <div className="font-bold text-blue-700">c² = a² + b² (Q.E.D.)</div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">
            {t.appTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{t.app1Title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{t.app1Desc}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
              <Monitor className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{t.app2Title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{t.app2Desc}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
              <Ruler className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{t.app3Title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{t.app3Desc}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
              <Compass className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{t.app4Title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{t.app4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ Section with Rich Schema.org Snippet Intent */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-blue-600 font-bold text-xs uppercase tracking-wider block mb-1">
            {t.faqTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {t.faqDesc}
          </p>
        </div>

        <div className="space-y-3">
          {t.faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left bg-white hover:bg-slate-50/80 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 font-bold">
                      Q
                    </span>
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 bg-white text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
