import { Animated } from "react-native";
import { createAnimatedComponent } from "../../utils/createAnimatedComponent";

export const Fade = createAnimatedComponent(({ animatedValue, children }) => {
  const opacity = animatedValue;
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
});

export const SlideLeft = createAnimatedComponent(
  ({ animatedValue, children }) => {
    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1000, 0],
    });

    return (
      <Animated.View style={{ transform: [{ translateX }] }}>
        {children}
      </Animated.View>
    );
  }
);
