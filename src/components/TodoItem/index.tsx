import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Checkbox, IconButton, useTheme, withTheme } from "react-native-paper";
import { Todo } from "../../model/Todo";

export interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.todoLead}>
        <View style={{ marginRight: 10 }}>
          <Checkbox
            onPress={() => onToggle(todo)}
            status={todo.completed === true ? "checked" : "unchecked"}
          />
        </View>
        <Text
          style={[
            { color: colors.text },
            styles.text,
            todo.completed ? styles.textDashed : {},
          ]}
        >
          {todo.title}
        </Text>
      </View>

      <View style={styles.actions}>
        <IconButton
          icon="lead-pencil"
          size={20}
          color={colors.primary}
          onPress={() => onEdit(todo)}
        />
        <IconButton
          icon="trash-can"
          size={20}
          color={colors.primary}
          onPress={() => onDelete(todo)}
        />
      </View>
    </View>
  );
};

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

export default TodoItem;
