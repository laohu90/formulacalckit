import React, { useState, useEffect, useMemo } from 'react';
import { ToolItem, ToolCategory, QuickSolverId, WorkerSubsiteTool } from '../types';
import { formatFormulaDisplay } from '../utils/subdomainResolver';
import { fetchPhpServerTools } from '../services/cloudflare';
import {
  Server,
  Search,
  ExternalLink,
  Zap,
  Triangle,
  Circle,
  FunctionSquare,
  Compass,
  Percent,
  TrendingUp,
  Activity,
  Calculator,
  FileText,
  Layers,
  ArrowUpRight,
  Database,
  Scale,
} from 'lucide-react';

interface ServerToolGridProps {
  initialTools: ToolItem[];
  lang: 'en' | 'zh';
  onSelectSolver: (solverId: QuickSolverId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ServerToolGrid: React.FC<ServerToolGridProps> = ({
  initialTools,
  lang,
  onSelectSolver,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [serverDynamicTools, setServerDynamicTools] = useState<WorkerSubsiteTool[]>([]);
  const [isServerLive, setIsServerLive] = useState(false);

  // Poll user server tools.php
  useEffect(() => {
    let isMounted = true;
    const fetchServer = async () => {
      try {
        const liveTools = await fetchPhpServerTools();
        if (isMounted && liveTools.length > 0) {
          setServerDynamicTools(liveTools);
          setIsServerLive(true);
        }
      } catch (err) {
        console.warn('Server tools scan attempt:', err);
      }
    };
    fetchServer();
    return () => {
      isMounted = false;
    };
  }, []);

  // Merge server tools if present, else fallback to initialTools
  const combinedTools = useMemo(() => {
    if (serverDynamicTools.length === 0) {
      return initialTools;
    }

    // If server provides dynamic tools, map them to ToolItem
    const dynamicMapped: ToolItem[] = serverDynamicTools.map((st) => ({
      id: st.subdomain,
      nameEn: st.title,
      nameZh: st.title,
      category: 'algebra',
      formula: st.formula || '',
      descriptionEn: st.desc,
      descriptionZh: st.desc,
      subdomainUrl: st.url,
      iconName: 'Calculator',
      tags: [st.subdomain, st.title],
    }));

    // Merge by id
    const map = new Map<string, ToolItem>();
    for (const t of initialTools) map.set(t.id, t);
    for (const d of dynamicMapped) map.set(d.id, d);
    return Array.from(map.values());
  }, [initialTools, serverDynamicTools]);

  const categories: Array<{ id: ToolCategory; labelEn: string; labelZh: string }> = [
    { id: 'all', labelEn: 'All Calculators', labelZh: '全部计算器' },
    { id: 'algebra', labelEn: 'Algebra & Equations', labelZh: '代数与方程' },
    { id: 'geometry', labelEn: 'Geometry & Shapes', labelZh: '几何与图形' },
    { id: 'physics', labelEn: 'Physics & Engineering', labelZh: '物理与工程' },
    { id: 'academic', labelEn: 'Arithmetic & LaTeX', labelZh: '算术与学术' },
    { id: 'trigonometry', labelEn: 'Trigonometry', labelZh: '三角函数' },
    { id: 'finance', labelEn: 'Finance & Utility', labelZh: '实用与金融' },
  ];

  const filteredTools = useMemo(() => {
    return combinedTools.filter((tool) => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchEn = tool.nameEn.toLowerCase().includes(q) || tool.descriptionEn.toLowerCase().includes(q);
      const matchZh = tool.nameZh.toLowerCase().includes(q) || tool.descriptionZh.toLowerCase().includes(q);
      const matchFormula = tool.formula.toLowerCase().includes(q);
      const matchTags = tool.tags.some((t) => t.toLowerCase().includes(q));
      return matchEn || matchZh || matchFormula || matchTags;
    });
  }, [combinedTools, selectedCategory, searchQuery]);

  const getToolIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4 text-indigo-600' };
    switch (iconName) {
      case 'Triangle':
        return <Triangle {...props} />;
      case 'Circle':
        return <Circle {...props} />;
      case 'FunctionSquare':
        return <FunctionSquare {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'Percent':
        return <Percent {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'Calculator':
        return <Calculator {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      default:
        return <Layers {...props} />;
    }
  };

  const handleLaunchSolver = (solverId?: QuickSolverId) => {
    if (solverId) {
      onSelectSolver(solverId);
      const el = document.getElementById('workstation');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="server-tools" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <Server className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'STANDARDIZED SOLVERS REPOSITORY' : '标准科学求解器目录'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">
              {lang === 'en'
                ? `${filteredTools.length} Standardized STEM Calculators (ISO/IEC 80000 Aligned)`
                : `收录 ${filteredTools.length} 款标准科学求解器 (ISO/IEC 80000 规范对齐)`}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            <span>{lang === 'en' ? 'Standard Formula Solvers & Calculators' : '标准公式计算器全量目录'}</span>
          </h2>
        </div>

        {/* Search Input for Server Directory */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Search server formulas & equations...'
                : '在服务器全量公式库中检索...'
            }
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          )}
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
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelZh}
            </button>
          );
        })}
      </div>

      {/* Grid of Server Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const title = lang === 'en' ? tool.nameEn : tool.nameZh;
          const desc = lang === 'en' ? tool.descriptionEn : tool.descriptionZh;
          const formulaDisplay = formatFormulaDisplay(tool.formula);

          return (
            <div
              key={tool.id}
              className="p-5 bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                    {getToolIcon(tool.iconName)}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="capitalize">{tool.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-indigo-600">Server Source</span>
                  </div>
                </div>

                {/* Title & Formula */}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {title}
                  </h3>
                  {formulaDisplay && (
                    <div className="mt-1.5 inline-block font-mono text-xs font-semibold text-indigo-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                      {formulaDisplay}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                  {desc}
                </p>

                {/* ISO/NIST Standard Reference Badge */}
                {tool.standardReference && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200/60">
                    <Scale className="w-3 h-3 text-indigo-500 shrink-0" />
                    <span className="truncate">{tool.standardReference}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {tool.quickSolverId ? (
                  <button
                    onClick={() => handleLaunchSolver(tool.quickSolverId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lang === 'en' ? 'Quick Solve' : '即时求解'}</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">
                    {lang === 'en' ? 'Built-in Engine' : '内置求解器'}
                  </span>
                )}

                {tool.subdomainUrl && (
                  <a
                    href={tool.subdomainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                  >
                    <span>{lang === 'en' ? 'Open Tool' : '进入工具'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="p-10 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <p className="text-xs text-slate-500 font-medium">
            {lang === 'en' ? 'No server tools found matching your search.' : '没有找到符合条件的服务器端公式工具。'}
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              setSelectedCategory('all');
            }}
            className="text-xs text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            {lang === 'en' ? 'Reset search and filters' : '重置搜索与分类'}
          </button>
        </div>
      )}
    </section>
  );
};
