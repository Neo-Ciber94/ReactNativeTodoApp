import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Todo } from "../../model/Todo";
import TodoItem from "../TodoItem";

export interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  const layout = useWindowDimensions();
  const isLargeScreen = layout.width > 1200;
  const handleEdit = (t: Todo) => console.log("Edit: ", t);
  const handleDelete = (t: Todo) => console.log("Delete: ", t);

  return (
    <View style={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 5,
    width: "100%",
  },
});
