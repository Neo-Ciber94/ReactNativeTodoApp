import { clamp } from "./clamp";

// This class is currently unused, for some reason fails with 'string cannot be converted to color' error
export class Rgba {
  /**
   * The red component of the color.
   */
  public readonly r: number;

  /**
   * The green component of the color.
   */
  public readonly g: number;

  /**
   * The blue component of the color.
   */
  public readonly b: number;

  /**
   * The alpha (opacity) component of the color.
   */
  public readonly a: number;

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = clamp(r, 0, 255);
    this.g = clamp(g, 0, 255);
    this.b = clamp(b, 0, 255);
    this.a = clamp(a, 0, 1);
  }

  static fromString(s: string): Rgba {
    if (s.startsWith("#")) {
      return Rgba.fromHex(s);
    }

    return Rgba.fromRbg(s);
  }

  static fromRbg(s: string): Rgba {
    const rbgRegex =
      /^rgb(a)?\((?<red>\d+),\s*(?<green>\d+),\s*(?<blue>\d+)(,\s*(?<alpha>\d+))?\)$/;
    const match = rbgRegex.exec(s);

    if (match == null) {
      throw new Error(`Invalid rgb string: ${s}`);
    }

    const red = parseInt(match.groups!.red, 10);
    const green = parseInt(match.groups!.green, 10);
    const blue = parseInt(match.groups!.blue, 10);
    const alpha = match.groups?.alpha
      ? parseInt(match.groups.alpha, 10) / 255
      : 1;

    return new Rgba(red, green, blue, alpha);
  }

  static fromHex(hex: string): Rgba {
    if (!hex.startsWith("#")) {
      throw new Error(`Hex color should start with '#': ${hex}`);
    }

    // #rgb
    if (hex.length === 4) {
      const r = parseInt(hex.slice(1, 1), 16);
      const g = parseInt(hex.slice(2, 1), 16);
      const b = parseInt(hex.slice(3, 1), 16);
      return new Rgba(r, g, b);
    }

    // #rbga
    if (hex.length === 5) {
      const r = parseInt(hex.slice(1, 2), 16);
      const g = parseInt(hex.slice(2, 3), 16);
      const b = parseInt(hex.slice(3, 4), 16);
      const a = parseInt(hex.slice(4, 5), 16) / 255;
      return new Rgba(r, g, b, a);
    }

    // #rrggbb
    if (hex.length === 7) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return new Rgba(r, g, b);
    }

    // #rrggbbaa
    if (hex.length === 9) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const a = parseInt(hex.slice(7, 9), 16) / 255;
      return new Rgba(r, g, b, a);
    }

    throw new Error(`Invalid hex string: ${hex}`);
  }

  withRed(r: number): Rgba {
    return new Rgba(r, this.g, this.b, this.a);
  }

  withGreen(g: number): Rgba {
    return new Rgba(this.r, g, this.b, this.a);
  }

  withBlue(b: number): Rgba {
    return new Rgba(this.r, this.g, b, this.a);
  }

  withAlpha(a: number): Rgba {
    return new Rgba(this.r, this.g, this.b, a);
  }

  invert(): Rgba {
    return new Rgba(255 - this.r, 255 - this.g, 255 - this.b, this.a);
  }

  toParts(): [number, number, number, number] {
    return [this.r, this.g, this.b, this.a];
  }

  toHexParts(): [string, string, string, string] {
    return [
      this.r.toString(16),
      this.g.toString(16),
      this.b.toString(16),
      this.a.toString(16),
    ];
  }

  toHex(): string {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(
      16
    )}${this.a.toString(16)}`;
  }

  toHexNoAlpha(): string {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(
      16
    )}`;
  }

  toString(): string {
    return this.toHex();
  }
}
