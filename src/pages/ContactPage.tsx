import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2, MessageSquare, Github, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  lang: 'en' | 'zh';
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang, onNavigate }) => {
  const isEn = lang === 'en';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'errata',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in text-slate-800">
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
        <span className="text-slate-800 font-semibold">{isEn ? 'Contact & Errata' : '学术勘误与联系编委'}</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-blue-600" />
          <span>{isEn ? 'Editorial Inquiry & Feedback' : '学术咨询 · 算法勘误 · 意见反馈'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Contact FormulaCalcKit Working Group' : '联系 FormulaCalcKit 学术与编审团队'}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {isEn
            ? 'We welcome mathematical errata submissions, edge case reports, curriculum partnership proposals, and algorithm peer reviews from educators and students.'
            : '热烈欢迎海内外高校师生、中学教育工作者及工程技术人员提出算法勘误、公式边界用例、课标对接建议或学术合作。'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>{isEn ? 'Editorial Mailbox' : '官方学术联络信箱'}</span>
            </div>
            <p className="text-xs text-slate-600 font-mono select-all">
              editorial@formulacalckit.com
            </p>
            <div className="text-[11px] text-slate-500">
              {isEn ? 'Typical turnaround: < 24-48 business hours' : '工作日平均回复时效：24～48 小时'}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Github className="w-4 h-4 text-slate-800" />
              <span>{isEn ? 'GitHub Repository' : '开源代码仓库与工单'}</span>
            </div>
            <p className="text-xs text-slate-600">
              {isEn
                ? 'Submit algorithmic bug reports or open a Pull Request directly on GitHub.'
                : '欢迎直接在 GitHub 提交 Issue 报告数学漏洞或提交 PR 贡献新公式。'}
            </p>
            <a
              href="https://github.com/laohu90/formulacalckit"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>github.com/laohu90/formulacalckit</span>
            </a>
          </div>
        </div>

        {/* Feedback / Errata Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-8 rounded-2xl border border-emerald-200 bg-emerald-50 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-base">
                {isEn ? 'Report Submitted Successfully' : '反馈已成功提交！'}
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                {isEn
                  ? 'Thank you for helping uphold our scientific precision. The Metrology Working Group will audit your submission against CAS engines within 24-48 hours.'
                  : '衷心感谢您对科学严谨度的贡献！学术与计量工作组将在 24～48 小时内核对 CAS 推导结果并回复处理。'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                {isEn ? 'Send Another Message' : '提交另一条反馈'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-2xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-2xs font-semibold text-slate-700 mb-1">
                    {isEn ? 'Your Name / Institution' : '姓名 / 单位或学校'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEn ? 'e.g. Prof. Smith' : '如：李老师 / 某某大学'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-2xs font-semibold text-slate-700 mb-1">
                    {isEn ? 'Your Email' : '电子邮箱'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-2xs font-semibold text-slate-700 mb-1">
                  {isEn ? 'Category' : '反馈类型'}
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="errata">{isEn ? 'Formula / Calculation Errata' : '公式推导或计算结果勘误'}</option>
                  <option value="feature">{isEn ? 'New Solver or Feature Proposal' : '申请新增计算器或功能'}</option>
                  <option value="education">{isEn ? 'Educational / Examination Partnership' : '教学大纲或教材配套咨询'}</option>
                  <option value="other">{isEn ? 'General Inquiry' : '其他综合咨询'}</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-semibold text-slate-700 mb-1">
                  {isEn ? 'Message / Details' : '详细内容描述'}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    isEn
                      ? 'Please describe the formula, input values, expected result, and relevant textbook/standard reference...'
                      : '请尽可能附上具体公式名称、输入测试值、预期正确推导结果及相关学术参考出处...'
                  }
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isEn ? 'Submit Message to Working Group' : '提交信息至编审工作组'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
