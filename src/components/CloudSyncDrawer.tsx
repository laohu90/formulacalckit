import React, { useEffect, useState } from 'react';
import { Cloud, CheckCircle2, RefreshCw, X, Globe, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { fetchWorkerDnsTools, WORKER_DNS_API_URL } from '../services/cloudflare';
import { WorkerSubsiteTool } from '../types';

interface CloudSyncDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'zh';
  onSyncTools: (tools: WorkerSubsiteTool[]) => void;
}

export const CloudSyncDrawer: React.FC<CloudSyncDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  onSyncTools,
}) => {
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [subsites, setSubsites] = useState<WorkerSubsiteTool[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initial load
    handleSync();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSync = async () => {
    setLoading(true);
    try {
      const res = await fetchWorkerDnsTools();
      if (res.success && res.tools.length > 0) {
        setSubsites(res.tools);
        setSyncStatus('success');
        setLastSyncTime(new Date().toLocaleTimeString());
        onSyncTools(res.tools);
      } else {
        setSyncStatus('error');
      }
    } catch {
      setSyncStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {lang === 'en' ? 'Cloudflare Edge & Subdomains' : '云端边缘服务与子站同步'}
              </h3>
              <p className="text-[11px] text-slate-500">
                formulacalckit.com · Edge Worker Gateway
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">
                {lang === 'en' ? 'Gateway Status' : '边缘网关状态'}
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Active / Synchronized' : '已就绪 · 正常运行'}</span>
              </span>
            </div>
            <div className="text-xs font-mono text-slate-500 break-all bg-white p-2 rounded border border-slate-200">
              {WORKER_DNS_API_URL}
            </div>
            <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
              <span>{lang === 'en' ? 'Discovered Subsites: ' : '已同步子站数量: '}{subsites.length}</span>
              <button
                onClick={handleSync}
                disabled={loading}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{lang === 'en' ? 'Sync Now' : '立即刷新同步'}</span>
              </button>
            </div>
          </div>

          {/* Subsites List */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              {lang === 'en' ? 'Active Verified Subdomains' : '已验证的公式独立子站'}
            </div>
            <div className="space-y-2">
              {subsites.map((site) => (
                <div
                  key={site.subdomain}
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <span>{site.title}</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span>{site.domain}</span>
                    </div>
                  </div>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero API Key Exposure · Edge Isolated</span>
          </div>
          {lastSyncTime && <span>{lastSyncTime}</span>}
        </div>
      </div>
    </div>
  );
};
