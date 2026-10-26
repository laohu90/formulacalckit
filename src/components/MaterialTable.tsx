import React, { useState, useMemo, useEffect } from 'react';
import { Substance, SubstanceState, SubstanceCategory } from '../types/density';
import { DEFAULT_SUBSTANCES } from '../data/materials';
import { formatNumber } from '../utils/units';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Search, Plus, Trash2 } from 'lucide-react';

interface MaterialTableProps {
  lang: Language;
  onSelectMaterial: (sub: Substance) => void;
  onSimulateBuoyancy: (sub: Substance) => void;
}

export const MaterialTable: React.FC<MaterialTableProps> = ({
  lang,
  onSelectMaterial,
  onSimulateBuoyancy,
}) => {
  const t = TRANSLATIONS[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [customSubstances, setCustomSubstances] = useState<Substance[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New substance form state
  const [newName, setNewName] = useState('');
  const [newDensity, setNewDensity] = useState('');
  const [newCategory, setNewCategory] = useState<SubstanceCategory>('metal');
  const [newState, setNewState] = useState<SubstanceState>('solid');
  const [newDesc, setNewDesc] = useState('');

  // Load custom substances from localStorage with disaster-recovery try/catch
  useEffect(() => {
    try {
      const saved = localStorage.getItem('density_custom_materials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCustomSubstances(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read custom materials from storage:', e);
    }
  }, []);

  const saveCustomSubstances = (items: Substance[]) => {
    setCustomSubstances(items);
    try {
      localStorage.setItem('density_custom_materials', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save to storage:', e);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const dVal = parseFloat(newDensity);
    if (!newName.trim() || isNaN(dVal) || dVal <= 0) return;

    const newSub: Substance = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      nameEn: newName.trim(),
      state: newState,
      category: newCategory,
      density: dVal,
      densitySI: dVal * 1000,
      condition: lang === 'en' ? 'Custom Measurement' : '自定义测试数据',
      description: newDesc.trim() || (lang === 'en' ? 'User-defined material' : '用户自定义测量物质'),
      color: '#6366F1',
      isCustom: true,
    };

    saveCustomSubstances([newSub, ...customSubstances]);
    setShowAddModal(false);
    setNewName('');
    setNewDensity('');
    setNewDesc('');
  };

  const handleDeleteCustom = (id: string) => {
    saveCustomSubstances(customSubstances.filter((s) => s.id !== id));
  };

  const allSubstances = useMemo(() => {
    return [...customSubstances, ...DEFAULT_SUBSTANCES];
  }, [customSubstances]);

  const filteredList = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return allSubstances
      .filter((sub) => {
        const matchesSearch =
          sub.name.toLowerCase().includes(q) ||
          sub.nameEn.toLowerCase().includes(q) ||
          (sub.formula && sub.formula.toLowerCase().includes(q));

        if (!matchesSearch) return false;

        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'solid') return sub.state === 'solid';
        if (selectedCategory === 'liquid') return sub.state === 'liquid';
        if (selectedCategory === 'gas') return sub.state === 'gas';
        if (selectedCategory === 'custom') return sub.isCustom;
        if (selectedCategory === 'float') return sub.density < 1.0;
        if (selectedCategory === 'sink') return sub.density > 1.0;
        return sub.category === selectedCategory;
      })
      .sort((a, b) => {
        return sortOrder === 'desc' ? b.density - a.density : a.density - b.density;
      });
  }, [allSubstances, searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t.matDbTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.matDbDesc}</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addCustomBtn}</span>
          </button>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-1">
          <div className="relative flex-1">
            <label htmlFor="material-search-input" className="sr-only">
              {t.searchPlaceholder}
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="material-search-input"
              name="material-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              aria-label={`${t.sortByDensity}: ${sortOrder === 'desc' ? t.sortDesc : t.sortAsc}`}
              className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>{t.sortByDensity}: {sortOrder === 'desc' ? t.sortDesc : t.sortAsc}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'solid', label: t.filterSolid },
            { id: 'liquid', label: t.filterLiquid },
            { id: 'gas', label: t.filterGas },
            { id: 'float', label: t.filterFloat },
            { id: 'sink', label: t.filterSink },
            { id: 'custom', label: `${t.filterCustom} (${customSubstances.length})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Material Table Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-2xs uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">{t.colName}</th>
                <th className="py-2.5 px-4 font-semibold">{t.colState}</th>
                <th className="py-2.5 px-4 font-semibold">{t.colDensityGcm3}</th>
                <th className="py-2.5 px-4 font-semibold">{t.colDensitySI}</th>
                <th className="py-2.5 px-4 font-semibold">{t.colWaterFloat}</th>
                <th className="py-2.5 px-4 font-semibold">{t.colCondition}</th>
                <th className="py-2.5 px-4 font-semibold text-right">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredList.map((sub) => {
                const displayName = lang === 'en' ? sub.nameEn : sub.name;
                const isWaterFloat = sub.density < 1.0;
                const isWaterEqual = sub.density === 1.0;

                const stateText =
                  sub.state === 'solid'
                    ? lang === 'en'
                      ? 'Solid'
                      : '固态'
                    : sub.state === 'liquid'
                    ? lang === 'en'
                      ? 'Liquid'
                      : '液态'
                    : lang === 'en'
                    ? 'Gas'
                    : '气态';

                return (
                  <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Name */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-slate-300"
                          style={{ backgroundColor: sub.color }}
                        />
                        <div>
                          <span className="font-bold text-slate-900">{displayName}</span>
                          {sub.formula && (
                            <span className="ml-1.5 text-2xs font-mono text-slate-400">
                              [{sub.formula}]
                            </span>
                          )}
                          {sub.isCustom && (
                            <span className="ml-1.5 text-2xs font-mono text-indigo-600 font-bold">
                              · {lang === 'en' ? 'Custom' : '自定义'}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* State */}
                    <td className="py-2.5 px-4 text-slate-600 font-medium">
                      {stateText}
                    </td>

                    {/* Density in g/cm3 */}
                    <td className="py-2.5 px-4 font-mono font-bold text-blue-700 tabular-nums">
                      {formatNumber(sub.density, 4)}
                    </td>

                    {/* Density in kg/m3 */}
                    <td className="py-2.5 px-4 font-mono font-semibold text-slate-700 tabular-nums">
                      {formatNumber(sub.densitySI, 2)}
                    </td>

                    {/* Float in water */}
                    <td className="py-2.5 px-4">
                      {isWaterEqual ? (
                        <span className="text-2xs font-semibold text-teal-700">
                          {lang === 'en' ? 'Suspended' : '悬浮'}
                        </span>
                      ) : isWaterFloat ? (
                        <span className="text-2xs font-semibold text-sky-700">
                          {lang === 'en' ? 'Floats' : '漂浮'}
                        </span>
                      ) : (
                        <span className="text-2xs font-medium text-slate-500">
                          {lang === 'en' ? 'Sinks' : '沉底'}
                        </span>
                      )}
                    </td>

                    {/* Description & Condition */}
                    <td className="py-2.5 px-4 max-w-xs text-slate-500">
                      <div className="truncate font-sans" title={lang === 'en' && sub.descriptionEn ? sub.descriptionEn : sub.description}>
                        {lang === 'en' && sub.descriptionEn ? sub.descriptionEn : sub.description}
                      </div>
                      <div className="text-slate-400 font-mono text-3xs">
                        {lang === 'en' && sub.conditionEn ? sub.conditionEn : sub.condition}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectMaterial(sub)}
                          className="px-2 py-1 text-2xs font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          {t.useInCalc}
                        </button>
                        <button
                          onClick={() => onSimulateBuoyancy(sub)}
                          className="px-2 py-1 text-2xs font-medium rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          {t.buoyancyTest}
                        </button>
                        {sub.isCustom && (
                          <button
                            onClick={() => handleDeleteCustom(sub.id)}
                            className="p-1 text-red-500 hover:text-red-700 rounded"
                            title={t.deleteCustom}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredList.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-xs">
            {t.noMatFound}
          </div>
        )}
      </div>

      {/* Add Custom Substance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4">{t.addModalTitle}</h3>
            <form onSubmit={handleAddCustom} className="space-y-4">
              <div>
                <label htmlFor="modal-mat-name" className="block text-2xs font-semibold text-slate-700 mb-1">
                  {t.modalMatName}
                </label>
                <input
                  id="modal-mat-name"
                  name="matName"
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Carbon Fiber Composite' : '例如: 某新型碳纤维复合材料'}
                  aria-label={t.modalMatName}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-mat-density" className="block text-2xs font-semibold text-slate-700 mb-1">
                    {t.modalDensity}
                  </label>
                  <input
                    id="modal-mat-density"
                    name="matDensity"
                    type="number"
                    step="any"
                    required
                    value={newDensity}
                    onChange={(e) => setNewDensity(e.target.value)}
                    placeholder="e.g. 1.45"
                    aria-label={t.modalDensity}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="modal-mat-state" className="block text-2xs font-semibold text-slate-700 mb-1">
                    {t.modalState}
                  </label>
                  <select
                    id="modal-mat-state"
                    name="matState"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value as SubstanceState)}
                    aria-label={t.modalState}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="solid">{lang === 'en' ? 'Solid' : '固态'}</option>
                    <option value="liquid">{lang === 'en' ? 'Liquid' : '液态'}</option>
                    <option value="gas">{lang === 'en' ? 'Gas' : '气态'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="modal-mat-note" className="block text-2xs font-semibold text-slate-700 mb-1">
                  {t.modalNote}
                </label>
                <input
                  id="modal-mat-note"
                  name="matNote"
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder={lang === 'en' ? 'Lab measurement note' : '实验室测量备注'}
                  aria-label={t.modalNote}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  {t.modalCancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs"
                >
                  {t.modalSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
