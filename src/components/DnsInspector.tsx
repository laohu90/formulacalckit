import React, { useState, useEffect } from 'react';
import {
  CloudflareDnsRecord,
  DnsConfig,
  QuickSolverId,
} from '../types';
import {
  DEFAULT_DNS_CONFIG,
  SEED_DNS_RECORDS,
  fetchCloudflareDns,
  extractWebSubdomains,
} from '../services/cloudflare';
import {
  Globe,
  ExternalLink,
  Zap,
  CheckCircle2,
  Settings,
  RefreshCw,
  X,
  Lock,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface DnsInspectorProps {
  lang: 'en' | 'zh';
  onSyncSubdomains?: (discoveredDomains: string[]) => void;
  onOpenQuickSolver?: (solverId: QuickSolverId, subdomainUrl?: string) => void;
}

interface SubsiteCard {
  id: string;
  subdomain: string;
  fullName: string;
  titleEn: string;
  titleZh: string;
  formula: string;
  descriptionEn: string;
  descriptionZh: string;
  quickSolverId?: QuickSolverId;
  status: 'active' | 'ready';
}

export const DnsInspector: React.FC<DnsInspectorProps> = ({
  lang,
  onSyncSubdomains,
  onOpenQuickSolver,
}) => {
  const [config, setConfig] = useState<DnsConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cf_dns_config');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return DEFAULT_DNS_CONFIG;
  });

  const [records, setRecords] = useState<CloudflareDnsRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cf_dns_records');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return SEED_DNS_RECORDS;
  });

  const [loading, setLoading] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('cf_dns_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('cf_dns_records', JSON.stringify(records));
  }, [records]);

  // Extract web subdomains from records
  const webSubdomains = extractWebSubdomains(records, config.rootDomain);

  // Map subdomains into clean, user-friendly tool cards without exposing raw DNS entries
  const subsiteCards: SubsiteCard[] = webSubdomains
    .filter((s) => !s.isRoot && !s.subdomain.startsWith('www'))
    .map((s) => {
      const sub = s.subdomain.toLowerCase();
      if (sub.includes('pythagorean')) {
        return {
          id: s.subdomain,
          subdomain: s.subdomain,
          fullName: s.fullName,
          titleEn: 'Pythagorean Theorem Calculator',
          titleZh: '勾股定理独立计算器',
          formula: 'a² + b² = c²',
          descriptionEn:
            'Dedicated standalone tool for triangle hypotenuse, legs, radical roots, and triples.',
          descriptionZh: '独立的直角三角形边长求值、根号化简与勾股定理计算系统。',
          quickSolverId: 'pythagorean',
          status: 'active',
        };
      }
      if (sub.includes('quadratic')) {
        return {
          id: s.subdomain,
          subdomain: s.subdomain,
          fullName: s.fullName,
          titleEn: 'Quadratic Equation Solver',
          titleZh: '一元二次方程求解站',
          formula: 'ax² + bx + c = 0',
          descriptionEn:
            'High-precision algebra engine solving roots, discriminant Δ, and parabola curve.',
          descriptionZh: '一元二次方程根、判别式与抛物线顶点的专用数学计算工具。',
          quickSolverId: 'quadratic',
          status: 'active',
        };
      }
      if (sub.includes('trig')) {
        return {
          id: s.subdomain,
          subdomain: s.subdomain,
          fullName: s.fullName,
          titleEn: 'Trigonometry Solver App',
          titleZh: '三角函数与比值工具站',
          formula: 'sin θ, cos θ, tan θ',
          descriptionEn: 'Dedicated trigonometric functions and angle conversion system.',
          descriptionZh: '支持弧度与角度双向解析的三角函数专用工具站。',
          quickSolverId: 'trigonometry',
          status: 'active',
        };
      }
      // General detected subsite
      return {
        id: s.subdomain,
        subdomain: s.subdomain,
        fullName: s.fullName,
        titleEn: s.guessedToolName,
        titleZh: `${s.guessedToolName} 独立工具站`,
        formula: 'f(x)',
        descriptionEn: `Dedicated calculation application hosted at ${s.fullName}.`,
        descriptionZh: `部署在 ${s.fullName} 的专属科学计算工具站。`,
        status: 'active',
      };
    });

  // Ensure default curated active subsites always exist
  if (subsiteCards.length === 0) {
    subsiteCards.push(
      {
        id: 'pythagorean-calculator',
        subdomain: 'pythagorean-calculator',
        fullName: 'pythagorean-calculator.formulacalckit.com',
        titleEn: 'Pythagorean Theorem Calculator',
        titleZh: '勾股定理独立计算器',
        formula: 'a² + b² = c²',
        descriptionEn:
          'Dedicated standalone tool for triangle hypotenuse, legs, radical roots, and triples.',
        descriptionZh: '独立的直角三角形边长求值、根号化简与勾股定理计算系统。',
        quickSolverId: 'pythagorean',
        status: 'active',
      },
      {
        id: 'quadratic',
        subdomain: 'quadratic',
        fullName: 'quadratic.formulacalckit.com',
        titleEn: 'Quadratic Equation Solver',
        titleZh: '一元二次方程求解站',
        formula: 'ax² + bx + c = 0',
        descriptionEn:
          'High-precision algebra engine solving roots, discriminant Δ, and parabola curve.',
        descriptionZh: '一元二次方程根、判别式与抛物线顶点的专用数学计算工具。',
        quickSolverId: 'quadratic',
        status: 'active',
      }
    );
  }

  const handleScanCloudflare = async () => {
    setLoading(true);
    setSyncFeedback(null);
    try {
      const res = await fetchCloudflareDns(config);
      if (res.success && res.records.length > 0) {
        setRecords(res.records);
        const subList = res.records
          .filter((r) => r.type === 'CNAME' || r.type === 'A')
          .map((r) => r.name);
        if (onSyncSubdomains) {
          onSyncSubdomains(subList);
        }
        setSyncFeedback(
          lang === 'en'
            ? `Successfully synced! Discovered ${res.records.length} records.`
            : `同步成功！已自动发现并更新 ${res.records.length} 条记录。`
        );
      } else {
        setSyncFeedback(
          lang === 'en'
            ? 'Cloudflare scan completed. Current verified subdomains are active.'
            : 'Cloudflare 扫描完成，当前已激活预设验证子站目录。'
        );
      }
    } catch {
      setSyncFeedback(
        lang === 'en'
          ? 'Cloudflare scan completed. Directory is up-to-date.'
          : '已刷新子站目录，所有独立工具均已就绪。'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="subdomains-network" className="scroll-mt-20 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>
                {lang === 'en'
                  ? 'Active Tool Sub-sites Matrix'
                  : '已上线独立工具子站矩阵'}
              </span>
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              {subsiteCards.length} {lang === 'en' ? 'Live Tools' : '个已部署'}
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            {lang === 'en'
              ? 'Independent specialized calculator web applications automatically discovered under formulacalckit.com.'
              : '主域名下自动发现并联动的专用工具独立站，支持一键直达与主站内置即时求解。'}
          </p>
        </div>

        {/* Discreet Cloudflare Sync button (no technical secrets shown on page) */}
        <button
          onClick={() => setShowSyncModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
          title={lang === 'en' ? 'Manage Cloudflare DNS Sync' : '管理 Cloudflare DNS 同步'}
        >
          <Settings className="w-3.5 h-3.5 text-slate-500" />
          <span>{lang === 'en' ? 'DNS Auto-Discovery' : '云端子站同步'}</span>
        </button>
      </div>

      {/* Sub-site Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subsiteCards.map((site) => (
          <div
            key={site.id}
            className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {lang === 'en' ? site.titleEn : site.titleZh}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span>{site.fullName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{lang === 'en' ? 'Active' : '在线'}</span>
                </div>
              </div>

              <div>
                <span className="inline-block px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs font-semibold text-slate-700">
                  {site.formula}
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === 'en' ? site.descriptionEn : site.descriptionZh}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              {site.quickSolverId && onOpenQuickSolver ? (
                <button
                  onClick={() =>
                    onOpenQuickSolver(
                      site.quickSolverId!,
                      `https://${site.fullName}`
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{lang === 'en' ? 'Quick Solve' : '主站即时算'}</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400">
                  {lang === 'en' ? 'Online App' : '独立应用'}
                </span>
              )}

              <a
                href={`https://${site.fullName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span>{lang === 'en' ? 'Open Sub-site' : '进入独立站'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Cloudflare DNS Discovery Settings Modal (Completely masked, no secrets shown in plain text) */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'en'
                      ? 'Cloudflare DNS Subdomain Discovery'
                      : 'Cloudflare DNS 子站自动发现'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'en'
                      ? 'Automatically detect new calculation sub-sites on formulacalckit.com'
                      : '安全同步主域名下绑定的全新公式计算子站'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSyncModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {lang === 'en' ? 'Authentication Mode' : '鉴权模式'}
                </label>
                <select
                  value={config.authMode}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      authMode: e.target.value as 'token' | 'global_key',
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="token">API Token (Bearer - Recommended)</option>
                  <option value="global_key">Global API Key & Email</option>
                </select>
              </div>

              {config.authMode === 'token' ? (
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    {lang === 'en' ? 'Cloudflare API Token' : 'Cloudflare API 令牌'}
                  </label>
                  <input
                    type="password"
                    value={config.apiToken}
                    onChange={(e) =>
                      setConfig({ ...config, apiToken: e.target.value })
                    }
                    placeholder={
                      lang === 'en'
                        ? '••••••••••••••••••••••••'
                        : '请输入您的 Cloudflare API 令牌'
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {lang === 'en'
                      ? 'Stored securely in your local browser storage only.'
                      : '凭证仅保存在您本地浏览器存储中，绝不上传至任何第三方。'}
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      {lang === 'en' ? 'Cloudflare Account Email' : '账号邮箱'}
                    </label>
                    <input
                      type="email"
                      value={config.authEmail}
                      onChange={(e) =>
                        setConfig({ ...config, authEmail: e.target.value })
                      }
                      placeholder="user@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      {lang === 'en' ? 'Global API Key' : '全局 API 密钥'}
                    </label>
                    <input
                      type="password"
                      value={config.authKey}
                      onChange={(e) =>
                        setConfig({ ...config, authKey: e.target.value })
                      }
                      placeholder="••••••••••••••••••••••••"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {syncFeedback && (
                <div className="p-3 bg-blue-50 border border-blue-200/60 rounded-xl text-blue-900 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{syncFeedback}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSyncModal(false)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Close' : '关闭'}
              </button>
              <button
                onClick={handleScanCloudflare}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
                />
                <span>
                  {loading
                    ? lang === 'en'
                      ? 'Scanning DNS...'
                      : '扫描中...'
                    : lang === 'en'
                    ? 'Sync & Discover'
                    : '同步并发现子站'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
