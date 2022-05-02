import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import { StyleProp, View, Text, ViewStyle } from "react-native";
import * as Transitions from "../components/Transitions";
import { delay } from "../utils/delay";
import { styles, Snackbar, SnackBarActionProps } from "./Snackbar";

type ShowSnackbarFn = (options: ShowSnackbarOptions) => void;

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

// prettier-ignore
export const SnackbarContext = createContext<SnackbarContextProps>({ show: () => {} });

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider: React.FC = ({ children }) => {
  const showRef = useRef<ShowSnackbarFn>(() => {});

  return (
    <SnackbarContext.Provider
      value={{
        show: (options) => showRef.current(options),
      }}
    >
      <View style={styles.container}>
        <>
          {children}
          <SnackbarDispatchProvider showRef={showRef} />
        </>
      </View>
    </SnackbarContext.Provider>
  );
};

interface SnackbarDispatchProviderProps {
  showRef: MutableRefObject<ShowSnackbarFn>;
}

function SnackbarDispatchProvider({ showRef }: SnackbarDispatchProviderProps) {
  const queue = useRef<ShowSnackbarOptions[]>([]);
  const isDimissedRef = useRef(false);
  const [active, setActive] = useState<ShowSnackbarOptions | null>(null);
  const [visible, setVisible] = useState(false);
  const [entering, setEntering] = useState(!visible);

  const DURATION = 300;

  const showNew = (options?: ShowSnackbarOptions) => {
    if (options) {
      setActive(options);
      setVisible(true);
    } else {
      setActive(null);
      setVisible(false);
    }
  };

  const handleDismiss = async () => {
    if (!visible || isDimissedRef.current) {
      return;
    }

    console.log("Dimis")

    await delay(active?.duration ?? 5000);

    setVisible(false);
    active?.onDismissed?.();
    isDimissedRef.current = true;

    if (queue.current.length > 0) {
      const nextSnackbar = queue.current.shift();

      // We don't show the other immediately, but we wait for the animation to finish
      setTimeout(() => showNew(nextSnackbar), 300);
    }
  };

  useEffect(() => {
    console.log("Enter: ", entering);
    showRef.current = (options: ShowSnackbarOptions) => {
      if (visible) {
        queue.current.push(options);
      } else {
        showNew(options);
      }
    };
  }, [showRef, entering, visible, queue]);

  if (!visible) {
    return <></>;
  }

  return (
    <Transitions.Grow
      in={entering}
      onAnimationEnd={handleDismiss}
      duration={DURATION}
    >
      <Snackbar
        // onDismiss={handleDismiss}
        onDismiss={() => setEntering(!entering)}
        visible={visible}
        action={active?.action}
        style={active?.style}
        duration={active?.duration}
      >
        <Text style={[{ color: "white" }, active?.textStyle]}>
          {active?.message}
        </Text>
      </Snackbar>
    </Transitions.Grow>
  );
}
