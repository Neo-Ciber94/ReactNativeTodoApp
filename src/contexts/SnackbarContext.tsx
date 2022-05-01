import React, {
  createContext,
  useContext,
  FC,
  useEffect,
  useState,
} from "react";
import {
  TouchableOpacity,
  StyleProp,
  StyleSheet,
  View,
  Text,
  ViewStyle,
} from "react-native";

export type SnackbarAction<T> = () => T;

export interface SnackBarActionProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export interface ShowSnackbarOptions {
  message: string;
  duration?: number;
  action?: SnackBarActionProps;
  onDismissed?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

export interface SnackbarContextProps {
  show: (options: ShowSnackbarOptions) => void;
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  show: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider: React.FC = ({ children }) => {
  const snackBars = React.useRef<ShowSnackbarOptions[]>([]);
  const [active, setActive] = useState<ShowSnackbarOptions | null>(null);
  const [visible, setVisible] = useState(false);

  const showNew = (options?: ShowSnackbarOptions) => {
    if (options) {
      setActive(options);
      setVisible(true);
    } else {
      setActive(null);
      setVisible(false);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    active?.onDismissed?.();

    if (snackBars.current.length > 0) {
      const nextSnackbar = snackBars.current.shift();

      // We don't show the other immediately, but we wait for the animation to finish
      setTimeout(() => showNew(nextSnackbar), 1000);
    }
  };

  const show = (options: ShowSnackbarOptions) => {
    if (visible) {
      snackBars.current.push(options);
    } else {
      showNew(options);
    }
  };

  return (
    <SnackbarContext.Provider value={{ show }}>
      <View style={styles.container}>
        <>
          {children}
          <Snackbar
            onDismiss={handleDismiss}
            visible={visible}
            action={active?.action}
            style={active?.style}
            duration={active?.duration}
          >
            <Text style={[{ color: "white" }, active?.textStyle]}>
              {active?.message}
            </Text>
          </Snackbar>
        </>
      </View>
    </SnackbarContext.Provider>
  );
};

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

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  snackbar: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    backgroundColor: "#383838",
    bottom: 0,
  },
  snackbarAction: {
    color: "cyan",
    textTransform: "uppercase",
  },
});
