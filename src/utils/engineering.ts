/**
 * Engineering physics calculations:
 * - Tanaka (2001) Water Density Formulation (ITS-90)
 * - General Thermal Expansion Correction
 * - GUM (Guide to the Expression of Uncertainty in Measurement) Error Propagation
 * - Powder Metallurgy (ASTM B527 / ISO 3953 / USP <616>)
 * - Slurry / Suspension Metallurgy Formulations
 * - Real & Ideal Gas Law (STP / NTP conversion)
 */

export interface WaterDensityPoint {
  tempC: number;
  densityGcm3: number;
  densityKgM3: number;
}

/**
 * Tanaka et al. (2001) formulation for density of standard pure air-free water:
 * Valid for 0°C to 40°C (and accurate up to 100°C via expanded coefficients)
 * rho(t) = a5 * [1 - (t + a1)^2 * (t + a2) / (a3 * (t + a4))]
 */
export function getWaterDensityTanaka(tempC: number): number {
  if (tempC < 0) tempC = 0;
  if (tempC > 100) tempC = 100;

  // Tanaka coefficients:
  const a1 = -3.983035;
  const a2 = 301.797;
  const a3 = 522528.9;
  const a4 = 69.34881;
  const a5 = 999.97495; // kg/m³ at 3.98°C

  const numerator = Math.pow(tempC + a1, 2) * (tempC + a2);
  const denominator = a3 * (tempC + a4);
  const densityKgM3 = a5 * (1 - numerator / denominator);

  return densityKgM3; // in kg/m³
}

/**
 * Thermal expansion correction for general fluids/solids:
 * rho(T) = rho(T0) / (1 + beta * (T - T0))
 */
export function correctDensityForTemp(
  densityAtRef: number, // any unit
  refTempC: number,
  targetTempC: number,
  volExpansionBeta: number // 1/°C
): number {
  const deltaT = targetTempC - refTempC;
  const denominator = 1 + volExpansionBeta * deltaT;
  if (denominator <= 0) return densityAtRef;
  return densityAtRef / denominator;
}

/**
 * Common thermal volumetric expansion coefficients (1/°C or 1/K)
 */
export const THERMAL_EXPANSION_PRESETS: {
  id: string;
  nameEn: string;
  nameZh: string;
  beta: number; // 1/°C
  refTemp: number;
  noteEn: string;
  noteZh: string;
}[] = [
  {
    id: 'water',
    nameEn: 'Water (Tanaka model)',
    nameZh: '纯水 (Tanaka高精模型)',
    beta: 0.000214, // at 20°C
    refTemp: 4.0,
    noteEn: 'Max density at 3.98°C (~1.00000 g/cm³)',
    noteZh: '3.98℃处密度最大 (~1.00000 g/cm³)',
  },
  {
    id: 'ethanol',
    nameEn: 'Ethanol (Alcohol)',
    nameZh: '乙醇 (无水酒精)',
    beta: 0.0011,
    refTemp: 20.0,
    noteEn: 'High thermal expansion liquid',
    noteZh: '高热膨胀系数液体',
  },
  {
    id: 'mercury',
    nameEn: 'Mercury (Hg)',
    nameZh: '水银 / 汞',
    beta: 0.000181,
    refTemp: 20.0,
    noteEn: 'Standard barometric liquid',
    noteZh: '标准气压计测温液体',
  },
  {
    id: 'engine-oil',
    nameEn: 'Engine Oil (SAE 30)',
    nameZh: '工业润滑油 / 机油',
    beta: 0.0007,
    refTemp: 20.0,
    noteEn: 'Typical petroleum lubricant',
    noteZh: '典型矿物润滑油',
  },
  {
    id: 'aluminum',
    nameEn: 'Aluminum',
    nameZh: '金属铝',
    beta: 0.000069, // volumetric (3 * alpha)
    refTemp: 20.0,
    noteEn: 'Solid volumetric expansion',
    noteZh: '固态金属体膨胀',
  },
  {
    id: 'steel',
    nameEn: 'Carbon Steel',
    nameZh: '碳钢 / 结构钢',
    beta: 0.000036,
    refTemp: 20.0,
    noteEn: 'Solid volumetric expansion',
    noteZh: '结构钢体膨胀',
  },
  {
    id: 'copper',
    nameEn: 'Copper',
    nameZh: '纯铜',
    beta: 0.000051,
    refTemp: 20.0,
    noteEn: 'Pure metal expansion',
    noteZh: '纯铜体膨胀',
  },
];

/**
 * Count significant figures in a decimal string representation
 */
export function countSignificantFigures(numStr: string): number {
  const clean = numStr.trim();
  if (!clean || isNaN(Number(clean))) return 0;

  // Handle exponential notation e.g. 1.23e-4
  if (clean.includes('e') || clean.includes('E')) {
    const mantissa = clean.split(/[eE]/)[0];
    return countSignificantFigures(mantissa);
  }

  // Remove leading '-'
  const positive = clean.replace(/^-/, '');

  if (positive.includes('.')) {
    // Has decimal point: remove decimal point and leading zeros
    const digits = positive.replace('.', '').replace(/^0+/, '');
    return digits.length || 1;
  } else {
    // No decimal point: remove leading zeros, trailing zeros may be ambiguous but count standard
    const noLeadingZeros = positive.replace(/^0+/, '');
    return noLeadingZeros.length || 1;
  }
}

/**
 * GUM Error propagation for rho = m / V
 * u_c(rho) = rho * sqrt( (delta_m / m)^2 + (delta_V / V)^2 )
 */
export function calculateUncertainty(
  mass: number,
  deltaM: number,
  volume: number,
  deltaV: number,
  density: number
) {
  if (mass <= 0 || volume <= 0 || density <= 0) {
    return {
      relDeltaM: 0,
      relDeltaV: 0,
      deltaRho: 0,
      expandedDeltaRho: 0,
      relDeltaRho: 0,
      worstCaseDeltaRho: 0,
      formattedText: '—',
    };
  }

  const relM = Math.abs(deltaM / mass);
  const relV = Math.abs(deltaV / volume);

  // Combined standard uncertainty (Gaussian error addition in quadrature)
  const relRho = Math.sqrt(Math.pow(relM, 2) + Math.pow(relV, 2));
  const deltaRho = density * relRho;

  // Expanded uncertainty k=2 (approx 95% confidence level per GUM)
  const expandedDeltaRho = 2 * deltaRho;

  // Worst-case linear error bound
  const worstCaseDeltaRho = density * (relM + relV);

  return {
    relDeltaM: relM * 100, // %
    relDeltaV: relV * 100, // %
    deltaRho,
    expandedDeltaRho,
    relDeltaRho: relRho * 100, // %
    worstCaseDeltaRho,
  };
}

/**
 * Powder metallurgy flowability assessment per ASTM B527 / USP <616>
 */
export function getPowderFlowabilityRating(hausnerRatio: number): {
  levelEn: string;
  levelZh: string;
  color: string;
  descriptionEn: string;
  descriptionZh: string;
} {
  if (hausnerRatio <= 1.11) {
    return {
      levelEn: 'Excellent / Free Flow',
      levelZh: '极佳 / 自由流动 (极低内摩擦)',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      descriptionEn: 'Powder flows smoothly like fluid, ideal for automatic die-pressing and 3D printing.',
      descriptionZh: '粉末流动顺畅无粘结，极适于高速自动模压成型与金属3D打印铺粉。',
    };
  } else if (hausnerRatio <= 1.18) {
    return {
      levelEn: 'Good',
      levelZh: '良好 (适合常规模压)',
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      descriptionEn: 'Flows easily under standard hopper conditions with minimal bridging.',
      descriptionZh: '常规料斗下流动顺畅，极少搭桥，满足多数粉末冶金压制工艺。',
    };
  } else if (hausnerRatio <= 1.25) {
    return {
      levelEn: 'Fair',
      levelZh: '一般 (需轻微震动辅助)',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      descriptionEn: 'Acceptable flow, may benefit from mechanical agitation or lubricant additives.',
      descriptionZh: '流动性尚可，在精密充模时建议加装微震动装置或润滑成型助剂。',
    };
  } else if (hausnerRatio <= 1.34) {
    return {
      levelEn: 'Passable / Poor',
      levelZh: '较差 (易出现起拱/搭桥)',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      descriptionEn: 'Cohesive powder prone to arching and erratic hopper discharge.',
      descriptionZh: '粉体有明显内聚力，料斗排料易卡顿搭桥，需造粒或表面改性。',
    };
  } else if (hausnerRatio <= 1.45) {
    return {
      levelEn: 'Poor',
      levelZh: '差 (高度内聚)',
      color: 'text-orange-700 bg-orange-50 border-orange-200',
      descriptionEn: 'High internal friction and cohesion; fluidizer or spray drying needed.',
      descriptionZh: '内摩擦与静电团聚严重，通常需喷雾造粒或流化改性后方可使用。',
    };
  } else {
    return {
      levelEn: 'Very Poor / Highly Cohesive',
      levelZh: '极差 / 超细纳米强内聚',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      descriptionEn: 'Will not flow freely; typical for ultra-fine sub-micron powders.',
      descriptionZh: '无法自由流动，多见于超细微米/纳米粉体，必须预制母粒或造粒。',
    };
  }
}

/**
 * Standard Gas Presets for STP / NTP and Real Gas Law
 */
export const GAS_PRESETS = [
  { id: 'air', nameEn: 'Dry Air', nameZh: '干燥空气', molarMass: 28.964, criticalT: 132.5, criticalP: 3770 },
  { id: 'n2', nameEn: 'Nitrogen (N₂)', nameZh: '氮气 (N₂)', molarMass: 28.013, criticalT: 126.2, criticalP: 3390 },
  { id: 'o2', nameEn: 'Oxygen (O₂)', nameZh: '氧气 (O₂)', molarMass: 31.999, criticalT: 154.6, criticalP: 5043 },
  { id: 'co2', nameEn: 'Carbon Dioxide (CO₂)', nameZh: '二氧化碳 (CO₂)', molarMass: 44.01, criticalT: 304.1, criticalP: 7380 },
  { id: 'h2', nameEn: 'Hydrogen (H₂)', nameZh: '氢气 (H₂)', molarMass: 2.016, criticalT: 33.2, criticalP: 1297 },
  { id: 'he', nameEn: 'Helium (He)', nameZh: '氦气 (He)', molarMass: 4.003, criticalT: 5.2, criticalP: 227 },
  { id: 'ch4', nameEn: 'Methane (CH₄ / Natural Gas)', nameZh: '甲烷 (CH₄ / 天然气主成分)', molarMass: 16.043, criticalT: 190.6, criticalP: 4599 },
  { id: 'ar', nameEn: 'Argon (Ar)', nameZh: '氩气 (Ar)', molarMass: 39.948, criticalT: 150.9, criticalP: 4898 },
  { id: 'steam', nameEn: 'Water Vapor / Steam (H₂O)', nameZh: '水蒸气 (H₂O)', molarMass: 18.015, criticalT: 647.1, criticalP: 22064 },
];

/**
 * Gas constant R = 8.314462618 J / (mol·K) = kPa·m³ / (kmol·K) = Pa·m³ / (mol·K)
 * rho = (P * M) / (Z * R * T)
 * P in kPa, M in g/mol (= kg/kmol), T in Kelvin
 * Output: density in kg/m³ (= g/L)
 */
export function calculateGasDensity(
  pressureKPa: number,
  tempC: number,
  molarMassGMol: number,
  compressibilityZ = 1.0
): number {
  const R = 8.314462618;
  const tempK = tempC + 273.15;
  if (tempK <= 0 || pressureKPa <= 0 || molarMassGMol <= 0 || compressibilityZ <= 0) {
    return 0;
  }
  // rho (kg/m³) = (P in kPa * M in kg/kmol) / (Z * R * T)
  const densityKgM3 = (pressureKPa * molarMassGMol) / (compressibilityZ * R * tempK);
  return densityKgM3;
}
