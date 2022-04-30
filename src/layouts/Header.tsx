import * as React from "react";
import { Appbar, Avatar, Switch } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useDarkTheme } from "../contexts/DarkThemeContext";
import { StyleSheet, View } from "react-native";

export default function Header({ navigation, back }: NativeStackHeaderProps) {
  const { dark, setDarkTheme } = useDarkTheme();

  const handleToggleDarkTheme = () => {
    setDarkTheme(!dark);
  };

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Todos App" />
      <View style={styles.themeToggle}>
        <Switch value={dark} onValueChange={handleToggleDarkTheme} />
        {dark ? (
          <Avatar.Icon style={styles.icon} color="#00ffbb" size={35} icon="weather-night" />
        ) : (
          <Avatar.Icon style={styles.icon} color="#ebd534" size={35} icon="white-balance-sunny" />
        )}
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  themeToggle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  icon: {
    backgroundColor: '#0000'
  }
});
