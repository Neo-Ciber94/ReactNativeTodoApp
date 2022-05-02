import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Todo } from "../../model/Todo";
import { deleteTodo, toggleTodo } from "../../redux/todos.slice";
import routes from "../../routes";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import TodoItem from "../TodoItem";
import { NavigationType } from "../../types";
import { Caption, Headline, Searchbar } from "react-native-paper";
import { useTodos } from "../../hooks/useTodos";
import AfterDeleteSnackBar from "../AfterDeleteSnackbar";
import ButtonGroup, { createButtonGroupItem } from "../ButtonGroup";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useCounter } from "../../hooks/useCounter";
import * as Transitions from "../Transitions";

enum TodoFilter {
  ALL = "ALL",
  COMPLETED = "COMPLETED",
  ACTIVE = "ACTIVE",
}

export default function TodoList() {
  const todos = useTodos();
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationType>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const deletedRef = useRef<Todo | undefined>(undefined);
  const [afterDeleteSnackbar, setAfterDeleteSnackbar] = useState(false);
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.ALL);
  const isFiltering = searchText.trim().length > 0 || filter !== TodoFilter.ALL;
  let padding = styles.px;

  const showSnackbar = useSnackbar();
  const nextId = useCounter();

  useEffect(() => {
    let result: Todo[] = todos;

    switch (filter) {
      case TodoFilter.COMPLETED:
        result = todos.filter((todo) => todo.completed);
        break;
      case TodoFilter.ACTIVE:
        result = todos.filter((todo) => !todo.completed);
        break;
      case TodoFilter.ALL:
        break;
    }

    if (searchText.trim().length > 0) {
      const s = searchText.trim().toLowerCase();
      result = result.filter((todo) =>
        todo.title.trim().toLowerCase().includes(s)
      );
    }

    setFilteredTodos(result);
  }, [todos, filter, searchText]);

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
    //setDialogVisible(true);
    //setSelectedTodo(t);

    showSnackbar.show({
      message: `Attempting to delete todo: ${nextId()}`,
      onDismissed: () => console.log("Dimissed"),
      action: {
        label: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
    });
  };

  const confirmDelete = () => {
    if (selectedTodo) {
      deletedRef.current = selectedTodo;
      dispatch(deleteTodo({ id: selectedTodo.id }));
      setAfterDeleteSnackbar(true);
    }

    setDialogVisible(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <View style={[styles.search, padding]}>
        <View style={{ marginBottom: 10 }}>
          <ButtonGroup
            value={filter}
            onChange={setFilter}
            items={[
              createButtonGroupItem(
                TodoFilter.ALL,
                TodoFilter.ALL,
                "filter-variant"
              ),
              createButtonGroupItem(
                TodoFilter.COMPLETED,
                TodoFilter.COMPLETED,
                "check-bold"
              ),
              createButtonGroupItem(
                TodoFilter.ACTIVE,
                TodoFilter.ACTIVE,
                "checkbox-blank-circle-outline"
              ),
            ]}
          />
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <ScrollView contentContainerStyle={[styles.list, padding]}>
        <Headline>My todos</Headline>
        {isFiltering && todos.length > 0 && filteredTodos.length === 0 && (
          <Caption style={styles.centerText}>No todos found</Caption>
        )}
        {todos.length === 0 && (
          <Caption style={styles.centerText}>No todos available</Caption>
        )}
        {filteredTodos.map((todo, i) => (
          <View key={todo.id} style={styles.item}>
            <Transitions.SlideFade in={true} delay={i * 100}>
              <TodoItem
                todo={todo}
                onToggle={handleTodoToggle}
                onDelete={showDeleteDialog}
                onEdit={handleEdit}
              />
            </Transitions.SlideFade>
          </View>
        ))}
      </ScrollView>
      <ConfirmDeleteDialog
        todo={selectedTodo}
        visible={dialogVisible}
        setVisible={setDialogVisible}
        onConfirm={confirmDelete}
      />
      <AfterDeleteSnackBar
        durationMs={5000}
        visible={afterDeleteSnackbar}
        setVisible={setAfterDeleteSnackbar}
        deletedTodoRef={deletedRef}
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
    backgroundColor: "transparent",
  },
  item: {
    marginVertical: 7,
  },
  centerText: {
    fontSize: 20,
    padding: 40,
    textAlign: "center",
    marginHorizontal: "auto",
  },
});
