
export type Reviver<T> = (key: keyof T, value: unknown) => unknown;

/// Parses a JSON string and returns a JavaScript object.
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
