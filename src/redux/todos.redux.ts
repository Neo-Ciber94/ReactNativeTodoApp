import { configureStore } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Todo } from "../model/Todo";
import { TodoCreate } from "../model/TodoCreate";

export interface TodoState {
  todos: Todo[];
}

export interface AddTodo {
  type: "todos/add";
  payload: { data: TodoCreate };
}

export interface UpdateTodo {
  type: "todos/update";
  payload: { data: Todo };
}

export interface DeleteTodo {
  type: "todos/delete";
  payload: { id: string };
}

export interface ToggleTodo {
  type: "todos/toggle";
  payload: { id: string };
}

export interface InitializeTodos {
  type: "todos/initialize";
  payload: { data: Todo[] };
}

export type TodoActions =
  | AddTodo
  | UpdateTodo
  | DeleteTodo
  | ToggleTodo
  | InitializeTodos;

export function todosReducer(
  state: TodoState = { todos: [] },
  action: TodoActions
): TodoState {
  switch (action.type) {
    case "todos/add":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            ...action.payload.data,
            id: nanoid(),
            completed: false,
          },
        ],
      };
    case "todos/update":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.data?.id ? action.payload.data : todo
        ),
      };
    case "todos/delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "todos/toggle":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "todos/initialize":
      return {
        ...state,
        todos: [...action.payload.data],
      };
    default:
      return state;
  }
}

export const todoStore = configureStore({
  reducer: todosReducer,
  devTools: process.env.NODE_ENV !== "production",
});

todoStore.subscribe(() => {
  console.log(todoStore.getState());
});
