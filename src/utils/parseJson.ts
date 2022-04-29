type ValueOfKey<T> = T[keyof T];

export type Reviver<T> = (key: keyof T, value: any) => ValueOfKey<keyof T>;

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
