import React, { useState, useEffect } from 'react';
import { QuickSolverId, WorkerSubsiteTool } from '../types';
import {
  fetchWorkerDnsTools,
  WORKER_DNS_API_URL,
  FALLBACK_WORKER_TOOLS,
} from '../services/cloudflare';
import {
  Globe,
  Zap,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface DnsInspectorProps {
  lang: 'en' | 'zh';
  onSyncSubdomains?: (discoveredDomains: string[]) => void;
  onOpenQuickSolver?: (solverId: QuickSolverId, subdomainUrl?: string) => void;
}

export const DnsInspector: React.FC<DnsInspectorProps> = ({
  lang,
  onSyncSubdomains,
  onOpenQuickSolver,
}) => {
  const [tools, setTools] = useState<WorkerSubsiteTool[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fck_worker_tools_cache');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {
          // ignore
        }
      }
    }
    return FALLBACK_WORKER_TOOLS;
  });

  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  // Initial fetch on mount
  useEffect(() => {
    let isMounted = true;
    const loadTools = async () => {
      setLoading(true);
      try {
        const result = await fetchWorkerDnsTools();
        if (isMounted && result.tools && result.tools.length > 0) {
          setTools(result.tools);
          setSyncStatus('success');
          setLastSyncTime(new Date().toLocaleTimeString());
          if (onSyncSubdomains) {
            onSyncSubdomains(result.tools.map((t) => t.domain));
          }
        }
      } catch (err) {
        if (isMounted) setSyncStatus('error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTools();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleManualRefresh = async () => {
    setLoading(true);
    setSyncStatus('idle');
    try {
      const result = await fetchWorkerDnsTools();
      if (result.tools && result.tools.length > 0) {
        setTools(result.tools);
        setSyncStatus('success');
        setLastSyncTime(new Date().toLocaleTimeString());
        if (onSyncSubdomains) {
          onSyncSubdomains(result.tools.map((t) => t.domain));
        }
      }
    } catch {
      setSyncStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const getQuickSolverId = (subdomain: string): QuickSolverId | undefined => {
    const sub = subdomain.toLowerCase();
    if (sub.includes('pythagorean')) return 'pythagorean';
    if (sub.includes('quadratic')) return 'quadratic';
    if (sub.includes('circle')) return 'circle';
    if (sub.includes('trig')) return 'trigonometry';
    return undefined;
  };

  const getFormulaDisplay = (subdomain: string): string => {
    const sub = subdomain.toLowerCase();
    if (sub.includes('pythagorean')) return 'a² + b² = c²';
    if (sub.includes('quadratic')) return 'ax² + bx + c = 0';
    if (sub.includes('mathbridge')) return '\\sum, \\int, \\frac{d}{dx}';
    return 'f(x) = y';
  };

  return (
    <section id="subdomains-network" className="scroll-mt-20 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>
                {lang === 'en'
                  ? 'Active Tool Sub-sites Matrix'
                  : '已上线独立工具子站矩阵'}
              </span>
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {tools.length} {lang === 'en' ? 'Live Cloudflare Sites' : '个已部署在线'}
              </span>
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            {lang === 'en'
              ? 'Automatically synchronized in real-time from Cloudflare DNS records. Any sub-site added or removed in DNS is dynamically reflected here.'
              : '通过 Cloudflare 边缘节点自动同步 DNS 解析记录。主域名下新上站自动增加，下架即刻同步减少。'}
          </p>
        </div>

        {/* Sync Status & Action */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={handleManualRefresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-all cursor-pointer disabled:opacity-60"
            title={lang === 'en' ? 'Re-scan Cloudflare Worker API' : '重新从 Cloudflare Worker 同步'}
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-blue-600 ${loading ? 'animate-spin' : ''}`}
            />
            <span>
              {loading
                ? lang === 'en'
                  ? 'Syncing...'
                  : '正在同步...'
                : lang === 'en'
                ? 'Sync DNS'
                : '实时同步'}
            </span>
          </button>
        </div>
      </div>

      {/* Sub-site Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((site) => {
          const quickSolverId = getQuickSolverId(site.subdomain);
          const formula = getFormulaDisplay(site.subdomain);

          return (
            <div
              key={site.subdomain}
              className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 opacity-80" />

              <div className="space-y-3 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      {site.icon && <span className="text-base">{site.icon}</span>}
                      <span>{site.title}</span>
                    </h3>
                    <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span>{site.domain}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{lang === 'en' ? 'Active' : '在线'}</span>
                  </div>
                </div>

                <div>
                  <span className="inline-block px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs font-semibold text-slate-700">
                    {formula}
                  </span>
                  {site.category && (
                    <span className="ml-2 inline-block px-1.5 py-0.5 bg-blue-50 border border-blue-100 text-[10px] font-medium text-blue-600 rounded">
                      {site.category}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed min-h-[2.5rem]">
                  {site.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {quickSolverId && onOpenQuickSolver ? (
                  <button
                    onClick={() => onOpenQuickSolver(quickSolverId, site.url)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lang === 'en' ? 'Quick Solve' : '主站即时算'}</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-slate-400" />
                    <span>{lang === 'en' ? 'Independent App' : '独立工具站'}</span>
                  </span>
                )}

                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  <span>{lang === 'en' ? 'Open Sub-site' : '进入独立站'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security & Cloudflare Worker Gateway Attribution */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 px-1 pt-1">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {lang === 'en'
              ? 'DNS Automated Discovery Gateway: Cloudflare Worker Edge Service'
              : 'DNS 自动化探测通道：Cloudflare Worker 边缘节点（服务端零密钥泄露架构）'}
          </span>
        </div>
        {lastSyncTime && (
          <div className="flex items-center gap-1 text-slate-400">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>
              {lang === 'en' ? 'Latest sync:' : '最近更新:'} {lastSyncTime}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
