import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import AddTodoButton from "../components/AddTodoButton";
import TodoList from "../components/TodoList";
import todosMocks from "../mocks/todos.mocks";
import { Todo } from "../model/Todo";
import { initTodos, TodoState } from "../redux/todos.slice";
import { todoStore } from "../redux/todos.store";
import routes from "../routes";
import { NavigationType } from "../types";
import { LocalStore } from "../utils/persistence/LocalPersistence";

const store = new LocalStore<TodoState>("todos/data");

export default function ListTodos() {
  const navigation = useNavigation<NavigationType>();
  useTodosStorage();

  return (
    <View style={{ height: "100%" }}>
      <TodoList />
      <AddTodoButton onPress={() => navigation.navigate(routes.add, {})} />
    </View>
  );
}

function useTodosStorage() {
  const dispatch = useDispatch();

  // Loads the todos from the storage asynchronously
  useEffect(() => {
    const initialize = async () => {
      const data = await store.load(todoStateReviver);

      if (data) {
        dispatch(initTodos({ todos: data.todos }));
      } else if (__DEV__) {
        // Only DEV, load mock data
        dispatch(initTodos({ todos: todosMocks }));
      }
    };

    initialize();
  }, []);

  // We subscribe to the store to save the todos to the storage after each change.
  // This is OK because we only had 1 store in the app
  useEffect(() => {
    const unsuscribe = todoStore.subscribe(async () => {
      const appState = todoStore.getState();
      await store.save(appState.todoState);
    });

    return () => unsuscribe();
  }, []);
}

// Reviver used to parse correctly the todos including the `Date` type, otherwise will be just a string
function todoStateReviver(key: keyof TodoState, value: unknown): unknown {
  if (key == "todos" && Array.isArray(value)) {
    const todos: Partial<Todo>[] = value || [];

    for (const todo of todos) {
      if (todo) {
        if (todo.createdAt) {
          todo.createdAt = new Date(todo.createdAt);
        }

        if (todo.updatedAt) {
          todo.updatedAt = new Date(todo.updatedAt);
        }
      }
    }
  }

  return value;
}
