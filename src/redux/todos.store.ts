import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todos.slice";

export const todoStore = configureStore({
  reducer: {
    todoState: todoReducer,
  },
  middleware: [
    (store) => (next) => (action) => {
      console.log("middleware: ", action);
      next(action);
    },
  ],
});

export type RootState = ReturnType<typeof todoStore.getState>;

export type AppDispatch = typeof todoStore.dispatch;
