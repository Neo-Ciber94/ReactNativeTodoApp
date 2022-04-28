import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header></Header>
      <View style={styles.container}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "90%",
  },
});

export default Layout;
