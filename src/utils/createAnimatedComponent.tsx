import { ComponentType, ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { useNextId } from "../hooks/useNextId";

export interface AnimatedComponentProps {
  in: boolean;
  duration?: number;
  delay?: number;
  easing?: (value: number) => number;
  onAnimationEnd?: () => void;
  useNativeDriver?: boolean;
}

export interface AnimatedFactoryProps {
  in: boolean;
  animatedValue: Animated.Value;
  duration: number;
  children: ReactNode;
}

export type AnimatedFactory = (props: AnimatedFactoryProps) => JSX.Element;

export function createAnimatedComponent<
  P extends AnimatedComponentProps = AnimatedComponentProps
>(factory: AnimatedFactory): ComponentType<P> {
  return ({ children, ...rest }) => {
    const {
      in: enter,
      delay,
      duration = 1000,
      easing,
      useNativeDriver = true,
      onAnimationEnd,
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

    return factory({ children, animatedValue, in: enter, duration });
  };
}
