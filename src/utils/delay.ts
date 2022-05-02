/**
 * Creates a promise that resolves after a delay.
 * @param ms The number of milliseconds of delay.
 * @returns A promives that resolves after the specified number of milliseconds.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
