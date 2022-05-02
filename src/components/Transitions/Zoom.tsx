import { Animated } from "react-native";
import {
  AnimatedComponentProps,
  createAnimatedComponent,
} from "../../utils/createAnimatedComponent";

export interface ZoomProps extends AnimatedComponentProps {
  startSize?: number;
}

export const Zoom = createAnimatedComponent<ZoomProps>(
  ({ animatedValue, children, startSize = 0.5 }) => {
    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [startSize, 1],
    });
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    );
  }
);
