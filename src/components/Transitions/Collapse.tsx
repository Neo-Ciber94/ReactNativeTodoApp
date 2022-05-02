import { useState } from "react";
import { Animated, View } from "react-native";
import {
  AnimatedComponentProps,
  createAnimatedComponent,
} from "../../utils/createAnimatedComponent";

export interface CollapseProps extends AnimatedComponentProps {
  mode?: "vertical" | "horizontal";
}

export const Collapse = createAnimatedComponent<CollapseProps>(
  ({ animatedValue, children, mode = "vertical" }) => {
    const [viewSize, setViewSize] = useState(0);

    const size = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, viewSize],
    });

    return (
      <View
        onLayout={(layout) => {
          if (mode === "horizontal") {
            const width = layout.nativeEvent.layout.width;
            setViewSize(width);
          }
        }}
      >
        <Animated.View
          style={{
            overflow: "hidden",
            width: mode === "horizontal" ? size : undefined,
            height: mode === "vertical" ? size : undefined,
          }}
        >
          <View
            style={{ width: mode === "horizontal" ? viewSize : undefined }}
            onLayout={(layout) => {
              if (mode === "vertical") {
                const height = layout.nativeEvent.layout.height;
                setViewSize(height);
              }
            }}
          >
            {children}
          </View>
        </Animated.View>
      </View>
    );
  }
);
