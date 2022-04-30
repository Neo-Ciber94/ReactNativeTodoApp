import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import AddTodoButton from "../components/AddTodoButton";
import TodoList from "../components/TodoList";
import { todosMocks } from "../mocks/todos.mocks";
import { initTodos, TodoState } from "../redux/todos.slice";
import { todoStore } from "../redux/todos.store";
import { LocalStore } from "../utils/persistence/LocalPersistence";

const store = new LocalStore<TodoState>("todos/data");

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      const data = await store.load();

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

  return (
    <View style={{ height: "100%" }}>
      <TodoList />
      <AddTodoButton onPress={() => console.log("Add")} />
    </View>
  );
}
