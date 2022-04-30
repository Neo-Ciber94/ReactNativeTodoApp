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
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
        todo.version++;
        todo.updatedAt = new Date();
      }
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.version++;
        todo.updatedAt = new Date();
      }
    },
    setTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
      state.todos.push(action.payload.todo);
    },
    initTodos: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      state.todos = action.payload.todos;
    },
  },
});

export const todoReducer = todoSlice.reducer;
export const selectTodos = (state: RootState) => state.todoState.todos;
export const selectTodoSorted = (state: RootState) => {
  const todos = Array.from(state.todoState.todos);
  todos.sort((a, b) => {
    const timeA = a.createdAt?.getTime() ?? 0;
    const timeB = b.createdAt?.getTime() ?? 0;
    return timeB - timeA;
  });
  return todos;
};
export const {
  createTodo,
  deleteTodo,
  updateTodo,
  setTodo,
  toggleTodo,
  initTodos,
} = todoSlice.actions;
