import { useEffect, useReducer } from "react";
import { todosMocks } from "../mocks/todos.mocks";
import { Todo } from "../model/Todo";

const INITIAL_TODOS = [...todosMocks];

const INITIAL_STATE: TodoState = {
  todos: [],
};

export interface TodoState {
  todos: Todo[];
}

export interface AddTodo {
  type: "todos/add";
  payload: { data: Todo };
}

export interface EditTodo {
  type: "todos/edit";
  payload: { id: string };
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
}

export type TodoActions =
  | AddTodo
  | EditTodo
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
        todos: [...state.todos, action.payload.data],
      };
    case "todos/edit":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
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
        todos: [...INITIAL_TODOS],
      };
    default:
      return state;
  }
}

export function useTodoReducer() {
  const result = useReducer(todosReducer, INITIAL_STATE);
  const [_, dispatch] = result;

  useEffect(() => {
    dispatch({ type: "todos/initialize" });
  }, []);

  return result;
}
