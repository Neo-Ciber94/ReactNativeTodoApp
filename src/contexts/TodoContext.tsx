import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import { todosMocks } from "../mocks/todos.mocks";
import { Todo } from "../model/Todo";
import { TodoCreate } from "../model/TodoCreate";
import { todosReducer, TodoState, todoStore } from "../redux/todos.redux";
import { parseJson } from "../utils/parseJson";

const EMPTY_STATE: TodoState = Object.freeze({
  todos: [],
});

const Keys = {
  Todos: "todos.data",
  IsInit: "todos.isInit",
} as const;

export interface TodoContextProps {
  todos: Todo[];
  addTodo: (todo: TodoCreate) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => Promise.resolve(),
  toggleTodo: () => Promise.resolve(),
  updateTodo: () => Promise.resolve(),
  deleteTodo: () => Promise.resolve(),
});

export const TodoContextProvider: React.FC = ({ children }) => {
  const [todoState, dispatch] = useReducer(todosReducer, EMPTY_STATE);


  useEffect(() => {
    const initialize = async () => {
      const todosJson = await AsyncStorage.getItem(Keys.Todos);
      const state: TodoState = parseJson<TodoState>(todosJson) || {
        todos: todosMocks.slice(),
      };
      // const isInit = (await AsyncStorage.getItem(Keys.IsInit)) === "true";

      // if (!isInit && state.todos.length === 0) {
      //   state = { todos: todosMocks.slice() };
      //   await AsyncStorage.setItem(Keys.IsInit, "true");
      // }

      dispatch({ type: "todos/initialize", payload: { data: state.todos } });
      //await save(state)
    };

    initialize();
  }, []);

  const addTodo = async (data: TodoCreate) => {
    dispatch({ type: "todos/add", payload: { data } });
  };

  const toggleTodo = async (id: string) => {
    dispatch({ type: "todos/toggle", payload: { id } });
  };

  const updateTodo = async (data: Todo) => {
    dispatch({ type: "todos/update", payload: { data } });
  };

  const deleteTodo = async (id: string) => {
    dispatch({ type: "todos/delete", payload: { id } });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todoState.todos,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
