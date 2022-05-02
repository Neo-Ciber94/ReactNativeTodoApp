import { ComponentType, ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useCounter } from "../hooks/useCounter";

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
    }, [enter, animatedValue]);

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
