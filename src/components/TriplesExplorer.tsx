import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Sparkles, Wand2, Filter, ArrowUpRight } from 'lucide-react';
import { COMMON_TRIPLES, validateTriple, generateEuclidTriple, PythagoreanTriple } from '../utils/pythagorean';

interface Props {
  onSelectTriple?: (a: number, b: number) => void;
}

export const TriplesExplorer: React.FC<Props> = ({ onSelectTriple }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'primitive' | 'under50'>('all');

  // Validator inputs
  const [valA, setValA] = useState('3');
  const [valB, setValB] = useState('4');
  const [valC, setValC] = useState('5');
  const [validationResult, setValidationResult] = useState<ReturnType<typeof validateTriple> | null>(null);

  // Euclid Generator inputs
  const [genM, setGenM] = useState('3');
  const [genN, setGenN] = useState('2');
  const [generatedTriple, setGeneratedTriple] = useState<PythagoreanTriple | null>({
    a: 5,
    b: 12,
    c: 13,
    isPrimitive: true,
    m: 3,
    n: 2
  });

  // Filter triples table
  const filteredTriples = COMMON_TRIPLES.filter((item) => {
    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.trim();
      const match =
        item.a.toString().includes(q) ||
        item.b.toString().includes(q) ||
        item.c.toString().includes(q);
      if (!match) return false;
    }

    if (filterType === 'primitive') return item.isPrimitive;
    if (filterType === 'under50') return item.c <= 50;
    return true;
  });

  // Handle validate
  const handleValidate = () => {
    const na = parseInt(valA, 10);
    const nb = parseInt(valB, 10);
    const nc = parseInt(valC, 10);
    setValidationResult(validateTriple(na, nb, nc));
  };

  // Handle Euclid generator
  const handleGenerate = () => {
    const m = parseInt(genM, 10);
    const n = parseInt(genN, 10);
    const res = generateEuclidTriple(m, n);
    if (res.triple) {
      setGeneratedTriple(res.triple);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          数学宝库 · 勾股数在线查询
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          勾股数速查表与在线验证生成器
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
          勾股数（毕达哥拉斯三元数）是指能满足 <code className="text-indigo-600 font-mono bg-indigo-50 px-1 py-0.5 rounded">a² + b² = c²</code> 的三个正整数组合。
          本模块支持常用经典勾股数检索、任意三数组合检验，以及基于欧几里得参数公式的无限生成。
        </p>
      </div>

      {/* Grid: 2 Interactive Mini-Tools (Validator & Generator) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool 1: 勾股数验证器 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
          <h3 className="font-bold text-slate-800 text-base mb-1 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            勾股数在线验证器 (Validator)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            输入任意三个正整数，系统将立即检测它们能否构成直角三角形。
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">边长 1</label>
              <input
                type="number"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                placeholder="例如 3"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">边长 2</label>
              <input
                type="number"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                placeholder="例如 4"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">边长 3 (最长边)</label>
              <input
                type="number"
                value={valC}
                onChange={(e) => setValC(e.target.value)}
                placeholder="例如 5"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleValidate}
            className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
          >
            立即验证三元数
          </button>

          {validationResult && (
            <div
              className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed ${
                validationResult.isValid
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {validationResult.isValid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>验证通过！是有效勾股数</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>验证不通过：非勾股数</span>
                  </>
                )}
              </div>
              <p>{validationResult.message}</p>
            </div>
          )}
        </div>

        {/* Tool 2: 欧几里得公式生成器 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
          <h3 className="font-bold text-slate-800 text-base mb-1 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-indigo-600" />
            欧几里得公式生成器 (Euclid's Formula)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            设定正整数 <code className="font-mono text-indigo-600">m &gt; n &gt; 0</code>，依据 <code className="font-mono text-indigo-600">a = m²-n², b = 2mn, c = m²+n²</code> 生成勾股数。
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">参数 m (较大数)</label>
              <input
                type="number"
                min="2"
                value={genM}
                onChange={(e) => setGenM(e.target.value)}
                placeholder="例如 3"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">参数 n (较小数)</label>
              <input
                type="number"
                min="1"
                value={genN}
                onChange={(e) => setGenN(e.target.value)}
                placeholder="例如 2"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
          >
            根据公式生成新勾股数
          </button>

          {generatedTriple && (
            <div className="mt-4 p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs">
              <span className="font-bold text-indigo-800 block mb-1">
                生成得到三元数: ({generatedTriple.a}, {generatedTriple.b}, {generatedTriple.c})
              </span>
              <div className="font-mono text-[11px] text-indigo-700 space-y-0.5">
                <div>a = {genM}² - {genN}² = {generatedTriple.a}</div>
                <div>b = 2 × {genM} × {genN} = {generatedTriple.b}</div>
                <div>c = {genM}² + {genN}² = {generatedTriple.c}</div>
                <div className="pt-1 font-sans text-indigo-600">
                  {generatedTriple.isPrimitive ? '★ 该组属于本原勾股数（三数互质）' : '该组可被因数约简'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Triples Quick Table Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-600" />
            常用经典勾股数检索表 ({filteredTriples.length} 组)
          </h3>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索边长，如 13、25..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
              />
            </div>

            {/* Filter Pill Buttons */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'all' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setFilterType('primitive')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'primitive' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                仅本原组
              </button>
              <button
                onClick={() => setFilterType('under50')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'under50' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                斜边 ≤ 50
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">序号</th>
                <th className="py-3 px-4">直角边 a</th>
                <th className="py-3 px-4">直角边 b</th>
                <th className="py-3 px-4 text-blue-700">斜边 c (最长)</th>
                <th className="py-3 px-4">平方和验证式</th>
                <th className="py-3 px-4">性质类型</th>
                <th className="py-3 px-4 text-right">快捷操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredTriples.map((t, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40 transition-colors group">
                  <td className="py-3 px-4 font-mono text-slate-400 font-medium">#{idx + 1}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{t.a}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{t.b}</td>
                  <td className="py-3 px-4 font-mono font-extrabold text-blue-700">{t.c}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {t.a}² + {t.b}² = {t.a * t.a} + {t.b * t.b} = {t.c * t.c}
                  </td>
                  <td className="py-3 px-4">
                    {t.isPrimitive ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
                        本原勾股数
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[10px]">
                        倍数派生组
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {onSelectTriple && (
                      <button
                        onClick={() => onSelectTriple(t.a, t.b)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 group-hover:underline cursor-pointer"
                      >
                        代入计算
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
