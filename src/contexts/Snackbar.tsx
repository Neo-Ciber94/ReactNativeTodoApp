import React, { FC, useEffect } from "react";
import {
  TouchableOpacity,
  StyleProp,
  StyleSheet,
  View,
  Text,
  ViewStyle,
} from "react-native";

export interface SnackBarActionProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export interface SnackbarProps {
  visible: boolean;
  duration?: number;
  action?: SnackBarActionProps;
  onDismiss: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Snackbar: FC<SnackbarProps> = ({
  visible,
  duration = 5000,
  action,
  onDismiss,
  style,
  children,
}) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (visible) {
      timeout = setTimeout(onDismiss, duration);
    }

    return () => timeout && clearTimeout(timeout);
  }, [visible]);

  const handleOnPress = () => {
    if (action) {
      action.onPress();
    }

    onDismiss();
  };

  if (!visible) {
    return <></>;
  }

  return (
    <View style={[styles.snackbar, style]}>
      <View>
        <>{children}</>
      </View>
      {action && (
        <TouchableOpacity onPress={handleOnPress}>
          <Text style={[styles.snackbarAction, action.style]}>
            {action.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  snackbar: {
    position: "absolute",
    //position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    backgroundColor: "#383838",
    bottom: 0,
  },
  snackbarAction: {
    color: "#03dac6",
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
