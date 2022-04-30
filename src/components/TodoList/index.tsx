import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../../model/Todo";
import { deleteTodo, selectTodos, toggleTodo } from "../../redux/todos.slice";
import routes from "../../routes";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import TodoItem from "../TodoItem";
import { NavigationType } from "../../types";
import { Headline } from "react-native-paper";

export default function TodoList() {
  const todos = useSelector(selectTodos);
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType<"Edit">>();
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
      <ScrollView style={styles.list}>
        <Headline>My todos</Headline>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.item}>
            <TodoItem
              todo={todo}
              onToggle={handleTodoToggle}
              onDelete={showDeleteDialog}
              onEdit={handleEdit}
            />
          </View>
        ))}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 80,
    width: "100%",
  },
  item: {
    marginVertical: 7,
  },
});
