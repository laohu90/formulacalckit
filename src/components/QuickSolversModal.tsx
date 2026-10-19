import React, { useState } from 'react';
import { QuickSolverId } from '../types';
import { X, CheckCircle2, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';

interface QuickSolversModalProps {
  solverId: QuickSolverId | null;
  onClose: () => void;
  lang: 'en' | 'zh';
  subdomainUrl?: string;
}

// Utility to simplify radical: returns [coefficient, radicand]
function simplifyRadical(n: number): [number, number] {
  if (n <= 0 || !Number.isInteger(n)) return [1, n];
  let coef = 1;
  let rad = n;
  for (let i = 2; i * i <= rad; i++) {
    while (rad % (i * i) === 0) {
      coef *= i;
      rad /= i * i;
    }
  }
  return [coef, rad];
}

export const QuickSolversModal: React.FC<QuickSolversModalProps> = ({
  solverId,
  onClose,
  lang,
  subdomainUrl,
}) => {
  if (!solverId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h3 className="font-semibold text-slate-900 text-lg">
              {solverId === 'pythagorean' && (lang === 'en' ? 'Pythagorean Quick Solver' : '勾股定理快速求解')}
              {solverId === 'quadratic' && (lang === 'en' ? 'Quadratic Equation Solver' : '一元二次方程快速求解')}
              {solverId === 'circle' && (lang === 'en' ? 'Circle & Sphere Calculator' : '圆与球体快速计算')}
              {solverId === 'trigonometry' && (lang === 'en' ? 'Trigonometric Ratios' : '三角函数求解')}
              {solverId === 'ohms_law' && (lang === 'en' ? "Ohm's Law & Power Solver" : '欧姆定律与电功率求解')}
              {solverId === 'percentage' && (lang === 'en' ? 'Percentage & Change Calculator' : '百分比计算器')}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'en'
                ? 'Built-in interactive micro-solver on FormulaCalcKit hub'
                : 'FormulaCalcKit 主站内置实时求解器'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {solverId === 'pythagorean' && <PythagoreanQuickSolver lang={lang} />}
          {solverId === 'quadratic' && <QuadraticQuickSolver lang={lang} />}
          {solverId === 'circle' && <CircleQuickSolver lang={lang} />}
          {solverId === 'trigonometry' && <TrigQuickSolver lang={lang} />}
          {solverId === 'ohms_law' && <OhmsLawQuickSolver lang={lang} />}
          {solverId === 'percentage' && <PercentageQuickSolver lang={lang} />}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
          {subdomainUrl ? (
            <a
              href={subdomainUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              <span>{lang === 'en' ? 'Open Dedicated Full-Feature App' : '打开独立专属完整子站'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-slate-400">FormulaCalcKit Engine</span>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {lang === 'en' ? 'Done' : '完成'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- 1. Pythagorean Quick Solver --- */
function PythagoreanQuickSolver({ lang }: { lang: 'en' | 'zh' }) {
  const [a, setA] = useState<string>('3');
  const [b, setB] = useState<string>('4');
  const [c, setC] = useState<string>('');

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const numC = parseFloat(c);

  let resultText = '';
  let radicalText = '';
  let errorMsg = '';

  if (!c && !isNaN(numA) && !isNaN(numB) && numA > 0 && numB > 0) {
    const c2 = numA * numA + numB * numB;
    const cVal = Math.sqrt(c2);
    resultText = `c = ${cVal.toFixed(4).replace(/\.?0+$/, '')}`;
    if (Number.isInteger(c2)) {
      const [coef, rad] = simplifyRadical(c2);
      radicalText = rad === 1 ? `${coef}` : coef === 1 ? `√${rad}` : `${coef}√${rad}`;
    }
  } else if (!a && !isNaN(numB) && !isNaN(numC) && numC > 0 && numB > 0) {
    if (numC <= numB) {
      errorMsg = lang === 'en' ? 'Hypotenuse c must be greater than leg b' : '斜边 c 必须大于直角边 b';
    } else {
      const a2 = numC * numC - numB * numB;
      const aVal = Math.sqrt(a2);
      resultText = `a = ${aVal.toFixed(4).replace(/\.?0+$/, '')}`;
      if (Number.isInteger(a2)) {
        const [coef, rad] = simplifyRadical(a2);
        radicalText = rad === 1 ? `${coef}` : coef === 1 ? `√${rad}` : `${coef}√${rad}`;
      }
    }
  } else if (!b && !isNaN(numA) && !isNaN(numC) && numC > 0 && numA > 0) {
    if (numC <= numA) {
      errorMsg = lang === 'en' ? 'Hypotenuse c must be greater than leg a' : '斜边 c 必须大于直角边 a';
    } else {
      const b2 = numC * numC - numA * numA;
      const bVal = Math.sqrt(b2);
      resultText = `b = ${bVal.toFixed(4).replace(/\.?0+$/, '')}`;
      if (Number.isInteger(b2)) {
        const [coef, rad] = simplifyRadical(b2);
        radicalText = rad === 1 ? `${coef}` : coef === 1 ? `√${rad}` : `${coef}√${rad}`;
      }
    }
  } else {
    errorMsg = lang === 'en' ? 'Fill any 2 sides to calculate the 3rd side' : '请填写任意 2 条边长，留空 1 条计算目标边';
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Leg a' : '直角边 a'}
          </label>
          <input
            type="number"
            step="any"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="e.g. 3"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Leg b' : '直角边 b'}
          </label>
          <input
            type="number"
            step="any"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="e.g. 4"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Hypotenuse c' : '斜边 c'}
          </label>
          <input
            type="number"
            step="any"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder={lang === 'en' ? 'Leave blank' : '留空求解'}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {resultText && (
        <div className="p-4 bg-blue-50/70 border border-blue-200/70 rounded-xl space-y-1">
          <div className="text-xs font-medium text-blue-700">
            {lang === 'en' ? 'Solution Result:' : '计算结果：'}
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">{resultText}</div>
          {radicalText && (
            <div className="text-sm text-slate-600">
              {lang === 'en' ? 'Exact radical form: ' : '最简根号形式：'}
              <span className="font-semibold text-blue-900">{radicalText}</span>
            </div>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}

/* --- 2. Quadratic Quick Solver --- */
function QuadraticQuickSolver({ lang }: { lang: 'en' | 'zh' }) {
  const [a, setA] = useState<string>('1');
  const [b, setB] = useState<string>('-5');
  const [c, setC] = useState<string>('6');

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const numC = parseFloat(c);

  let solution = null;
  if (!isNaN(numA) && !isNaN(numB) && !isNaN(numC)) {
    if (numA === 0) {
      solution = {
        error: lang === 'en' ? 'Coefficient a cannot be 0 in a quadratic equation.' : '一元二次方程中 a 不能为 0。',
      };
    } else {
      const delta = numB * numB - 4 * numA * numC;
      const vertexX = -numB / (2 * numA);
      const vertexY = numA * vertexX * vertexX + numB * vertexX + numC;

      if (delta > 0) {
        const x1 = (-numB + Math.sqrt(delta)) / (2 * numA);
        const x2 = (-numB - Math.sqrt(delta)) / (2 * numA);
        solution = {
          type: 'two_real',
          delta,
          x1: x1.toFixed(4).replace(/\.?0+$/, ''),
          x2: x2.toFixed(4).replace(/\.?0+$/, ''),
          vertex: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
        };
      } else if (delta === 0) {
        const x = -numB / (2 * numA);
        solution = {
          type: 'one_real',
          delta: 0,
          x: x.toFixed(4).replace(/\.?0+$/, ''),
          vertex: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
        };
      } else {
        const real = (-numB / (2 * numA)).toFixed(3);
        const imag = (Math.sqrt(-delta) / (2 * numA)).toFixed(3);
        solution = {
          type: 'complex',
          delta,
          roots: `${real} ± ${imag}i`,
          vertex: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
        };
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-slate-700 font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200 justify-center">
        <span>{a || 'a'}x² + {b || 'b'}x + {c || 'c'} = 0</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Coeff a' : '系数 a'}
          </label>
          <input
            type="number"
            step="any"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Coeff b' : '系数 b'}
          </label>
          <input
            type="number"
            step="any"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Coeff c' : '常数 c'}
          </label>
          <input
            type="number"
            step="any"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {solution && !('error' in solution) && (
        <div className="p-4 bg-blue-50/70 border border-blue-200/70 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-blue-800">
            <span>
              {lang === 'en' ? 'Discriminant Δ = ' : '判别式 Δ = '}
              <span className="font-semibold">{solution.delta}</span>
            </span>
            <span>
              {lang === 'en' ? 'Vertex: ' : '抛物线顶点: '}
              <span className="font-semibold">{solution.vertex}</span>
            </span>
          </div>
          <div className="pt-1">
            {solution.type === 'two_real' && (
              <div className="text-lg font-bold text-slate-900">
                x₁ = {solution.x1}, x₂ = {solution.x2}
              </div>
            )}
            {solution.type === 'one_real' && (
              <div className="text-lg font-bold text-slate-900">
                x₁ = x₂ = {solution.x} ({lang === 'en' ? 'Repeated Root' : '重根'})
              </div>
            )}
            {solution.type === 'complex' && (
              <div className="text-lg font-bold text-slate-900">
                x = {solution.roots} ({lang === 'en' ? 'Complex Conjugate' : '共轭复根'})
              </div>
            )}
          </div>
        </div>
      )}

      {solution && 'error' in solution && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
          {solution.error}
        </div>
      )}
    </div>
  );
}

/* --- 3. Circle Quick Solver --- */
function CircleQuickSolver({ lang }: { lang: 'en' | 'zh' }) {
  const [radius, setRadius] = useState<string>('5');
  const r = parseFloat(radius);

  let diameter = 0;
  let circum = 0;
  let area = 0;
  let sphereArea = 0;
  let sphereVol = 0;

  if (!isNaN(r) && r > 0) {
    diameter = 2 * r;
    circum = 2 * Math.PI * r;
    area = Math.PI * r * r;
    sphereArea = 4 * Math.PI * r * r;
    sphereVol = (4 / 3) * Math.PI * Math.pow(r, 3);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          {lang === 'en' ? 'Radius (r)' : '半径 (r)'}
        </label>
        <input
          type="number"
          step="any"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="e.g. 5"
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {r > 0 && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">{lang === 'en' ? 'Diameter (2r)' : '直径 (2r)'}</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">{diameter.toFixed(2)}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">{lang === 'en' ? 'Circumference (2πr)' : '圆周长 (2πr)'}</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">{circum.toFixed(3)}</div>
          </div>
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/70">
            <div className="text-xs text-blue-700">{lang === 'en' ? 'Circle Area (πr²)' : '圆面积 (πr²)'}</div>
            <div className="text-base font-bold text-blue-950 mt-0.5">{area.toFixed(3)}</div>
          </div>
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/70">
            <div className="text-xs text-blue-700">{lang === 'en' ? 'Sphere Volume (⁴⁄₃πr³)' : '球体体积 (⁴⁄₃πr³)'}</div>
            <div className="text-base font-bold text-blue-950 mt-0.5">{sphereVol.toFixed(3)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- 4. Trig Quick Solver --- */
function TrigQuickSolver({ lang }: { lang: 'en' | 'zh' }) {
  const [angle, setAngle] = useState<string>('30');
  const [unit, setUnit] = useState<'deg' | 'rad'>('deg');

  const val = parseFloat(angle);
  let rad = 0;
  if (!isNaN(val)) {
    rad = unit === 'deg' ? (val * Math.PI) / 180 : val;
  }

  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);
  const tanVal = Math.abs(cosVal) < 1e-12 ? Infinity : Math.tan(rad);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Angle θ' : '角度 / 弧度 θ'}
          </label>
          <input
            type="number"
            step="any"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-32">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Unit' : '单位'}
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'deg' | 'rad')}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="deg">{lang === 'en' ? 'Degrees (°)' : '角度 (°)'}</option>
            <option value="rad">{lang === 'en' ? 'Radians (rad)' : '弧度 (rad)'}</option>
          </select>
        </div>
      </div>

      {!isNaN(val) && (
        <div className="grid grid-cols-3 gap-3 pt-1">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div className="text-xs text-slate-500">sin(θ)</div>
            <div className="text-lg font-bold text-slate-900 mt-0.5">
              {Math.abs(sinVal) < 1e-10 ? '0' : sinVal.toFixed(4)}
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div className="text-xs text-slate-500">cos(θ)</div>
            <div className="text-lg font-bold text-slate-900 mt-0.5">
              {Math.abs(cosVal) < 1e-10 ? '0' : cosVal.toFixed(4)}
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div className="text-xs text-slate-500">tan(θ)</div>
            <div className="text-lg font-bold text-slate-900 mt-0.5">
              {tanVal === Infinity ? 'Undefined' : Math.abs(tanVal) < 1e-10 ? '0' : tanVal.toFixed(4)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- 5. Ohm's Law Solver --- */
function OhmsLawQuickSolver({ lang }: { lang: 'en' | 'zh' }) {
  const [voltage, setVoltage] = useState<string>('12');
  const [current, setCurrent] = useState<string>('2');
  const [resistance, setResistance] = useState<string>('');

  const v = parseFloat(voltage);
  const i = parseFloat(current);
  const r = parseFloat(resistance);

  let resultV = v;
  let resultI = i;
  let resultR = r;
  let power = 0;

  if (!isNaN(v) && !isNaN(i) && !resistance) {
    resultR = i !== 0 ? v / i : 0;
    power = v * i;
  } else if (!isNaN(v) && !isNaN(r) && !current) {
    resultI = r !== 0 ? v / r : 0;
    power = resultI * v;
  } else if (!isNaN(i) && !isNaN(r) && !voltage) {
    resultV = i * r;
    power = i * i * r;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Voltage V (Volts)' : '电压 V (伏特)'}
          </label>
          <input
            type="number"
            step="any"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            placeholder="e.g. 12"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Current I (Amps)' : '电流 I (安培)'}
          </label>
          <input
            type="number"
            step="any"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="e.g. 2"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Resistance R (Ω)' : '电阻 R (欧姆)'}
          </label>
          <input
            type="number"
            step="any"
            value={resistance}
            onChange={(e) => setResistance(e.target.value)}
            placeholder={lang === 'en' ? 'Leave blank' : '留空求解'}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="p-4 bg-blue-50/70 border border-blue-200/70 rounded-xl space-y-1">
        <div className="text-xs text-blue-700 font-medium">
          {lang === 'en' ? 'Computed Circuit Values:' : '计算电路参量：'}
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1 text-sm font-semibold text-slate-800">
          <div>{lang === 'en' ? 'Resistance: ' : '电阻：'}{resultR ? `${resultR.toFixed(2)} Ω` : '--'}</div>
          <div>{lang === 'en' ? 'Dissipated Power: ' : '电功率：'}{power ? `${power.toFixed(2)} W` : '--'}</div>
        </div>
      </div>
    </div>
  );
}

/* --- 6. Percentage Quick Solver --- */
function PercentageQuickSolver({ lang }: { lang: 'en' | 'zh' }) {
  const [val1, setVal1] = useState<string>('80');
  const [val2, setVal2] = useState<string>('100');

  const v1 = parseFloat(val1);
  const v2 = parseFloat(val2);

  let changePercent = 0;
  let diff = 0;

  if (!isNaN(v1) && !isNaN(v2) && v1 !== 0) {
    diff = v2 - v1;
    changePercent = (diff / Math.abs(v1)) * 100;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'Initial Value (V₁)' : '初始值 (V₁)'}
          </label>
          <input
            type="number"
            step="any"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            {lang === 'en' ? 'New Value (V₂)' : '变化后值 (V₂)'}
          </label>
          <input
            type="number"
            step="any"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {!isNaN(v1) && !isNaN(v2) && v1 !== 0 && (
        <div className="p-4 bg-blue-50/70 border border-blue-200/70 rounded-xl space-y-1">
          <div className="text-xs text-blue-700 font-medium">
            {lang === 'en' ? 'Percentage Change:' : '变化率：'}
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {changePercent >= 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`}
          </div>
          <div className="text-xs text-slate-600">
            {lang === 'en'
              ? `Absolute difference: ${diff >= 0 ? `+${diff}` : diff}`
              : `绝对变化数值: ${diff >= 0 ? `+${diff}` : diff}`}
          </div>
        </div>
      )}
    </div>
  );
}
