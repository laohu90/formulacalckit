import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ToolItem, QuickSolverId } from '../types';
import {
  Search,
  X,
  Zap,
  ArrowUpRight,
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
  Sparkles,
} from 'lucide-react';

interface SearchBarProps {
  lang: 'en' | 'zh';
  tools: ToolItem[];
  onOpenQuickSolver: (solverId: QuickSolverId, subdomainUrl?: string) => void;
  onSearchChange?: (query: string) => void;
  currentQuery?: string;
}

// Normalize formulas & strings (e.g., superscripts, spaces, punctuation)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[²]/g, '2')
    .replace(/[³]/g, '3')
    .replace(/[⁴]/g, '4')
    .replace(/[π]/g, 'pi')
    .replace(/[θ]/g, 'theta')
    .replace(/[Δ]/g, 'delta')
    .replace(/[\s\-_+=,()/*\\^]/g, '');
}

export const SearchBar: React.FC<SearchBarProps> = ({
  lang,
  tools,
  onOpenQuickSolver,
  onSearchChange,
  currentQuery = '',
}) => {
  const [query, setQuery] = useState(currentQuery);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external query if updated
  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Intelligent bilingual search algorithm
  const searchResults = useMemo(() => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];

    const normQuery = normalizeText(cleanQuery);
    const rawLowerQuery = cleanQuery.toLowerCase();

    return tools
      .map((tool) => {
        let score = 0;
        const normNameEn = normalizeText(tool.nameEn);
        const normNameZh = normalizeText(tool.nameZh);
        const normFormula = normalizeText(tool.formula);

        // Name exact or starts with
        if (normNameZh === normQuery || normNameEn === normQuery) score += 100;
        else if (normNameZh.startsWith(normQuery) || normNameEn.startsWith(normQuery)) score += 80;
        else if (tool.nameZh.toLowerCase().includes(rawLowerQuery) || tool.nameEn.toLowerCase().includes(rawLowerQuery)) score += 60;

        // Formula match
        if (normFormula.includes(normQuery)) score += 50;

        // Tags match (bilingual synonyms)
        const matchedTag = tool.tags.some((t) => {
          const normT = normalizeText(t);
          return normT.includes(normQuery) || t.toLowerCase().includes(rawLowerQuery);
        });
        if (matchedTag) score += 40;

        // Description match
        if (tool.descriptionZh.toLowerCase().includes(rawLowerQuery) || tool.descriptionEn.toLowerCase().includes(rawLowerQuery)) {
          score += 20;
        }

        return { tool, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.tool);
  }, [query, tools]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
    if (onSearchChange) onSearchChange(val);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearchChange) onSearchChange('');
    inputRef.current?.focus();
  };

  const handleSelectQuickSuggestion = (keyword: string) => {
    setQuery(keyword);
    setIsOpen(true);
    if (onSearchChange) onSearchChange(keyword);
    inputRef.current?.focus();
  };

  const scrollToTool = (toolId: string) => {
    setIsOpen(false);
    const el = document.getElementById(`tool-card-${toolId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-blue-500');
      setTimeout(() => el.classList.remove('ring-2', 'ring-blue-500'), 2000);
    } else {
      const catEl = document.getElementById('calculators');
      catEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper for dynamic icon rendering
  const renderIcon = (name: string) => {
    const props = { className: 'w-4 h-4 text-blue-600' };
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

  const quickPills = [
    { labelEn: 'Pythagorean', labelZh: '勾股定理', query: '勾股定理' },
    { labelEn: 'Quadratic Solver', labelZh: '一元二次方程', query: '二次方程' },
    { labelEn: 'LaTeX MathBridge', labelZh: '公式排版', query: 'LaTeX' },
    { labelEn: 'Trigonometry', labelZh: '三角函数', query: '三角函数' },
    { labelEn: 'Circle & Sphere', labelZh: '圆与球体', query: '圆面积' },
    { labelEn: "Ohm's Law", labelZh: '欧姆定律', query: '欧姆' },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto my-2 z-30">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
          <Search className="w-5 h-5 text-slate-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={
            lang === 'en'
              ? 'Search by tool, formula, or concept (e.g. pythagorean, 一元二次, LaTeX, sin)...'
              : '搜索公式工具、符号或关键词（支持中英文，如：勾股定理、quadratic、LaTeX、三角函数）...'
          }
          className="w-full pl-11 pr-24 py-3 bg-white border border-slate-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition-all outline-hidden"
        />

        {/* Clear & Shortcut Indicator */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {query ? (
            <button
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title={lang === 'en' ? 'Clear search' : '清除搜索'}
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Quick Suggestions Pills (Shown below input) */}
      <div className="mt-2.5 flex items-center gap-1.5 flex-wrap justify-center text-xs text-slate-500">
        <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{lang === 'en' ? 'Quick picks:' : '推荐检索:'}</span>
        </span>
        {quickPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectQuickSuggestion(pill.query)}
            className="px-2.5 py-1 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            {lang === 'en' ? pill.labelEn : pill.labelZh}
          </button>
        ))}
      </div>

      {/* Autocomplete Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[28rem] flex flex-col z-50">
          {/* Header count indicator */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {cleanQueryCheck(query) ? (
                <>
                  {lang === 'en' ? 'Matched Formulas & Tools' : '已匹配公式工具'} (
                  <strong className="text-blue-600 font-semibold">{searchResults.length}</strong>)
                </>
              ) : (
                <>{lang === 'en' ? 'Popular Tools' : '常用热门公式工具'}</>
              )}
            </span>
            <span className="text-[11px] text-slate-400">
              {lang === 'en' ? 'Press Esc to close' : '按 Esc 关闭'}
            </span>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
            {searchResults.length > 0 ? (
              searchResults.map((tool) => (
                <div
                  key={tool.id}
                  className="p-3.5 hover:bg-blue-50/50 transition-colors flex items-center justify-between gap-3 group"
                >
                  <button
                    onClick={() => scrollToTool(tool.id)}
                    className="flex items-start gap-3 text-left flex-1 cursor-pointer"
                  >
                    <div className="p-2 bg-blue-50 rounded-xl group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      {renderIcon(tool.iconName)}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                          {lang === 'en' ? tool.nameEn : tool.nameZh}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                          {tool.formula}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {lang === 'en' ? tool.descriptionEn : tool.descriptionZh}
                      </p>
                    </div>
                  </button>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {tool.quickSolverId && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenQuickSolver(tool.quickSolverId!, tool.subdomainUrl);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>{lang === 'en' ? 'Solve' : '即时求解'}</span>
                      </button>
                    )}

                    {tool.subdomainUrl ? (
                      <a
                        href={tool.subdomainUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        <span>{lang === 'en' ? 'Open' : '打开'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollToTool(tool.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{lang === 'en' ? 'View' : '查看'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : query.trim() ? (
              <div className="p-8 text-center space-y-2">
                <p className="text-xs text-slate-500 font-medium">
                  {lang === 'en'
                    ? `No tools matched "${query}". Try searching by mathematical terms like Pythagorean, quadratic, LaTeX, or symbols.`
                    : `未找到与“${query}”直接匹配的工具。支持按中文、英文（如 pythagorean、quadratic、LaTeX）或公式符号检索。`}
                </p>
                <button
                  onClick={handleClear}
                  className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  {lang === 'en' ? 'Clear search query' : '清空搜索词'}
                </button>
              </div>
            ) : (
              // Default preview list when query is empty but focused
              tools.slice(0, 4).map((tool) => (
                <div
                  key={tool.id}
                  className="p-3.5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 group"
                >
                  <button
                    onClick={() => scrollToTool(tool.id)}
                    className="flex items-start gap-3 text-left flex-1 cursor-pointer"
                  >
                    <div className="p-2 bg-blue-50 rounded-xl group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      {renderIcon(tool.iconName)}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                          {lang === 'en' ? tool.nameEn : tool.nameZh}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                          {tool.formula}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {lang === 'en' ? tool.descriptionEn : tool.descriptionZh}
                      </p>
                    </div>
                  </button>

                  {tool.quickSolverId && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenQuickSolver(tool.quickSolverId!, tool.subdomainUrl);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>{lang === 'en' ? 'Solve' : '即时求解'}</span>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function cleanQueryCheck(q: string): boolean {
  return q.trim().length > 0;
}
