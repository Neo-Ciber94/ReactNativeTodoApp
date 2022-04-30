import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ToggleButton, Text, Chip } from "react-native-paper";
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
  value: initialValue,
  onChange,
}: ButtonGroupProps<T>) {
  const { colors } = useTheme();
  const [value, setValue] = useState<T>(initialValue);

  const isSelected = (item: ButtonGroupItem<T>) => item.value === value;

  function handleChange(newValue: T) {
    setValue(newValue);
    onChange(newValue);
  }

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Chip
          style={[
            { backgroundColor: colors.primary },
            { opacity: isSelected(item) ? 1 : 0.5 },
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
    gap: 5,
  },
});
