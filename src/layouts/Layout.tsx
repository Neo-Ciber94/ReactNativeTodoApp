import React, { FC } from "react";
import { View } from "react-native";
import { useTheme, withTheme } from "react-native-paper";

const Layout: FC = ({ children }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: colors.background },
        { height: "100%", width: "100%" },
      ]}
    >
      {children}
    </View>
  );
};

export default withTheme(Layout);
