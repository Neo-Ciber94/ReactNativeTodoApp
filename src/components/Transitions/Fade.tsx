import { Animated } from "react-native";
import { createAnimatedComponent } from "../../utils/createAnimatedComponent";

export const Fade = createAnimatedComponent(({ animatedValue, children }) => {
  const opacity = animatedValue;
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
});


