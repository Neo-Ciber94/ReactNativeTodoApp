import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Chip } from "react-native-paper";
import Icon from "../Icon";

export interface ButtonGroupItem<T> {
  label: string;
  icon: string;
  value: T;
}

export function createButtonGroupItem<T>(
  label: string,
  value: T,
  icon: string
): ButtonGroupItem<T> {
  return {
    label,
    icon,
    value,
  };
}

export interface ButtonGroupProps<T> {
  items: ButtonGroupItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function ButtonGroup<T>({
  items,
  value,
  onChange,
}: ButtonGroupProps<T>) {
  const { colors } = useTheme();
  const isSelected = (item: ButtonGroupItem<T>) => item.value === value;

  function handleChange(newValue: T) {
    onChange(newValue);
  }

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Chip
          style={[
            { backgroundColor: colors.primary },
            { opacity: isSelected(item) ? 1 : 0.5 },
            styles.item
          ]}
          key={item.label}
          avatar={<Icon icon={item.icon} size={30} color={"white"} />}
          onPress={() => handleChange(item.value)}
        >
          <Text style={{ color: "white" }}>{item.label}</Text>
        </Chip>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  item: {
    margin: 2.5
  }
});
