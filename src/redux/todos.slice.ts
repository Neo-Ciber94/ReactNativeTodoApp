import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Todo } from "../model/Todo";
import { RootState } from "./todos.store";

export interface TodoState {
  todos: Todo[];
}

const INITIAL_STATE: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState: INITIAL_STATE,
  reducers: {
    createTodo: (state, action: PayloadAction<{ title: string }>) => {
      const todo: Todo = {
        id: nanoid(),
        title: action.payload.title,
        completed: false,
        version: 1,
        createdAt: new Date(),
      };
      state.todos.push(todo);
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      updateTodoInternal(state, action.payload.id, (t) => ({
        completed: !t.completed,
      }));
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      updateTodoInternal(state, action.payload.id, (t) => ({
        title: action.payload.title,
      }));
    },
    initTodos: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      state.todos = action.payload.todos;
    },
  },
});

function updateTodoInternal(
  state: TodoState,
  id: string,
  update: (todo: Todo) => Omit<Partial<Todo>, "id">
) {
  const todoToUpdate = state.todos.find((t) => t.id === id);

  if (todoToUpdate) {
    const props = update(todoToUpdate);
    const ignoreKeys: (keyof Todo)[] = ["id", "version", "createdAt"];
    const keys = Object.keys(todoToUpdate).filter((k) =>
      ignoreKeys.includes(k as keyof Todo)
    ) as (keyof Todo)[];

    for (const k in keys) {
      if (k in todoToUpdate) {
        todoToUpdate[k] = props[k];
      }
    }

    todoToUpdate.version += 1;
    todoToUpdate.updatedAt = new Date();
  }
}

export const todoReducer = todoSlice.reducer;
export const selectTodos = (state: RootState) => state.todoState.todos;
export const selectTodoSorted = (state: RootState) => {
  const todos = Array.from(state.todoState.todos);
  todos.sort((a, b) =>  {
    const timeA = a.createdAt?.getTime() ?? 0;
    const timeB = b.createdAt?.getTime() ?? 0;
    return timeB - timeA;
  });
  return todos;
};
export const { createTodo, deleteTodo, updateTodo, toggleTodo, initTodos } =
  todoSlice.actions;
