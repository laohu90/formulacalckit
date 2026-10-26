import React, { useState } from 'react';
import {
  Scale,
  ArrowLeft,
  BookCheck,
  Check,
  Copy,
  ExternalLink,
  Award,
  Layers,
  FileCode2,
} from 'lucide-react';
import { INITIAL_TOOLS } from '../data/tools';

interface StandardsPageProps {
  lang: 'en' | 'zh';
  onNavigate: (path: string) => void;
}

export const StandardsPage: React.FC<StandardsPageProps> = ({ lang, onNavigate }) => {
  const isEn = lang === 'en';
  const [copiedBib, setCopiedBib] = useState(false);

  const bibtexCitation = `@misc{formulacalckit2026,
  author = {{FormulaCalcKit Scientific and Metrology Working Group}},
  title = {FormulaCalcKit: High-Precision STEM Mathematical & Physical Computing Platform},
  year = {2026},
  publisher = {FormulaCalcKit},
  howpublished = {\\url{https://formulacalckit.com}},
  note = {Standards compliance: ISO/IEC 80000, NIST SP 811, CODATA Recommended Values}
}`;

  const handleCopyBib = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-fade-in text-slate-800">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-blue-600 transition-colors cursor-pointer inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isEn ? 'Home / Studio' : '首页 / 工作台'}</span>
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-slate-800 font-semibold">{isEn ? 'Metrology Standards & Citations' : '计量规范与标准溯源'}</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <BookCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>{isEn ? 'Metrology Standardization Matrix' : '国际标准对齐与学术引用指引'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Scientific Standards & Metrological Basis' : '国际计量标准、物理常数与算法溯源'}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {isEn
            ? 'FormulaCalcKit explicitly adheres to ISO/IEC 80000, NIST Special Publications, and CODATA fundamental physical constant benchmarks to provide rigorous mathematical and engineering certainty.'
            : 'FormulaCalcKit 严格遵循 ISO/IEC 80000 国际标准、美国 NIST 计量指南及国际科技数据委员会（CODATA）基础物理常数，确保每一次求解都有据可查、有典可循。'}
        </p>
      </div>

      {/* Standards Cross-Reference Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2>{isEn ? 'Calculator-to-Standard Cross-Reference Table' : '求解器与国际标准规范对照总表'}</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {INITIAL_TOOLS.length} {isEn ? 'Verified Solvers' : '项已核验求解器'}
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">{isEn ? 'Calculator' : '计算工具'}</th>
                <th className="px-4 py-3">{isEn ? 'Formula / Model' : '核心公式与数学模型'}</th>
                <th className="px-4 py-3">{isEn ? 'Governing Standard / Reference' : '国际/权威执行标准'}</th>
                <th className="px-4 py-3">{isEn ? 'Domain' : '学术领域'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {INITIAL_TOOLS.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                    {isEn ? t.nameEn : t.nameZh}
                  </td>
                  <td className="px-4 py-3 font-mono text-blue-700 whitespace-nowrap">
                    {t.formula}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600">
                    {t.standardReference || 'ISO 80000-2:2019'}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-500">
                    {t.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Academic Citation Block */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Award className="w-5 h-5 text-amber-600" />
            <h2>{isEn ? 'Citation in Academic Theses & Reports' : '学术论文与工程报告引用'}</h2>
          </div>
          <button
            onClick={handleCopyBib}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {copiedBib ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBib ? (isEn ? 'Copied BibTeX' : '已复制 BibTeX') : (isEn ? 'Copy BibTeX' : '复制 BibTeX')}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
          {bibtexCitation}
        </pre>
      </section>

      {/* Back Button */}
      <div className="pt-6 border-t border-slate-200">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEn ? 'Return to FormulaCalcKit Home' : '返回 FormulaCalcKit 首页'}</span>
        </button>
      </div>
    </div>
  );
};
