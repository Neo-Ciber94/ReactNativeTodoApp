import { ComponentType, ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useNextId } from "../hooks/useNextId";

export interface AnimatedComponentProps {
  in: boolean;
  duration?: number;
  delay?: number;
  easing?: (value: number) => number;
  onAnimationEnd?: () => void;
  useNativeDriver?: boolean;
}

export type AnimatedFactoryProps<P extends AnimatedComponentProps> = {
  in: boolean;
  animatedValue: Animated.Value;
  duration: number;
  children: ReactNode;
} & Omit<P, "in" | "duration">;

export type AnimatedFactory<
  P extends AnimatedComponentProps = AnimatedComponentProps
> = (props: AnimatedFactoryProps<P>) => JSX.Element;

export function createAnimatedComponent<
  P extends AnimatedComponentProps = AnimatedComponentProps
>(factory: AnimatedFactory<P>): ComponentType<P> {
  return ({ children, ...rest }) => {
    const {
      in: enter,
      delay,
      duration = 1000,
      easing,
      useNativeDriver = true,
      onAnimationEnd,
      ...otherProps
    } = rest;
    const animatedValue = useRef(new Animated.Value(enter ? 0 : 1)).current;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: enter ? 1 : 0,
        duration,
        useNativeDriver,
        delay,
        easing,
      }).start(onAnimationEnd);
    }, [animatedValue]);

    const factoryProps: AnimatedFactoryProps<P> = {
      ...(otherProps as any), // SAFETY: passing the rest of the props of type `P`
      animatedValue,
      children,
      duration,
      in: enter,
      delay,
      easing,
      onAnimationEnd,
      useNativeDriver,
    };
    return factory(factoryProps);
  };
}

export function mergeAnimatedComponents<A, B>(
  a: ComponentType<A>,
  b: ComponentType<B>
): ComponentType<A & B>;

export function mergeAnimatedComponents<A, B, C>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>
): ComponentType<A & B & C>;

export function mergeAnimatedComponents<A, B, C, D>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>
): ComponentType<A & B & C & D>;

export function mergeAnimatedComponents<A, B, C, D, E>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>
): ComponentType<A & B & C & D & E>;

export function mergeAnimatedComponents<A, B, C, D, E, F>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>,
  f: ComponentType<F>
): ComponentType<A & B & C & D & E & F>;

export function mergeAnimatedComponents<A, B, C, D, E, F, G>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>,
  f: ComponentType<F>,
  g: ComponentType<G>
): ComponentType<A & B & C & D & E & F & G>;

export function mergeAnimatedComponents<A, B, C, D, E, F, G, H>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>,
  f: ComponentType<F>,
  g: ComponentType<G>,
  h: ComponentType<H>
): ComponentType<A & B & C & D & E & F & G & H>;

export function mergeAnimatedComponents<A, B, C, D, E, F, G, H, I>(
  a: ComponentType<A>,
  b: ComponentType<B>,
  c: ComponentType<C>,
  d: ComponentType<D>,
  e: ComponentType<E>,
  f: ComponentType<F>,
  g: ComponentType<G>,
  h: ComponentType<H>,
  i: ComponentType<I>
): ComponentType<A & B & C & D & E & F & G & H & I>;

export function mergeAnimatedComponents(
  ...components: ComponentType<unknown>[]
): ComponentType<unknown> {
  console.assert(components.length > 0);

  return ({ children, ...rest }) => {
    let Component: ComponentType<unknown> = components.shift()!;

    // for (const C of components) {
    //   Component = ({ children, ...rest }) => {
    //     return <Component {...rest}>{C}</Component>;
    //   };
    // }

    return <Component {...rest}>{children}</Component>;
  };
}
