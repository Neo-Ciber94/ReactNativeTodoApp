/**
 * Limits a value between a minimum and a maximum.
 * @param value The value.
 * @param min The min of the value.
 * @param max The max of the value.
 * @returns A value between the min and the max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
