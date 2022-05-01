import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todos.slice";

/**
 * The root store.
 */
export const todoStore = configureStore({
  reducer: {
    todoState: todoReducer,
  },
  middleware: [],
});

/**
 * Represents all the states of the app.
 */
export type RootState = ReturnType<typeof todoStore.getState>;
