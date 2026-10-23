import React, { useState, useEffect, useMemo } from 'react';
import { QuickSolverId, WorkerSubsiteTool } from '../types';
import { fetchWorkerDnsTools, FALLBACK_WORKER_TOOLS, WORKER_DNS_API_URL } from '../services/cloudflare';
import { resolveDynamicToolMetadata } from '../utils/subdomainResolver';
import {
  Globe,
  Zap,
  RefreshCw,
  ArrowUpRight,
  Search,
  Cloud,
  CheckCircle2,
} from 'lucide-react';

interface CloudflareToolGridProps {
  lang: 'en' | 'zh';
  onSelectSolver: (solverId: QuickSolverId) => void;
  onSyncSubdomains?: (domains: string[]) => void;
}

export const CloudflareToolGrid: React.FC<CloudflareToolGridProps> = ({
  lang,
  onSelectSolver,
  onSyncSubdomains,
}) => {
  const [tools, setTools] = useState<WorkerSubsiteTool[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fck_worker_tools_cache');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {}
      }
    }
    return FALLBACK_WORKER_TOOLS;
  });

  const [loading, setLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchWorkerDnsTools();
        if (isMounted && res.tools && res.tools.length > 0) {
          setTools(res.tools);
          setLastSyncTime(new Date().toLocaleTimeString());
          if (onSyncSubdomains) {
            onSyncSubdomains(res.tools.map((t) => t.domain));
          }
        }
      } catch (err) {
        console.warn('Initial Worker DNS load error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetchWorkerDnsTools();
      if (res.tools && res.tools.length > 0) {
        setTools(res.tools);
        setLastSyncTime(new Date().toLocaleTimeString());
        if (onSyncSubdomains) {
          onSyncSubdomains(res.tools.map((t) => t.domain));
        }
      }
    } catch (err) {
      console.warn('Refresh Worker DNS error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getQuickSolverId = (subdomain: string): QuickSolverId | undefined => {
    const sub = subdomain.toLowerCase().replace(/\.formulacalckit\.com$/, '').trim();
    if (sub.includes('pythagorean')) return 'pythagorean';
    if (sub.includes('quadratic')) return 'quadratic';
    if (sub.includes('circle') || sub.includes('sphere')) return 'circle';
    if (sub.includes('trigonometry') || sub.includes('trig')) return 'trigonometry';
    if (sub.includes('ohms') || sub.includes('ohm')) return 'ohms_law';
    if (sub.includes('percentage')) return 'percentage';
    if (sub.includes('gcd') || sub.includes('fraction')) return 'gcd_lcm';
    if (sub.includes('density')) return 'ohms_law';
    if (sub.includes('mathbridge')) return 'mathbridge';
    return undefined;
  };

  const enrichedTools = useMemo(() => {
    return tools.map((site) => {
      const resolved = resolveDynamicToolMetadata(site, lang);
      const quickSolverId = resolved.quickSolverId || getQuickSolverId(site.subdomain);
      return {
        site,
        resolved,
        quickSolverId,
      };
    });
  }, [tools, lang]);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of enrichedTools) {
      const cat = item.resolved.category || (lang === 'zh' ? '实用与在线工具' : 'Utility & Tools');
      map.set(cat, (map.get(cat) || 0) + 1);
    }
    const list: Array<{ id: string; label: string; count: number }> = [
      { id: 'all', label: lang === 'zh' ? '全部' : 'All', count: enrichedTools.length },
    ];
    for (const [catName, count] of map.entries()) {
      list.push({ id: catName, label: catName, count });
    }
    return list;
  }, [enrichedTools, lang]);

  const filteredItems = useMemo(() => {
    let result = enrichedTools;
    if (selectedCategory !== 'all') {
      result = result.filter((i) => i.resolved.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((i) => {
        const titleMatch = i.resolved.title.toLowerCase().includes(q);
        const descMatch = i.resolved.desc.toLowerCase().includes(q);
        const domainMatch = i.site.domain.toLowerCase().includes(q);
        const subMatch = i.site.subdomain.toLowerCase().includes(q);
        const formulaMatch = i.resolved.formula ? i.resolved.formula.toLowerCase().includes(q) : false;
        const tagMatch = i.resolved.tags ? i.resolved.tags.some((t) => t.toLowerCase().includes(q)) : false;
        return titleMatch || descMatch || domainMatch || subMatch || formulaMatch || tagMatch;
      });
    }
    return result;
  }, [enrichedTools, selectedCategory, searchQuery]);

  const handleLaunchSolver = (solverId?: QuickSolverId) => {
    if (solverId) {
      onSelectSolver(solverId);
      const el = document.getElementById('workstation');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cloudflare-tools" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
            <Cloud className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'CLOUDFLARE EDGE NETWORK' : 'Cloudflare 边缘网关数据源'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">
              {lang === 'en'
                ? `Live DNS sync · ${tools.length} active verified subdomains`
                : `实时 DNS 同步 · 已连通 ${tools.length} 个独立子站`}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            <span>{lang === 'en' ? 'Online Tools (Cloudflare Verified Subsites)' : '云端独立子站工具库'}</span>
          </h2>
        </div>

        {/* Sync Status & Search Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleManualRefresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            title={lang === 'en' ? 'Sync Cloudflare DNS' : '刷新同步 Cloudflare DNS 数据'}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? (lang === 'en' ? 'Syncing...' : '同步中...') : (lang === 'en' ? 'Sync Edge' : '刷新边缘同步')}</span>
          </button>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'en'
                  ? `Search ${tools.length} Cloudflare tools...`
                  : `在 ${tools.length} 个独立子站中检索...`
              }
              className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Cloudflare Subsite Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(({ site, resolved, quickSolverId }) => (
          <div
            key={site.subdomain}
            className="p-5 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                    {resolved.title}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[200px]">{site.domain}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 shrink-0">
                  Cloudflare
                </span>
              </div>

              {/* Formula & Category metadata */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {resolved.formula && (
                  <span className="font-mono font-semibold text-blue-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                    {resolved.formula}
                  </span>
                )}
                {resolved.category && (
                  <span className="text-slate-500 text-[11px]">
                    {resolved.category}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                {resolved.desc}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              {quickSolverId ? (
                <button
                  onClick={() => handleLaunchSolver(quickSolverId)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{lang === 'en' ? 'Quick Solve' : '即时求解'}</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400">
                  {lang === 'en' ? 'Standalone' : '专属子站'}
                </span>
              )}

              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
              >
                <span>{lang === 'en' ? 'Open Tool' : '打开独立工具'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="p-10 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <p className="text-xs text-slate-500 font-medium">
            {lang === 'en' ? 'No Cloudflare tools matching your query.' : '没有找到符合条件的云端独立工具。'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-blue-600 font-medium hover:underline cursor-pointer"
          >
            {lang === 'en' ? 'Reset search and filters' : '重置搜索与分类'}
          </button>
        </div>
      )}

      {lastSyncTime && (
        <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>{lang === 'en' ? 'Cloudflare Sync Time:' : 'Cloudflare 边缘同步更新时间:'} {lastSyncTime}</span>
        </div>
      )}
    </section>
  );
};
