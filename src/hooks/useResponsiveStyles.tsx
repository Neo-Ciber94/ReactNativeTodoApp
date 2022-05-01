import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScaledSize,
  useWindowDimensions,
  PlatformOSType,
  Platform,
} from "react-native";

export type DefaultStyles = ViewStyle | TextStyle | ImageStyle;

export type NamedStyles<T> = {
  [P in keyof T]: DefaultStyles;
};

export type NamedStylesFactory<T> = {
  [P in keyof T]:
    | ((size: ScaledSize, os: PlatformOSType) => DefaultStyles)
    | DefaultStyles;
};

/**
 * Helper for create responsive styles.
 */
export class ResponsiveStyles {
  private constructor() {}

  /**
   * Create a function that returns a responsive styles object for the given factory.
   * @param factory The factory styles.
   * @returns A function that returns the responsive styles.
   *
   * @example
   * ```
   * const useStyles = ResponsiveStyles.create({
   *  container: (size) => ({
   *    padding: size.width > 800 ? 30 : 5,
   *  }),
   *  style: ({width}) => ({
   *    color: width > 800 ? "red" : "blue"
   *  }),
   * });
   *
   * const styles = useStyles();
   * <View style={styles.container} >
   *    <Text>Hello responsive style!</Text>
   * </View>
   * ```
   */
  static create<T extends NamedStyles<T> | NamedStyles<any>>(
    factory: T | NamedStylesFactory<T>
  ): () => T {
    return () => useReponsiveStyles(factory);
  }
}

/**
 * Creates a styles that will be responsive based on the window size.
 * @param factory The factory used to create the styles.
 * @returns A style that change with the screen size.
 */
export function useReponsiveStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  factory: T | NamedStylesFactory<T>
): T {
  const size = useWindowDimensions();
  const result: Record<keyof T, unknown> = {} as T;

  for (const k in factory) {
    const v = factory[k];
    if (typeof v === "function") {
      result[k] = v(size, Platform.OS);
    } else {
      result[k] = v;
    }
  }

  return result as T;
}
