import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/navigator";

export type NavigationType<S extends keyof RootStackParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<RootStackParamList, S>,
    StackNavigationProp<RootStackParamList>
  >;
