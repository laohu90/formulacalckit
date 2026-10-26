import { DensityUnit, MassUnit, VolumeUnit } from '../types/density';

// Conversion factors to baseline:
// Mass baseline: gram (g)
export const MASS_TO_GRAM: Record<MassUnit, number> = {
  g: 1,
  kg: 1000,
  mg: 0.001,
  t: 1000000,
  lb: 453.59237,
  oz: 28.349523,
};

// Volume baseline: cubic centimeter (cm³)
export const VOLUME_TO_CM3: Record<VolumeUnit, number> = {
  'cm³': 1,
  'm³': 1000000,
  'dm³': 1000,
  'mm³': 0.001,
  L: 1000,
  mL: 1,
  'ft³': 28316.846592,
  'in³': 16.387064,
  gal: 3785.411784,
};

// Density baseline: g/cm³
export const DENSITY_TO_G_CM3: Record<DensityUnit, number> = {
  'g/cm³': 1,
  'kg/m³': 0.001,
  'g/mL': 1,
  'kg/L': 1,
  'mg/cm³': 0.001,
  'lb/ft³': 1 / 62.4279606,
  'lb/in³': 1 / 0.036127292,
  'oz/in³': 1 / 0.578036672,
};

/**
 * Format scientific number with nice precision and tabular formatting
 */
export function formatNumber(val: number, decimals = 4): string {
  if (isNaN(val) || !isFinite(val)) return '0';
  if (val === 0) return '0';

  const abs = Math.abs(val);
  if (abs >= 1e7 || (abs > 0 && abs < 1e-4)) {
    return val.toExponential(4);
  }

  // Trim trailing zeros after decimal
  const str = val.toFixed(decimals);
  return str.replace(/\.?0+$/, '');
}

/**
 * Convert mass to grams
 */
export function massToGram(value: number, unit: MassUnit): number {
  return value * MASS_TO_GRAM[unit];
}

/**
 * Convert grams to target mass unit
 */
export function gramToMass(valueInGram: number, targetUnit: MassUnit): number {
  return valueInGram / MASS_TO_GRAM[targetUnit];
}

/**
 * Convert volume to cm³
 */
export function volumeToCm3(value: number, unit: VolumeUnit): number {
  return value * VOLUME_TO_CM3[unit];
}

/**
 * Convert cm³ to target volume unit
 */
export function cm3ToVolume(valueInCm3: number, targetUnit: VolumeUnit): number {
  return valueInCm3 / VOLUME_TO_CM3[targetUnit];
}

/**
 * Convert density to g/cm³
 */
export function densityToGcm3(value: number, unit: DensityUnit): number {
  return value * DENSITY_TO_G_CM3[unit];
}

/**
 * Convert g/cm³ to target density unit
 */
export function gcm3ToDensity(valueInGcm3: number, targetUnit: DensityUnit): number {
  return valueInGcm3 / DENSITY_TO_G_CM3[targetUnit];
}

/**
 * Format standard SI units comparison
 */
export function getSIEquivalents(gcm3: number, massG: number, volumeCm3: number) {
  const kgM3 = gcm3 * 1000;
  const kg = massG / 1000;
  const m3 = volumeCm3 / 1000000;

  return {
    densitySI: kgM3,
    massSI: kg,
    volumeSI: m3,
    densityText: `${formatNumber(kgM3)} kg/m³`,
    massText: `${formatNumber(kg)} kg`,
    volumeText: `${formatNumber(m3, 6)} m³`,
  };
}
