import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Todo } from "../model/Todo";

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
      };
      state.todos.push(todo);
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    },
    editTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
  },
});

export const todoReducer = todoSlice.reducer;
export const selectTodos = (state: TodoState) => state.todos;
export const { createTodo, deleteTodo, editTodo, toggleTodo } =
  todoSlice.actions;
