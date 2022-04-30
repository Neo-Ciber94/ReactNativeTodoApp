import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, withTheme } from "react-native-paper";
import Header from "./Header";

const Layout: FC = ({ children }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: colors.background },
        { height: "100%", width: "100%" },
      ]}
    >
      <Header></Header>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "90%",
  },
});

export default withTheme(Layout);
