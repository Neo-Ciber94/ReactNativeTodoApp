import React from "react";
import AddTodoButton from "../components/AddTodoButton";
import TodoList from "../components/TodoList";

export default function Main() {
  return (
    <>
      <TodoList />
      <AddTodoButton onPress={() => console.log("Add")} />
    </>
  );
}
