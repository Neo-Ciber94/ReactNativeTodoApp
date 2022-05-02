import { useLayoutEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { createAnimatedComponent } from "../../utils/createAnimatedComponent";

export const SlideAbsolute = createAnimatedComponent(
  ({ animatedValue, children }) => {
    const [height, setHeight] = useState(58);

    const bottom = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-height, 0],
    });

    return (
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          overflow: "hidden",
          bottom,
        }}
      >
        <View
          onLayout={(e) => {
            const height = e.nativeEvent.layout.height;
            setHeight(height);
          }}
        >
          {children}
        </View>
      </Animated.View>
    );
  }
);
