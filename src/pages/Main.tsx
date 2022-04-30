import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import AddTodoButton from "../components/AddTodoButton";
import TodoList from "../components/TodoList";
import { todosMocks } from "../mocks/todos.mocks";
import { Todo } from "../model/Todo";
import { initTodos, TodoState } from "../redux/todos.slice";
import { todoStore } from "../redux/todos.store";
import routes from "../routes";
import { RootStackParamList } from "../routes/navigator";
import { LocalStore } from "../utils/persistence/LocalPersistence";

const store = new LocalStore<TodoState>("todos/data");
type Props = NativeStackScreenProps<RootStackParamList, "List">;

export default function Main({ navigation }: Props) {
  // Initialize the todo store
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

  useEffect(() => {
    const initialize = async () => {
      const data = await store.load(todoStateReviver);

      if (data) {
        dispatch(initTodos({ todos: data.todos }));
      } else {
        dispatch(initTodos({ todos: todosMocks }));
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const unsuscribe = todoStore.subscribe(async () => {
      const appState = todoStore.getState();
      await store.save(appState.todoState);
    });

    return () => unsuscribe();
  }, []);
}

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
