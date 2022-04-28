import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { Todo } from "../../model/Todo";

export interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export default function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  return (
    <View style={styles.card}>
      <Text>{todo.title}</Text>
      <View style={styles.actions}>
        <Button
          style={styles.button}
          icon="lead-pencil"
          onPress={onEdit}
        ></Button>
        <Button
          style={styles.button}
          icon="trash-can"
          onPress={onDelete}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  actions: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
  },
});
