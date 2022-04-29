import { StyleSheet, View, Text } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { Todo } from "../../model/Todo";

export interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.todoLead}>
        <View style={{ marginRight: 10 }}>
          <Checkbox
            onPress={() => onToggle(todo)}
            status={todo.completed === true ? "checked" : "unchecked"}
          />
        </View>
        <Text style={[styles.text, todo.completed ? styles.textDashed : {}]}>
          {todo.title}
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          icon="lead-pencil"
          labelStyle={styles.icon}
          onPress={() => onEdit(todo)}
        ></Button>
        <Button
          icon="trash-can"
          labelStyle={styles.icon}
          onPress={() => onDelete(todo)}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  todoLead: {
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {},
  textDashed: {
    textDecorationLine: "line-through",
    opacity: 0.4,
  },
  text: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
