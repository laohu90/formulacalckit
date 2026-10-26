import React from 'react';
import { ShieldCheck, Lock, ArrowLeft, EyeOff, Server, HardDrive } from 'lucide-react';

interface PrivacyPageProps {
  lang: 'en' | 'zh';
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ lang, onNavigate }) => {
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
        <span className="text-slate-800 font-semibold">{isEn ? 'Privacy Policy' : '隐私权保护政策'}</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isEn ? 'Zero Data Collection & 100% Client Computing' : '零数据收集 · 纯客户端本地计算'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'FormulaCalcKit Privacy Policy' : 'FormulaCalcKit 隐私保护与数据安全规范'}
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          {isEn ? 'Effective Date: October 2026 · Complies with GDPR, CCPA & COPPA' : '生效日期：2026年10月 · 符合 GDPR、CCPA 与 COPPA 全球隐私标准'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>{isEn ? '1. Fundamental Privacy Philosophy' : '1. 核心隐私理念：零追踪与纯本地计算'}</span>
          </h2>
          <p>
            {isEn
              ? 'FormulaCalcKit (formulacalckit.com) was built from the ground up on the principle of privacy by design. All mathematical equations, variable inputs, algebraic reductions, and physical calculations are processed entirely within your device’s web browser (client-side execution).'
              : 'FormulaCalcKit (formulacalckit.com) 从架构底层设计之初即践行「设计即隐私」理念。所有数学公式、输入的变量参数、方程化简推导与物理计算均 100% 在您的终端设备浏览器本地内存中完成。'}
          </p>
          <p>
            {isEn
              ? 'We never transmit your mathematical input values to remote servers, databases, or AI training pipelines.'
              : '我们绝不将您的计算输入、方程系数或科学参数上传至任何远程服务器、数据中心或 AI 训练管线。'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-indigo-600" />
            <span>{isEn ? '2. Local Storage Usage' : '2. 浏览器本地存储 (LocalStorage) 的受限使用'}</span>
          </h2>
          <p>
            {isEn
              ? 'Our application uses HTML5 LocalStorage strictly for local user interface state retention:'
              : '本站仅将 HTML5 LocalStorage 用于保存最基础的界面偏好体验：'}
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
            <li>
              <strong>Language Preference</strong>:{' '}
              {isEn ? 'Remembers if you selected English or Chinese.' : '保存您选择的界面显示语言（中文或英文）。'}
            </li>
            <li>
              <strong>Worker Tools Cache</strong>:{' '}
              {isEn ? 'Caches tool metadata to accelerate initial load time on weak networks.' : '在弱网环境下临时缓存公开工具目录结构以提升二次加载秒开速度。'}
            </li>
          </ul>
          <p>
            {isEn
              ? 'LocalStorage data remains exclusively on your own browser and can be cleared at any time in browser settings.'
              : '本地存储的数据完全保留在您自己的设备中，您可以随时通过浏览器设置一键清除。'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? '3. Third-Party Trackers & Advertising' : '3. 绝无侵入式第三方画像追踪'}</span>
          </h2>
          <p>
            {isEn
              ? 'FormulaCalcKit does not sell, rent, or trade user data. We do not use cross-site tracking pixels or invasive fingerprinting scripts. Web assets (such as Google Fonts or SVG icons) are loaded via standard CDNs without capturing identifiable personal telemetry.'
              : 'FormulaCalcKit 绝不出售、出租或共享任何用户数据。本站绝不嵌入任何跨站指纹追踪或侵犯个人隐私的画像探针。网页所需的基础字体与矢量图标均通过全球标准 CDN 极速托管。'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-amber-600" />
            <span>{isEn ? '4. Contact Information & Data Inquiries' : '4. 隐私问题联系通道'}</span>
          </h2>
          <p>
            {isEn
              ? 'If you have questions or inquiries regarding our privacy standards or data protection practices, please contact our Working Group at privacy@formulacalckit.com.'
              : '如您对本站的隐私保护规范或数据处理有任何疑问，请随时联系工作组：privacy@formulacalckit.com。'}
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
