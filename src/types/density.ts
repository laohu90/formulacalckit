export type CalculationMode =
  | 'density'
  | 'mass'
  | 'volume'
  | 'buoyancy'
  | 'mixture'
  | 'engineering';

export type SubstanceState = 'solid' | 'liquid' | 'gas';
export type SubstanceCategory =
  | 'metal'
  | 'nonmetal'
  | 'building'
  | 'liquid'
  | 'gas'
  | 'daily'
  | 'custom';

export type DensityUnit =
  | 'g/cm³'
  | 'kg/m³'
  | 'g/mL'
  | 'kg/L'
  | 'mg/cm³'
  | 'lb/ft³'
  | 'lb/in³'
  | 'oz/in³';
export type MassUnit = 'kg' | 'g' | 'mg' | 't' | 'lb' | 'oz';
export type VolumeUnit =
  | 'm³'
  | 'dm³'
  | 'cm³'
  | 'mm³'
  | 'L'
  | 'mL'
  | 'ft³'
  | 'in³'
  | 'gal';

export interface Substance {
  id: string;
  name: string;
  nameEn: string;
  formula?: string;
  state: SubstanceState;
  category: SubstanceCategory;
  density: number; // in g/cm³
  densitySI: number; // in kg/m³
  condition: string;
  conditionEn?: string;
  description: string;
  descriptionEn?: string;
  color: string;
  isCustom?: boolean;
}

export interface CalculationResult {
  mode: CalculationMode;
  densityGcm3: number;
  densitySI: number;
  massG: number;
  massSI: number;
  volumeCm3: number;
  volumeSI: number;
  selectedUnits: {
    density: DensityUnit;
    mass: MassUnit;
    volume: VolumeUnit;
  };
  displayValues: {
    density: number;
    mass: number;
    volume: number;
  };
  steps: CalculationStep[];
  timestamp: number;
}

export interface CalculationStep {
  title: string;
  formula: string;
  substitutions: string;
  result: string;
  note?: string;
}

export interface MixtureComponent {
  id: string;
  name: string;
  mass: number;
  massUnit: MassUnit;
  density: number;
  densityUnit: DensityUnit;
  volume: number;
  volumeUnit: VolumeUnit;
  knownBy: 'mass-density' | 'volume-density' | 'mass-volume';
}

export interface BuoyancySimulationState {
  objectDensity: number; // in g/cm³
  liquidDensity: number; // in g/cm³
  objectVolume: number; // in cm³
  gravity: number; // 9.8 or 10 N/kg
  liquidName: string;
  objectName: string;
}

// Uncertainty & Error Propagation Types
export interface UncertaintyAnalysis {
  deltaM: number;
  deltaV: number;
  relDeltaM: number; // in %
  relDeltaV: number; // in %
  deltaRho: number; // standard uncertainty in current unit
  expandedDeltaRho: number; // 95% confidence k=2
  relDeltaRho: number; // in %
  sigFigsEstimate: number;
  formattedOutput: string;
}

// Temperature Correction Types
export interface TempCorrection {
  tempC: number;
  refTempC: number;
  volExpansionBeta: number; // 1/°C
  densityAtRef: number;
  densityAtTemp: number;
  percentChange: number;
}

// Engineering Modules
export type EngineeringSubTab = 'powder' | 'slurry' | 'gas';

export interface PowderMetallurgyInput {
  apparentDensity: number; // g/cm³
  tapDensity: number; // g/cm³
  trueDensity: number; // g/cm³
  greenCompactDensity?: number; // g/cm³
}

export interface PowderMetallurgyResult {
  hausnerRatio: number;
  carrIndex: number;
  flowabilityRating: {
    levelEn: string;
    levelZh: string;
    color: string;
  };
  bedPorosity: number; // in %
  relativeDensity?: number; // in %
  compactionRatio: number;
}

export interface SlurryInput {
  solidDensity: number; // g/cm³
  liquidDensity: number; // g/cm³
  solveFor: 'density' | 'massFraction' | 'volFraction';
  massFraction?: number; // wt% (0-100)
  slurryDensity?: number; // g/cm³
  volFraction?: number; // vol% (0-100)
}

export interface SlurryResult {
  slurryDensity: number; // g/cm³
  slurryDensitySI: number; // kg/m³
  massFraction: number; // wt%
  volFraction: number; // vol%
  liquidSolidRatio: number;
  drySolidsPerCubicMeter: number; // kg/m³ of slurry
}

export interface GasSTPInput {
  gasId: string;
  gasName: string;
  molarMass: number; // g/mol
  tempC: number;
  pressureKPa: number;
  isGaugePressure: boolean;
  volumetricFlowM3h?: number;
  compressibilityZ: number;
}

export interface GasSTPResult {
  actualDensityKgM3: number;
  stpDensityKgM3: number; // 0°C, 101.325 kPa
  ntpDensityKgM3: number; // 20°C, 101.325 kPa
  specificGravityAir: number; // relative to dry air
  normFlowNm3h?: number;
  massFlowKgH?: number;
  expansionFactor: number;
}
