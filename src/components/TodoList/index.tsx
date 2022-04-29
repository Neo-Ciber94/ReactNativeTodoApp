import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useTodos } from "../../contexts/TodoContext";
import { Todo } from "../../model/Todo";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import TodoItem from "../TodoItem";

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const layout = useWindowDimensions();
  const isLargeScreen = layout.width > 1200;

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleEdit = (t: Todo) => {
    console.log("Edit: ", t);
  };

  const handleTodoToggle = (t: Todo) => {
    toggleTodo(t.id);
  };

  const showDeleteDialog = (t: Todo) => {
    setDialogVisible(true);
    setSelectedTodo(t);
    console.log("Delete: ", t);
  };

  const confirmDelete = () => {
    if (selectedTodo) {
      deleteTodo(selectedTodo.id);
    }

    setDialogVisible(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <View style={styles.list}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleTodoToggle}
            onDelete={showDeleteDialog}
            onEdit={handleEdit}
          />
        ))}
      </View>
      <ConfirmDeleteDialog
        todo={selectedTodo}
        visible={dialogVisible}
        setVisible={setDialogVisible}
        onConfirm={confirmDelete}
      />
    </>
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
