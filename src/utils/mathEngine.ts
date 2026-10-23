/**
 * FormulaCalcKit Precision Mathematical & Scientific Engine
 */

export interface RadicalResult {
  coefficient: number;
  radicand: number;
  formatted: string;
}

/**
 * Simplifies a square root into simplest radical form: √n = a√b
 */
export function simplifyRadical(n: number): RadicalResult {
  if (n <= 0 || !Number.isInteger(n)) {
    return {
      coefficient: 1,
      radicand: n,
      formatted: n >= 0 ? `√${n}` : 'Invalid',
    };
  }

  let coef = 1;
  let rad = n;
  for (let i = 2; i * i <= rad; i++) {
    while (rad % (i * i) === 0) {
      coef *= i;
      rad /= i * i;
    }
  }

  let formatted = '';
  if (rad === 1) {
    formatted = `${coef}`;
  } else if (coef === 1) {
    formatted = `√${rad}`;
  } else {
    formatted = `${coef}√${rad}`;
  }

  return { coefficient: coef, radicand: rad, formatted };
}

/**
 * Solves right triangle given any 2 sides (Pythagorean Theorem: a² + b² = c²)
 */
export interface PythagoreanSolution {
  solvedSide: 'c' | 'a' | 'b';
  a: number;
  b: number;
  c: number;
  radical: string;
  decimal: number;
  area: number;
  perimeter: number;
  altitude: number;
  angleAdeg: number;
  angleBdeg: number;
  derivationSteps: Array<{ titleZh: string; titleEn: string; math: string; noteZh: string; noteEn: string }>;
}

export function solvePythagorean(
  sideA?: number,
  sideB?: number,
  sideC?: number
): { success: boolean; errorZh?: string; errorEn?: string; data?: PythagoreanSolution } {
  if (sideA && sideB && !sideC) {
    if (sideA <= 0 || sideB <= 0) {
      return { success: false, errorZh: '边长必须为正数', errorEn: 'Side lengths must be positive numbers' };
    }
    const c2 = sideA * sideA + sideB * sideB;
    const cVal = Math.sqrt(c2);
    const rad = simplifyRadical(Math.round(c2 * 10000) / 10000);
    const area = 0.5 * sideA * sideB;
    const perimeter = sideA + sideB + cVal;
    const altitude = (sideA * sideB) / cVal;
    const angleAdeg = (Math.asin(sideA / cVal) * 180) / Math.PI;
    const angleBdeg = 90 - angleAdeg;

    return {
      success: true,
      data: {
        solvedSide: 'c',
        a: sideA,
        b: sideB,
        c: cVal,
        radical: rad.formatted,
        decimal: cVal,
        area,
        perimeter,
        altitude,
        angleAdeg,
        angleBdeg,
        derivationSteps: [
          {
            titleZh: '1. 确定求解公式',
            titleEn: '1. Identify the Formula',
            math: 'c^2 = a^2 + b^2 \\implies c = \\sqrt{a^2 + b^2}',
            noteZh: '根据勾股定理，直角三角形斜边的平方等于两直角边平方之和。',
            noteEn: 'According to the Pythagorean Theorem, the square of the hypotenuse equals the sum of squares of the legs.',
          },
          {
            titleZh: '2. 代入已知直角边长',
            titleEn: '2. Substitute Known Dimensions',
            math: `c = \\sqrt{${sideA}^2 + ${sideB}^2}`,
            noteZh: `代入 a = ${sideA}, b = ${sideB}`,
            noteEn: `Substitute a = ${sideA}, b = ${sideB}`,
          },
          {
            titleZh: '3. 计算平方和与被开方数',
            titleEn: '3. Compute Squares & Radicand',
            math: `c = \\sqrt{${(sideA * sideA).toFixed(4).replace(/\.?0+$/, '')} + ${(sideB * sideB).toFixed(4).replace(/\.?0+$/, '')}} = \\sqrt{${c2.toFixed(4).replace(/\.?0+$/, '')}}`,
            noteZh: `直角边平方和为 ${c2.toFixed(4).replace(/\.?0+$/, '')}`,
            noteEn: `Sum of squares of legs is ${c2.toFixed(4).replace(/\.?0+$/, '')}`,
          },
          {
            titleZh: '4. 化简最简二次根式',
            titleEn: '4. Radical Factorization & Simplification',
            math: `c = ${rad.formatted} \\approx ${cVal.toFixed(4)}`,
            noteZh: `提取完全平方因子，最简二次根式为 ${rad.formatted}`,
            noteEn: `Extract perfect square factors to obtain simplest radical form ${rad.formatted}`,
          },
        ],
      },
    };
  }

  if (sideC && sideB && !sideA) {
    if (sideC <= 0 || sideB <= 0) {
      return { success: false, errorZh: '边长必须为正数', errorEn: 'Side lengths must be positive numbers' };
    }
    if (sideC <= sideB) {
      return { success: false, errorZh: '斜边 c 必须大于直角边 b', errorEn: 'Hypotenuse c must be strictly greater than leg b' };
    }
    const a2 = sideC * sideC - sideB * sideB;
    const aVal = Math.sqrt(a2);
    const rad = simplifyRadical(Math.round(a2 * 10000) / 10000);
    const area = 0.5 * aVal * sideB;
    const perimeter = aVal + sideB + sideC;
    const altitude = (aVal * sideB) / sideC;
    const angleAdeg = (Math.asin(aVal / sideC) * 180) / Math.PI;
    const angleBdeg = 90 - angleAdeg;

    return {
      success: true,
      data: {
        solvedSide: 'a',
        a: aVal,
        b: sideB,
        c: sideC,
        radical: rad.formatted,
        decimal: aVal,
        area,
        perimeter,
        altitude,
        angleAdeg,
        angleBdeg,
        derivationSteps: [
          {
            titleZh: '1. 确定直角边求解公式',
            titleEn: '1. Identify the Formula',
            math: 'a^2 = c^2 - b^2 \\implies a = \\sqrt{c^2 - b^2}',
            noteZh: '斜边平方减去已知直角边平方',
            noteEn: 'Subtract square of leg b from square of hypotenuse c',
          },
          {
            titleZh: '2. 代入已知数值',
            titleEn: '2. Substitute Dimensions',
            math: `a = \\sqrt{${sideC}^2 - ${sideB}^2}`,
            noteZh: `代入 c = ${sideC}, b = ${sideB}`,
            noteEn: `Substitute c = ${sideC}, b = ${sideB}`,
          },
          {
            titleZh: '3. 化简最简二次根式',
            titleEn: '3. Simplify Radical',
            math: `a = \\sqrt{${a2.toFixed(4).replace(/\.?0+$/, '')}} = ${rad.formatted} \\approx ${aVal.toFixed(4)}`,
            noteZh: `直角边 a 最简形式为 ${rad.formatted}`,
            noteEn: `Leg a in simplest form is ${rad.formatted}`,
          },
        ],
      },
    };
  }

  if (sideC && sideA && !sideB) {
    if (sideC <= 0 || sideA <= 0) {
      return { success: false, errorZh: '边长必须为正数', errorEn: 'Side lengths must be positive numbers' };
    }
    if (sideC <= sideA) {
      return { success: false, errorZh: '斜边 c 必须大于直角边 a', errorEn: 'Hypotenuse c must be strictly greater than leg a' };
    }
    const b2 = sideC * sideC - sideA * sideA;
    const bVal = Math.sqrt(b2);
    const rad = simplifyRadical(Math.round(b2 * 10000) / 10000);
    const area = 0.5 * sideA * bVal;
    const perimeter = sideA + bVal + sideC;
    const altitude = (sideA * bVal) / sideC;
    const angleAdeg = (Math.asin(sideA / sideC) * 180) / Math.PI;
    const angleBdeg = 90 - angleAdeg;

    return {
      success: true,
      data: {
        solvedSide: 'b',
        a: sideA,
        b: bVal,
        c: sideC,
        radical: rad.formatted,
        decimal: bVal,
        area,
        perimeter,
        altitude,
        angleAdeg,
        angleBdeg,
        derivationSteps: [
          {
            titleZh: '1. 确定直角边求解公式',
            titleEn: '1. Identify the Formula',
            math: 'b^2 = c^2 - a^2 \\implies b = \\sqrt{c^2 - a^2}',
            noteZh: '斜边平方减去已知直角边平方',
            noteEn: 'Subtract square of leg a from square of hypotenuse c',
          },
          {
            titleZh: '2. 代入已知数值',
            titleEn: '2. Substitute Dimensions',
            math: `b = \\sqrt{${sideC}^2 - ${sideA}^2}`,
            noteZh: `代入 c = ${sideC}, a = ${sideA}`,
            noteEn: `Substitute c = ${sideC}, a = ${sideA}`,
          },
          {
            titleZh: '3. 化简最简二次根式',
            titleEn: '3. Simplify Radical',
            math: `b = \\sqrt{${b2.toFixed(4).replace(/\.?0+$/, '')}} = ${rad.formatted} \\approx ${bVal.toFixed(4)}`,
            noteZh: `直角边 b 最简形式为 ${rad.formatted}`,
            noteEn: `Leg b in simplest form is ${rad.formatted}`,
          },
        ],
      },
    };
  }

  return {
    success: false,
    errorZh: '请填写任意 2 条边长，留空 1 条计算目标边',
    errorEn: 'Fill in any 2 sides and leave 1 side blank to calculate',
  };
}

/**
 * Solves standard quadratic equation ax² + bx + c = 0
 */
export interface QuadraticSolution {
  a: number;
  b: number;
  c: number;
  delta: number;
  type: 'two_distinct_real' | 'single_real' | 'complex';
  x1: string;
  x2: string;
  vertexH: number;
  vertexK: number;
  vertexForm: string;
  vietaSum: string;
  vietaProd: string;
  steps: Array<{ titleZh: string; titleEn: string; math: string }>;
}

export function solveQuadratic(
  a: number,
  b: number,
  c: number
): { success: boolean; errorZh?: string; errorEn?: string; data?: QuadraticSolution } {
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    return { success: false, errorZh: '请输入有效的数值系数', errorEn: 'Please enter valid numerical coefficients' };
  }
  if (a === 0) {
    return { success: false, errorZh: '二次项系数 a 不能为 0（否则为一次方程）', errorEn: 'Coefficient a cannot be 0 in a quadratic equation' };
  }

  const delta = b * b - 4 * a * c;
  const vertexH = -b / (2 * a);
  const vertexK = c - (b * b) / (4 * a);

  const hStr = vertexH >= 0 ? `- ${vertexH.toFixed(2)}` : `+ ${Math.abs(vertexH).toFixed(2)}`;
  const kStr = vertexK >= 0 ? `+ ${vertexK.toFixed(2)}` : `- ${Math.abs(vertexK).toFixed(2)}`;
  const aPrefix = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const vertexForm = `${aPrefix}(x ${hStr})² ${kStr}`;

  const vietaSum = (-b / a).toFixed(4).replace(/\.?0+$/, '');
  const vietaProd = (c / a).toFixed(4).replace(/\.?0+$/, '');

  let type: 'two_distinct_real' | 'single_real' | 'complex' = 'two_distinct_real';
  let x1 = '';
  let x2 = '';
  const steps: Array<{ titleZh: string; titleEn: string; math: string }> = [
    {
      titleZh: '1. 计算判别式 Δ',
      titleEn: '1. Compute Discriminant Δ',
      math: `\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${delta.toFixed(4).replace(/\.?0+$/, '')}`,
    },
  ];

  if (delta > 0) {
    type = 'two_distinct_real';
    const sqrtDelta = Math.sqrt(delta);
    const r1 = (-b + sqrtDelta) / (2 * a);
    const r2 = (-b - sqrtDelta) / (2 * a);
    x1 = r1.toFixed(4).replace(/\.?0+$/, '');
    x2 = r2.toFixed(4).replace(/\.?0+$/, '');
    steps.push({
      titleZh: '2. Δ > 0，存在两个不相等的实数根',
      titleEn: '2. Δ > 0: Two Distinct Real Roots',
      math: `x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{-(${b}) \\pm \\sqrt{${delta.toFixed(2)}}}{2(${a})}`,
    });
    steps.push({
      titleZh: '3. 求得最终两根',
      titleEn: '3. Final Real Roots',
      math: `x_1 = ${x1}, \\quad x_2 = ${x2}`,
    });
  } else if (delta === 0) {
    type = 'single_real';
    const r = -b / (2 * a);
    x1 = r.toFixed(4).replace(/\.?0+$/, '');
    x2 = x1;
    steps.push({
      titleZh: '2. Δ = 0，存在两个相等的实数根（重根）',
      titleEn: '2. Δ = 0: Single Repeated Real Root',
      math: `x_1 = x_2 = -\\frac{b}{2a} = -\\frac{${b}}{2(${a})} = ${x1}`,
    });
  } else {
    type = 'complex';
    const realPart = (-b / (2 * a)).toFixed(4).replace(/\.?0+$/, '');
    const imagPart = (Math.sqrt(-delta) / (2 * Math.abs(a))).toFixed(4).replace(/\.?0+$/, '');
    x1 = `${realPart} + ${imagPart}i`;
    x2 = `${realPart} - ${imagPart}i`;
    steps.push({
      titleZh: '2. Δ < 0，无实数根，存在共轭复数虚根',
      titleEn: '2. Δ < 0: Complex Conjugate Roots',
      math: `x = \\frac{-(${b}) \\pm i\\sqrt{${(-delta).toFixed(2)}}}{2(${a})} = ${realPart} \\pm ${imagPart}i`,
    });
  }

  return {
    success: true,
    data: {
      a,
      b,
      c,
      delta,
      type,
      x1,
      x2,
      vertexH,
      vertexK,
      vertexForm,
      vietaSum,
      vietaProd,
      steps,
    },
  };
}

/**
 * Euclidean algorithm step data
 */
export interface EuclideanStep {
  step: number;
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
}

export function solveGcdLcm(
  valA: number,
  valB: number
): {
  gcd: number;
  lcm: number;
  steps: EuclideanStep[];
  primeFactorsA: Record<number, number>;
  primeFactorsB: Record<number, number>;
} {
  let a = Math.abs(Math.round(valA));
  let b = Math.abs(Math.round(valB));
  if (a < b) {
    const temp = a;
    a = b;
    b = temp;
  }

  const steps: EuclideanStep[] = [];
  let stepCount = 1;
  let r = 0;
  let tempA = a;
  let tempB = b;

  if (tempB === 0) {
    return {
      gcd: tempA,
      lcm: 0,
      steps: [{ step: 1, dividend: tempA, divisor: 0, quotient: 0, remainder: 0 }],
      primeFactorsA: getPrimeFactors(a),
      primeFactorsB: getPrimeFactors(b),
    };
  }

  while (tempB !== 0) {
    const q = Math.floor(tempA / tempB);
    r = tempA % tempB;
    steps.push({
      step: stepCount++,
      dividend: tempA,
      divisor: tempB,
      quotient: q,
      remainder: r,
    });
    tempA = tempB;
    tempB = r;
  }

  const gcd = tempA;
  const lcm = gcd !== 0 ? (a * b) / gcd : 0;

  return {
    gcd,
    lcm,
    steps,
    primeFactorsA: getPrimeFactors(valA),
    primeFactorsB: getPrimeFactors(valB),
  };
}

export function getPrimeFactors(n: number): Record<number, number> {
  const factors: Record<number, number> = {};
  let num = Math.abs(Math.round(n));
  if (num <= 1) return factors;

  for (let i = 2; i * i <= num; i++) {
    while (num % i === 0) {
      factors[i] = (factors[i] || 0) + 1;
      num /= i;
    }
  }
  if (num > 1) {
    factors[num] = (factors[num] || 0) + 1;
  }
  return factors;
}
