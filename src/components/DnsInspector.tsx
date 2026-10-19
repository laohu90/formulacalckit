import React, { useState, useEffect } from 'react';
import {
  CloudflareDnsRecord,
  DnsConfig,
} from '../types';
import {
  DEFAULT_DNS_CONFIG,
  SEED_DNS_RECORDS,
  fetchCloudflareDns,
  extractWebSubdomains,
} from '../services/cloudflare';
import {
  Cloud,
  RefreshCw,
  Globe,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Key,
  Layers,
  ArrowUpRight,
  Info,
  Check,
} from 'lucide-react';

interface DnsInspectorProps {
  lang: 'en' | 'zh';
  onSyncSubdomains?: (discoveredDomains: string[]) => void;
}

export const DnsInspector: React.FC<DnsInspectorProps> = ({
  lang,
  onSyncSubdomains,
}) => {
  const [config, setConfig] = useState<DnsConfig>(() => {
    const saved = localStorage.getItem('cf_dns_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_DNS_CONFIG;
  });

  const [records, setRecords] = useState<CloudflareDnsRecord[]>(SEED_DNS_RECORDS);
  const [loading, setLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Pre-configured Catalog');
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [syncedFeedback, setSyncedFeedback] = useState(false);

  useEffect(() => {
    localStorage.setItem('cf_dns_config', JSON.stringify(config));
  }, [config]);

  const handleFetch = async () => {
    setLoading(true);
    setErrorInfo(null);
    try {
      const result = await fetchCloudflareDns(config);
      if (result.success && result.records.length > 0) {
        setRecords(result.records);
        setLastSyncTime(new Date().toLocaleTimeString());
        setErrorInfo(null);
      } else {
        const msg =
          result.errors?.[0]?.message ||
          (lang === 'en'
            ? 'Failed to fetch DNS records. Authentication or CORS error.'
            : '获取 DNS 记录失败，请检查 API Token 权限或 CORS 代理配置。');
        setErrorInfo(msg);
        // Retain current records so user has data
      }
    } catch (err: unknown) {
      setErrorInfo(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSeed = () => {
    setRecords(SEED_DNS_RECORDS);
    setLastSyncTime(lang === 'en' ? 'Loaded Verified Catalog' : '已加载已验证解析');
    setErrorInfo(null);
  };

  const subdomains = extractWebSubdomains(records, config.rootDomain);

  const filteredRecords =
    typeFilter === 'ALL'
      ? records
      : records.filter((r) => r.type.toUpperCase() === typeFilter);

  const handleSyncToPortal = () => {
    const liveUrls = subdomains
      .filter((s) => !s.isRoot)
      .map((s) => s.fullName);
    if (onSyncSubdomains) {
      onSyncSubdomains(liveUrls);
    }
    setSyncedFeedback(true);
    setTimeout(() => setSyncedFeedback(false), 2500);
  };

  return (
    <section id="dns-inspector" className="scroll-mt-20">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Header Banner */}
        <div className="px-6 py-5 border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-blue-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  {lang === 'en'
                    ? 'Cloudflare DNS Subdomain Auto-Discovery'
                    : 'Cloudflare DNS 智能子站发现引擎'}
                </h2>
                <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full">
                  {config.rootDomain}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'en'
                  ? 'Automatically inspects DNS records of the main domain to detect and link active calculation tool sub-sites.'
                  : '自动检测主域名下的 DNS 解析记录，实时列出已绑定的公式工具子站并提供一键直达。'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setShowConfigDrawer(!showConfigDrawer)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'en' ? 'API Key / Zone' : '配置 API Key'}</span>
            </button>
            <button
              onClick={handleFetch}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? (lang === 'en' ? 'Scanning...' : '扫描中...') : (lang === 'en' ? 'Live Cloudflare Scan' : '实时扫描 DNS')}</span>
            </button>
            <button
              onClick={handleSyncToPortal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title={lang === 'en' ? 'Sync subdomains to homepage catalog' : '同步子站至首页工具箱'}
            >
              {syncedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{lang === 'en' ? 'Synced!' : '已同步!'}</span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'en' ? 'Sync to Catalog' : '同步至首页'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* API Credentials Drawer */}
        {showConfigDrawer && (
          <div className="p-6 bg-slate-50 border-b border-slate-200 animate-in fade-in duration-150">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  {lang === 'en' ? 'Cloudflare API Authentication Settings' : 'Cloudflare API 鉴权配置'}
                </h3>
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'How to create API Token' : '如何创建 API Token'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {lang === 'en' ? 'Auth Mode' : '鉴权模式'}
                  </label>
                  <select
                    value={config.authMode}
                    onChange={(e) =>
                      setConfig({ ...config, authMode: e.target.value as 'token' | 'global_key' })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="token">API Token (Bearer Token - Recommended)</option>
                    <option value="global_key">Global API Key (X-Auth-Key & Email)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {lang === 'en' ? 'Zone ID' : 'Zone ID (区域代码)'}
                  </label>
                  <input
                    type="text"
                    value={config.zoneId}
                    onChange={(e) => setConfig({ ...config, zoneId: e.target.value })}
                    placeholder="c914ef51dc55517d2789d5f5294fa24c"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                {config.authMode === 'token' ? (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {lang === 'en' ? 'Cloudflare API Token' : 'Cloudflare API Token'}
                    </label>
                    <input
                      type="password"
                      value={config.apiToken}
                      onChange={(e) => setConfig({ ...config, apiToken: e.target.value })}
                      placeholder="e.g. cfk_... or your Cloudflare API Token"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {lang === 'en' ? 'Cloudflare Account Email' : 'Cloudflare 账号邮箱'}
                      </label>
                      <input
                        type="email"
                        value={config.authEmail}
                        onChange={(e) => setConfig({ ...config, authEmail: e.target.value })}
                        placeholder="google_ai_2@geoipview.com"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {lang === 'en' ? 'Global API Key' : '全局 API Key'}
                      </label>
                      <input
                        type="password"
                        value={config.authKey}
                        onChange={(e) => setConfig({ ...config, authKey: e.target.value })}
                        placeholder="cfk_..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">
                  {lang === 'en'
                    ? 'Stored safely in your local browser storage.'
                    : '配置仅保存在您的浏览器本地，不会上传第三方。'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLoadSeed}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Reset to Default Catalog' : '重置为默认解析'}
                  </button>
                  <button
                    onClick={() => {
                      setShowConfigDrawer(false);
                      handleFetch();
                    }}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Save & Scan Now' : '保存并立即扫描'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostic Guide */}
        {showGuide && (
          <div className="p-5 bg-blue-50/70 border-b border-blue-100 text-xs text-blue-900 space-y-2">
            <div className="font-semibold flex items-center gap-1.5 text-blue-950">
              <Info className="w-4 h-4 text-blue-600" />
              <span>
                {lang === 'en'
                  ? 'Quick Guide: Creating a Cloudflare Read-Only DNS Token'
                  : '快速指南：创建 Cloudflare 只读 DNS Token'}
              </span>
            </div>
            <ol className="list-decimal pl-5 space-y-1 text-slate-700">
              <li>
                {lang === 'en'
                  ? 'Log in to Cloudflare Dashboard -> My Profile -> API Tokens.'
                  : '登录 Cloudflare 控制台 -> 点击右上角个人资料 -> API 令牌 (API Tokens)。'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Click "Create Token" -> Use "Read all resources" or Create Custom Token with permissions: Zone:DNS:Read, Zone:Zone:Read.'
                  : '点击“创建令牌” -> 选择自定义令牌，赋予权限：“区域 (Zone) -> DNS -> 读取”与“区域 -> 区域 -> 读取”。'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Select Zone Resources: "Include - Specific zone - formulacalckit.com".'
                  : '区域资源选择：“包括 - 特定区域 - formulacalckit.com”。'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Copy the generated token and paste it here! If you see Error 10000, it means the token was created without DNS Read permission.'
                  : '生成后复制 Token 并粘贴在此处即可！如遇到 10000 报错，通常是权限未勾选 DNS 读取。'}
              </li>
            </ol>
          </div>
        )}

        {/* Error notification if any */}
        {errorInfo && (
          <div className="p-4 bg-amber-50 border-b border-amber-200/80 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 flex-1">
              <span className="font-semibold">
                {lang === 'en' ? 'Cloudflare Scan Notice: ' : '扫描提示：'}
              </span>
              <span>{errorInfo}</span>
              <div className="mt-1 flex items-center gap-3">
                <button
                  onClick={handleLoadSeed}
                  className="text-blue-700 underline font-medium hover:text-blue-900 cursor-pointer"
                >
                  {lang === 'en'
                    ? 'Load verified DNS catalog records for formulacalckit.com'
                    : '直接载入 formulacalckit.com 预验证解析清单'}
                </button>
                <button
                  onClick={() => setShowGuide(true)}
                  className="text-amber-800 underline hover:text-amber-950 cursor-pointer"
                >
                  {lang === 'en' ? 'View Token Setup Guide' : '查看 Token 权限设置指南'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Section Content: Discovered Subdomain Cards */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>
                    {lang === 'en'
                      ? 'Detected Live Tool Subdomains'
                      : '已发现的公式工具独立子站'}
                  </span>
                  <span className="text-xs font-normal text-slate-500">
                    ({subdomains.filter((s) => !s.isRoot).length} {lang === 'en' ? 'tools found' : '个已部署'})
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'en'
                    ? 'Websites running under formulacalckit.com detected via DNS records.'
                    : '主域名 DNS 下解析的独立计算工具，支持一键直达与健康检查。'}
                </p>
              </div>
              <span className="text-xs text-slate-400">
                {lang === 'en' ? 'Source: ' : '数据源：'}
                <span className="font-mono text-slate-600">{lastSyncTime}</span>
              </span>
            </div>

            {/* Discovered Subdomain Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subdomains
                .filter((s) => !s.isRoot)
                .map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all flex flex-col justify-between group hover:border-blue-300"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {sub.guessedToolName}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {sub.proxied ? (
                            <span
                              className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-sm"
                              title="Cloudflare CDN Proxy Active"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              <span>Proxied</span>
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1 text-[10px] text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-sm"
                              title="DNS Only"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              <span>DNS Only</span>
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1 py-0.5 rounded-xs">
                            {sub.type}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 font-mono break-all mb-2">
                        https://{sub.fullName}
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>Target: {sub.target}</span>
                        <span>·</span>
                        <span>TTL: {sub.ttl}</span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'DNS Verified' : 'DNS 已解析'}</span>
                      </span>

                      <a
                        href={`https://${sub.fullName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>{lang === 'en' ? 'Visit Tool' : '打开子站'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Collapsible Full DNS Records Table */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-700">
                {lang === 'en' ? 'All DNS Records in Zone' : '当前 Zone 全量 DNS 记录'} ({records.length})
              </span>

              {/* Type Filter Buttons */}
              <div className="flex items-center gap-1">
                {['ALL', 'A', 'CNAME', 'TXT'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                      typeFilter === t
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Content / Target</th>
                    <th className="py-2.5 px-3">Proxy</th>
                    <th className="py-2.5 px-3">TTL</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                  {filteredRecords.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 px-3 font-semibold text-blue-700">{r.type}</td>
                      <td className="py-2 px-3 font-medium text-slate-900">{r.name}</td>
                      <td className="py-2 px-3 max-w-xs truncate text-slate-600" title={r.content}>
                        {r.content}
                      </td>
                      <td className="py-2 px-3">
                        {r.proxied ? (
                          <span className="text-amber-600 font-sans text-[11px]">🟠 Proxied</span>
                        ) : (
                          <span className="text-slate-400 font-sans text-[11px]">⚪ DNS</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-slate-500 font-sans">
                        {r.ttl === 1 ? 'Auto' : `${r.ttl}s`}
                      </td>
                      <td className="py-2 px-3 text-right font-sans">
                        {(r.type === 'CNAME' || r.type === 'A') && (
                          <a
                            href={`https://${r.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline inline-flex items-center gap-0.5 text-xs"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
