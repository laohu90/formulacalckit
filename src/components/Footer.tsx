import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, X, FileText, Lock } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'zh';
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onScrollToSection }) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm">
                ∑
              </div>
              <span className="font-bold text-slate-900 text-base">FormulaCalcKit</span>
              <span className="text-[10px] text-slate-500 font-mono">
                formulacalckit.com
              </span>
            </div>
            <p className="text-slate-500 max-w-md leading-relaxed">
              {lang === 'en'
                ? 'FormulaCalcKit is a precision scientific calculation studio providing instant, exact radical solutions and step-by-step mathematical derivations.'
                : 'FormulaCalcKit（科学公式计算工具箱）致力于提供清晰、纯粹、高精度的在线科学计算、二次根式化简与分步数学推导服务。'}
            </p>
            <div className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium text-[11px]">
                {lang === 'en'
                  ? 'Pure Client-Side Computing · Privacy Protected'
                  : '纯前端本地计算 · 零隐私追踪'}
              </span>
            </div>
          </div>

          {/* Quick Solvers Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900">
              {lang === 'en' ? 'Core Solvers' : '核心求解器'}
            </h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>
                <button
                  onClick={() => onScrollToSection('workstation')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {lang === 'en' ? 'Pythagorean Hypotenuse' : '勾股定理直角三角形'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('workstation')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {lang === 'en' ? 'Quadratic & Vertex Form' : '二次方程与顶点配方'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('workstation')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {lang === 'en' ? 'Euclidean GCD & LCM' : '辗转相除法与质因数'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('workstation')}
                  className="hover:text-blue-600 cursor-pointer text-left transition-colors"
                >
                  {lang === 'en' ? 'Physics Kinematics & Density' : '物理运动与密度参量'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Information */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900">
              {lang === 'en' ? 'Legal & Info' : '平台与政策'}
            </h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>
                <button
                  onClick={() => onScrollToSection('directory')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'en' ? 'All Calculators Directory' : '全部计算器工具目录'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('cheat-sheet')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'en' ? 'Formula Reference Sheet' : '常用公式速查参考'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'en' ? 'Privacy Policy' : '隐私政策 (Privacy Policy)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowTerms(true)}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {lang === 'en' ? 'Terms of Service' : '使用条款 (Terms of Service)'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} FormulaCalcKit (formulacalckit.com).
          </div>
          <div className="flex items-center gap-4">
            <span>
              {lang === 'en'
                ? 'High-Precision Scientific Engine · Zero Tracking'
                : '高精度科学计算引擎 · 零隐私追踪'}
            </span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'en' ? 'Privacy Policy' : '隐私权政策'}
                </h3>
              </div>
              <button
                onClick={() => setShowPrivacy(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                {lang === 'en'
                  ? 'Welcome to FormulaCalcKit (formulacalckit.com). We respect your privacy.'
                  : '欢迎使用 FormulaCalcKit (formulacalckit.com)。我们极其尊重并保护您的个人隐私。'}
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">
                {lang === 'en' ? '1. Client-Side Operations' : '1. 纯本地计算'}
              </h4>
              <p>
                {lang === 'en'
                  ? 'All formula calculations, equation solving, and radical operations are computed 100% locally within your web browser. No mathematical inputs or calculations are stored on our servers.'
                  : '所有的公式运算、方程求解及二次根号化简均 100% 在您的浏览器本地完成，我们不会在服务器记录或存储您的任何计算内容。'}
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">
                {lang === 'en' ? '2. Local Storage' : '2. 本地存储 (Local Storage)'}
              </h4>
              <p>
                {lang === 'en'
                  ? 'We use browser LocalStorage solely to remember your preferred language (English or Chinese). We do not use intrusive tracking cookies.'
                  : '本站仅使用浏览器 LocalStorage 记录您的语言偏好（中文或英文）。本站绝不使用任何侵犯隐私的追踪 Cookie。'}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Understood' : '我已知晓'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setShowTerms(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'en' ? 'Terms of Service' : '服务条款'}
                </h3>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                {lang === 'en'
                  ? 'FormulaCalcKit provides mathematical tools and equations solvers free of charge for students, teachers, and professionals.'
                  : 'FormulaCalcKit 为广大师生、科研人员与工程师免费提供数学与科学公式计算及公式速查服务。'}
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">
                {lang === 'en' ? '1. Accuracy and Disclaimer' : '1. 计算精度与免责声明'}
              </h4>
              <p>
                {lang === 'en'
                  ? 'While our calculators utilize high-precision algorithms, users are encouraged to verify critical engineering or structural calculations independently.'
                  : '虽然本站所有计算模型均经过多轮严格数学算法验证，但在涉及关键工程构件设计、高额财务决策等重要场合，建议结合人工专业复核。'}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Accept & Close' : '同意并关闭'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
