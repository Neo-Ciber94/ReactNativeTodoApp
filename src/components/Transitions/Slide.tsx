import { Animated } from "react-native";
import {
  AnimatedComponentProps,
  createAnimatedComponent,
} from "../../utils/createAnimatedComponent";

export interface SlideProps extends AnimatedComponentProps {
  direction?: "left" | "right" | "up" | "down";
  offset?: number;
}

export const Slide = createAnimatedComponent<SlideProps>(
  ({ animatedValue, children, direction = "left", offset = 1000 }) => {
    const startPos =
      direction === "left" || direction === "down" ? -offset : offset;

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [startPos, 0],
    });

    switch (direction) {
      case "left":
      case "right":
        return (
          <Animated.View style={{ transform: [{ translateX }] }}>
            {children}
          </Animated.View>
        );
      case "up":
      case "down":
        return (
          <Animated.View style={{ transform: [{ translateY: translateX }] }}>
            {children}
          </Animated.View>
        );
    }
  }
);
