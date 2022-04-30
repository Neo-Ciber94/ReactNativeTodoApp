import * as React from "react";
import { StyleSheet } from "react-native";
import { Drawer, FAB } from "react-native-paper";

export interface AddTodoButtonProps {
  onPress: () => void;
}

export default function AddTodoButton({ onPress }: AddTodoButtonProps) {
  const [active, setActive] = React.useState("");

  return (
    <>
      <FAB style={styles.fab} icon="plus" color="white" onPress={onPress} />
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="First Item"
          active={active === "first"}
          onPress={() => setActive("first")}
        />
        <Drawer.Item
          label="Second Item"
          active={active === "second"}
          onPress={() => setActive("second")}
        />
      </Drawer.Section>
    </>
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
