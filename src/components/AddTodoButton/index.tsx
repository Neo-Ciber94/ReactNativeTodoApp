import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

export interface AddTodoButtonProps {
  onPress: () => void;
}

export default function AddTodoButton({ onPress }: AddTodoButtonProps) {
  return (
    <FAB style={styles.fab} icon="plus" color="white" onPress={onPress} />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
