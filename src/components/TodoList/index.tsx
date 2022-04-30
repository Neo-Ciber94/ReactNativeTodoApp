import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../../model/Todo";
import { deleteTodo, selectTodos, selectTodoSorted, toggleTodo } from "../../redux/todos.slice";
import routes from "../../routes";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import TodoItem from "../TodoItem";
import { NavigationType } from "../../types";
import { Caption, Headline, Searchbar } from "react-native-paper";

export default function TodoList() {
  const todos = useSelector(selectTodoSorted);
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType<"Edit">>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const isSearching = searchText.trim().length > 0;
  let padding = styles.px;

  useEffect(() => {
    if (isSearching) {
      const s = searchText.trim().toLowerCase();
      const filtered = todos.filter((todo) =>
        todo.title.trim().toLowerCase().includes(s)
      );
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, searchText]);

  if (layout.width > 1000) {
    padding = styles.pxLarge;
  } else if (layout.width > 600) {
    padding = styles.pxMedium;
  }

  const handleEdit = (t: Todo) => {
    navigation.navigate(routes.edit, {
      todoId: t.id,
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
      <View style={[styles.search, padding]}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <ScrollView style={[styles.list, padding]}>
        <Headline>My todos</Headline>
        {isSearching && todos.length > 0 && filteredTodos.length === 0 && (
          <Caption style={styles.centerText}>No todos found</Caption>
        )}
        {todos.length === 0 && (
          <Caption style={styles.centerText}>No todos available</Caption>
        )}
        {filteredTodos.map((todo) => (
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
  px: {
    paddingHorizontal: 10,
  },
  pxMedium: {
    paddingHorizontal: 60,
  },
  pxLarge: {
    paddingHorizontal: 250,
  },
  search: {
    marginBottom: 20,
    marginTop: 10,
  },
  list: {
    paddingTop: 5,
    paddingBottom: 80,
  },
  item: {
    marginVertical: 7,
  },
  centerText: {
    fontSize: 20,
    padding: 40,
    textAlign: "center",
    margin: "0 auto",
  },
});
