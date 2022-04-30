import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../../model/Todo";
import { deleteTodo, selectTodos, toggleTodo } from "../../redux/todos.slice";
import routes from "../../routes";
import { RootStackParamList } from "../../routes/navigator";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import TodoItem from "../TodoItem";

type NavProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, "Edit">,
  StackNavigationProp<RootStackParamList>
>;

export default function TodoList() {
  const todos = useSelector(selectTodos);
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavProps>();
  console.log(navigation);
  const isLargeScreen = layout.width > 1200;

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleEdit = (t: Todo) => {
    navigation.navigate(routes.edit, {
      todo: t,
    });
  };

  const handleTodoToggle = (t: Todo) => {
    dispatch(toggleTodo({ id: t.id }));
  };

  const showDeleteDialog = (t: Todo) => {
    setDialogVisible(true);
    setSelectedTodo(t);
    console.log("Delete: ", t);
  };

  const confirmDelete = () => {
    if (selectedTodo) {
      dispatch(deleteTodo({ id: selectedTodo.id }));
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
