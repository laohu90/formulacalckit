import React, { useState } from 'react';
import { ToolItem, ToolCategory, QuickSolverId } from '../types';
import {
  Search,
  ExternalLink,
  Zap,
  CheckCircle2,
  Triangle,
  Circle,
  FunctionSquare,
  Compass,
  Percent,
  Maximize2,
  TrendingUp,
  Activity,
  Calculator,
  FileText,
  Layers,
} from 'lucide-react';

interface ToolGridProps {
  tools: ToolItem[];
  lang: 'en' | 'zh';
  onOpenQuickSolver: (solverId: QuickSolverId, subdomainUrl?: string) => void;
  discoveredSubdomains?: string[];
  externalSearchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  lang,
  onOpenQuickSolver,
  discoveredSubdomains = [],
  externalSearchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [localSearch, setLocalSearch] = useState('');

  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearch;

  const handleSearchChange = (q: string) => {
    setLocalSearch(q);
    if (onSearchChange) onSearchChange(q);
  };

  const categories: Array<{ id: ToolCategory; labelEn: string; labelZh: string }> = [
    { id: 'all', labelEn: 'All Calculators', labelZh: '全部计算器' },
    { id: 'academic', labelEn: 'Academic & Typography', labelZh: '学术与排版' },
    { id: 'geometry', labelEn: 'Geometry & Shapes', labelZh: '几何与图形' },
    { id: 'algebra', labelEn: 'Algebra & Equations', labelZh: '代数与方程' },
    { id: 'trigonometry', labelEn: 'Trigonometry', labelZh: '三角函数' },
    { id: 'physics', labelEn: 'Physics & Engineering', labelZh: '物理与工程' },
    { id: 'finance', labelEn: 'Finance & Growth', labelZh: '实用与金融' },
  ];

  const filteredTools = tools.filter((tool) => {
    // Category match
    if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
      return false;
    }
    // Search match
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchEn = tool.nameEn.toLowerCase().includes(q) || tool.descriptionEn.toLowerCase().includes(q);
    const matchZh = tool.nameZh.toLowerCase().includes(q) || tool.descriptionZh.toLowerCase().includes(q);
    const matchFormula = tool.formula.toLowerCase().includes(q);
    const matchTags = tool.tags.some((t) => t.toLowerCase().includes(q));
    return matchEn || matchZh || matchFormula || matchTags;
  });

  // Dynamic icon selector
  const renderIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-blue-600' };
    switch (name) {
      case 'Triangle':
        return <Triangle {...props} />;
      case 'Circle':
        return <Circle {...props} />;
      case 'FunctionSquare':
        return <FunctionSquare {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Percent':
        return <Percent {...props} />;
      case 'Maximize2':
        return <Maximize2 {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      default:
        return <Calculator {...props} />;
    }
  };

  return (
    <section id="calculators" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-2xs">
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'en' ? 'Calculators & Formulas Directory' : '科学与数学公式工具库'}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70">
              {filteredTools.length} {lang === 'en' ? 'Calculators' : '个计算工具'}
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            {lang === 'en'
              ? 'Multi-category scientific tools with built-in instant solving algorithms, formulas, and parameters.'
              : '按学科分类汇集几何、代数、三角函数、物理及实用金融模型，支持即时计算与参数速算。'}
          </p>
        </div>
      </div>

      {/* Search and Category Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs (Segmented Control - Zero Pill discipline) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelZh}
            </button>
          ))}
        </div>

        {/* Instant Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Filter calculators (e.g. pythagorean, circle)...'
                : '筛选工具 (如 勾股定理, 圆...)'
            }
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => {
          const isDiscovered =
            tool.isVerifiedSubdomain ||
            discoveredSubdomains.some((d) => tool.dnsRecordName && d.includes(tool.dnsRecordName));

          return (
            <div
              key={tool.id}
              id={`tool-card-${tool.id}`}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition-all shadow-xs hover:shadow-md flex flex-col h-full justify-between group"
            >
              <div className="flex-grow flex flex-col">
                {/* Header row: Icon & Status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-100 group-hover:scale-105 transition-transform">
                    {renderIcon(tool.iconName)}
                  </div>

                  {isDiscovered ? (
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lang === 'en' ? 'Live Tool' : '在线工具'}</span>
                    </div>
                  ) : tool.quickSolverId ? (
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      <span>{lang === 'en' ? 'Instant Solver' : '即时求解'}</span>
                    </div>
                  ) : null}
                </div>

                {/* Title and Math formula badge */}
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  {lang === 'en' ? tool.nameEn : tool.nameZh}
                </h3>

                <div className="my-2.5">
                  <span className="inline-block px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs text-slate-700 font-semibold tracking-tight">
                    {tool.formula}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'en' ? tool.descriptionEn : tool.descriptionZh}
                </p>

                {/* Clean unboxed tags with separator (Zero-pill discipline) */}
                <div className="mt-auto pt-3 flex items-center gap-1.5 text-[11px] text-slate-400 flex-wrap">
                  {tool.tags.map((tag, tIdx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {tIdx < tool.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {tool.quickSolverId ? (
                  <button
                    onClick={() => onOpenQuickSolver(tool.quickSolverId!, tool.subdomainUrl)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>{lang === 'en' ? 'Quick Solve' : '即时求解'}</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">
                    {lang === 'en' ? 'Reference Tool' : '参考工具'}
                  </span>
                )}

                {tool.subdomainUrl && (
                  <a
                    href={tool.subdomainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>{lang === 'en' ? 'Open Tool' : '打开工具'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500 font-medium">
            {lang === 'en' ? 'No formulas found matching your search.' : '未找到匹配的计算器或公式。'}
          </p>
          <button
            onClick={() => {
              handleSearchChange('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-blue-600 font-medium hover:underline cursor-pointer"
          >
            {lang === 'en' ? 'Clear search & reset filters' : '清除搜索条件并重置筛选'}
          </button>
        </div>
      )}
    </section>
  );
};
