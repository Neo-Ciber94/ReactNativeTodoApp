
/**
 * A funciton used to parse specified values.
 */
export type Reviver<T> = (key: keyof T, value: unknown) => unknown;

/**
 * Parse a JSON string to an object.
 * @param obj The string to parse.
 * @param reviver An optional reviver for parsing specific values.
 * @returns The parsed object or null if failed.
 */
export function parseJson<T>(
  obj: string | null,
  reviver?: Reviver<T>
): T | null {
  if (obj == null) {
    return null;
  }

  try {
    return JSON.parse(obj, reviver as any);
  } catch {
    return null;
  }
}
