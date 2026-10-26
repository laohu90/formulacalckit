import React from 'react';
import { FileText, ArrowLeft, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

interface TermsPageProps {
  lang: 'en' | 'zh';
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ lang, onNavigate }) => {
  const isEn = lang === 'en';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in text-slate-800">
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
        <span className="text-slate-800 font-semibold">{isEn ? 'Terms of Service' : '使用条款与工程免责'}</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>{isEn ? 'Terms of Service & Engineering Standards' : '服务条款 · 工程计算准则与使用边界'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Terms of Service & Disclaimer' : 'FormulaCalcKit 服务条款与免责声明'}
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          {isEn ? 'Last Updated: October 2026 · Standard STEM Academic Terms' : '更新日期：2026年10月 · 标准科学学术与教育使用许可'}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? '1. Educational & Academic Permitted Use' : '1. 教育与学术研究允许用途'}</span>
          </h2>
          <p>
            {isEn
              ? 'FormulaCalcKit provides interactive formula solvers, mathematical step-by-step proofs, and physical constant calculations free of charge for students, researchers, teachers, and engineering practitioners. You are permitted to use calculation outputs, derivations, and formulas for classroom homework, examinations revision, theses, and non-commercial scientific projects.'
              : 'FormulaCalcKit 免费为全球师生、科研工作者及工程师提供在线科学计算与公式推导服务。允许将本站输出的推导步骤、图表及最简根式用于日常作业验证、学术考试复习、论文撰写以及非商业科学研究。'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{isEn ? '2. Engineering Accuracy & Critical Systems Disclaimer' : '2. 计算精度与工程设计免责声明'}</span>
          </h2>
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-amber-950 text-xs">
            <p className="font-semibold">
              {isEn
                ? 'Important Notice for Mission-Critical Engineering Applications:'
                : '特别注意：涉及重大工程设计与生命财产安全的边界说明：'}
            </p>
            <p>
              {isEn
                ? 'While FormulaCalcKit models are mathematically verified against symbolic CAS systems and ISO standards, these calculators are provided "AS IS" without warranty of any kind. They must NOT be used as the sole basis for safety-critical structural engineering, aerospace stress analysis, medical dosage, or life-support apparatus calculations without certified independent review by licensed professional engineers.'
                : '尽管 FormulaCalcKit 的每一个算法均经过严格的数学符号验证并对齐 ISO 标准，但本站工具按「现状」免费提供。严禁在未经注册专业工程师（PE）严格人工审签的前提下，将本站计算结果直接作为桥梁建筑受力、航空航天构件设计、医疗剂量配比或特种承压装备的最终工程依据。'}
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>{isEn ? '3. Open Source & Intellectual Property' : '3. 开源授权与知识产权说明'}</span>
          </h2>
          <p>
            {isEn
              ? 'The underlying codebase of FormulaCalcKit is open source under the MIT License. Universal mathematical theorems, physical equations, and ISO 80000 definitions belong to the scientific public domain.'
              : 'FormulaCalcKit 开源项目遵循宽松的 MIT 许可证。所有公开的自然科学定律、经典物理公式及 ISO 80000 科学定义均属于全人类公有领域（Public Domain）科学财富。'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>{isEn ? '4. Modifications & Availability' : '4. 服务的持续维护与变更'}</span>
          </h2>
          <p>
            {isEn
              ? 'We continuously improve algorithm performance and fix errata. We reserve the right to refine formulas and enhance calculation algorithms to align with updated CODATA recommendations and educational syllabi.'
              : '我们将持续优化数值计算性能并吸纳学术勘误。工作组保留根据国际科学组织最新物理常数推荐（如 CODATA 周期性修订）更新公式模型与推导步骤的权利。'}
          </p>
        </section>
      </div>

      {/* Back Button */}
      <div className="pt-6 border-t border-slate-200">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEn ? 'Return to FormulaCalcKit Home' : '返回 FormulaCalcKit 首页'}</span>
        </button>
      </div>
    </div>
  );
};
