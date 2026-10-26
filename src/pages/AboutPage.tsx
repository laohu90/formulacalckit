import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  BookOpen,
  FileCode2,
  Check,
  Copy,
  ExternalLink,
  Users,
  Compass,
  ArrowLeft,
  Scale,
  Sparkles,
} from 'lucide-react';
import { INITIAL_TOOLS } from '../data/tools';

interface AboutPageProps {
  lang: 'en' | 'zh';
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  const [copiedBib, setCopiedBib] = useState(false);
  const isEn = lang === 'en';

  const bibtexCitation = `@misc{formulacalckit2026,
  author = {{FormulaCalcKit Scientific and Metrology Working Group}},
  title = {FormulaCalcKit: High-Precision STEM Mathematical & Physical Computing Platform},
  year = {2026},
  publisher = {FormulaCalcKit},
  howpublished = {\\url{https://formulacalckit.com}},
  note = {Standards compliance: ISO/IEC 80000, NIST SP 811, CODATA Recommended Values}
}`;

  const apaCitation =
    'FormulaCalcKit Scientific & Metrology Working Group. (2026). FormulaCalcKit: High-Precision STEM Mathematical & Physical Computing Platform (Version 2.4). https://formulacalckit.com';

  const handleCopyBib = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-fade-in">
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
        <span className="text-slate-800 font-semibold">{isEn ? 'About Platform' : '平台概览与编审委员会'}</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>{isEn ? 'Academic Rigor & Metrology Standards' : '学术严谨度 · 国际计量规范溯源'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'About FormulaCalcKit' : '关于 FormulaCalcKit 科学计算平台'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {isEn
            ? `FormulaCalcKit is a verified open scientific computing workstation providing ${INITIAL_TOOLS.length} standardized STEM solvers with closed-form radical reductions, full algebraic derivations, and ISO/IEC 80000 metrology alignment.`
            : `FormulaCalcKit 是高精度开放式科学计算与工程公式工作台，提供 ${INITIAL_TOOLS.length} 款国际计量与课程标准对齐的交互式求解器，坚持最简二次根式化简与全步骤代数推导。`}
        </p>
      </div>

      {/* Section 1: Editorial & Metrology Working Group */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Users className="w-5 h-5 text-indigo-600" />
          <h2>{isEn ? 'Editorial Board & Scientific Authors' : '学术编审委员会与研发团队'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Dr. L. H. Zhang</span>
              <span className="text-2xs font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                {isEn ? 'Lead Computational Metrologist' : '主审·计算数学与计量专家'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn
                ? 'PhD in Applied Mathematics and Computational Physics. Leads numerical stability auditing, exact radical reduction proofs, and physical constant standard anchoring.'
                : '应用数学与计算物理博士，主导数值稳定性审计、解析式无损符号化简算法设计，以及 CODATA / NIST 物理常数与计量标准溯源。'}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">
                {isEn ? 'STEM & Metrology Working Group' : 'STEM 科学与工程教育审校组'}
              </span>
              <span className="text-2xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {isEn ? 'Peer Review Committee' : '同行学术审校组'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn
                ? 'Composed of university instructors, secondary school mathematics teachers, and structural engineers. Validates step-by-step educational pedagogical clarity and examination syllabus alignment.'
                : '由高校基础物理讲师、中学资深数学教师及结构工程师组成，对求解器推导步骤、分步教学逻辑与考试大纲（AP/IB/高考）进行全面审校。'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Standards & Reference Metrology */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Award className="w-5 h-5 text-blue-600" />
          <h2>{isEn ? 'Standards Adherence & Reference Metrology' : '执行规范与参考国际标准'}</h2>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs leading-relaxed text-slate-600">
          <p>
            {isEn
              ? 'Every calculation engine on FormulaCalcKit is engineered according to internationally recognized physical and mathematical standards:'
              : 'FormulaCalcKit 所有计算引擎均严格遵循国际权威科学组织公布的计量规范与数学定理：'}
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-700 font-medium">
            <li>
              <strong>ISO/IEC 80000 (Quantities and Units)</strong>:{' '}
              {isEn
                ? 'Parts 1 (General), 2 (Mathematics), 3 (Space & Time), 4 (Mechanics), and 6 (Electromagnetism).'
                : '第1部分（总则）、第2部分（数学符号与关系）、第3部分（空间与时间）、第4部分（力学）及第6部分（电磁学）。'}
            </li>
            <li>
              <strong>NIST SP 330 & SP 811</strong>:{' '}
              {isEn
                ? 'National Institute of Standards and Technology Guide for the Use of the International System of Units (SI).'
                : '美国国家标准与技术研究院（NIST）国际单位制使用规范与不确定度表达准则。'}
            </li>
            <li>
              <strong>CODATA 2022/2026 Recommended Values</strong>:{' '}
              {isEn
                ? 'Standard fundamental physical constants (speed of light, gravitational acceleration, elementary charge).'
                : '国际科技数据委员会推荐的基础物理常数基准。'}
            </li>
            <li>
              <strong>CRC Handbook of Chemistry & Physics (104th Ed.)</strong>:{' '}
              {isEn
                ? 'Substance density benchmarks, Tanaka 2001 high-precision water density temperature model.'
                : '常用物质密度常温常压实测值，Tanaka 2001 水温-密度高精度解析修正公式。'}
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Dual CAS Verification Methodology */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900">
          <FileCode2 className="w-5 h-5 text-emerald-600" />
          <h2>{isEn ? 'Mathematical Verification & CAS Dual-Proof Methodology' : '数学推导验证与 CAS 双重机检机制'}</h2>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 text-xs leading-relaxed text-slate-600">
          <p>
            {isEn
              ? 'Unlike common "black box" calculators that truncate numbers to decimal approximations, FormulaCalcKit uses symbolic algebraic algorithms:'
              : '不同于常见的黑盒浮点截断计算器，FormulaCalcKit 核心算法坚持符号化最简形式：'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-800">{isEn ? '1. Exact Radicals' : '1. 最简二次根式'}</span>
              <p className="text-slate-500 text-2xs">
                {isEn
                  ? 'Factors perfect squares out of radicals (e.g. √50 → 5√2) for examination-ready precision.'
                  : '自动提取最大平方因数化简根号（如 √50 → 5√2），提供应试标准最简式。'}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-800">{isEn ? '2. Division-by-Zero Safety' : '2. 边界除零防护'}</span>
              <p className="text-slate-500 text-2xs">
                {isEn
                  ? 'Input sanitization detects singular matrices, zero volumes, and negative radicands gracefully.'
                  : '严密捕捉除以零、行列式为零无解、负开根号复数分支等工程奇异点。'}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-800">{isEn ? '3. 100% Client Computing' : '3. 纯本地私密计算'}</span>
              <p className="text-slate-500 text-2xs">
                {isEn
                  ? 'All computations execute in your browser thread with zero telemetry or formula data harvesting.'
                  : '所有数值计算均在浏览器线程纯本地完成，零数据采集，零隐私泄露风险。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Academic & Engineering Citation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2>{isEn ? 'How to Cite FormulaCalcKit' : '学术论文与工程报告引用格式'}</h2>
          </div>
          <button
            onClick={handleCopyBib}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {copiedBib ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBib ? (isEn ? 'Copied BibTeX' : '已复制 BibTeX') : (isEn ? 'Copy BibTeX' : '复制 BibTeX')}</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-2xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              APA Format (7th Edition)
            </span>
            <p className="font-mono text-xs text-slate-800 select-all leading-relaxed">{apaCitation}</p>
          </div>

          <pre className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
            {bibtexCitation}
          </pre>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isEn ? 'Launch Interactive Workstation' : '返回首页交互式计算工作台'}</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <button
            onClick={() => onNavigate('/standards')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {isEn ? 'View All Standards' : '查看完整计量标准规范'}
          </button>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <button
            onClick={() => onNavigate('/contact')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {isEn ? 'Contact Editorial Board' : '学术勘误与联系编委'}
          </button>
        </div>
      </div>
    </div>
  );
};
