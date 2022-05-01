
import { Todo } from "../model/Todo";
import { nanoid } from "../utils/nanoid";

const todosMocks: Todo[] = [
  createTodo("Walk the dog"),
  createTodo("Buy milk"),
  createTodo("Buy eggs"),
  createTodo("Buy bread"),
  createTodo("Do the laundry"),
  createTodo("Wash the dishes"),
  createTodo("Clean the house"),
  createTodo("Buy a new car"),
];

function createTodo(title: string): Todo {
  return {
    id: nanoid(),
    title,
    completed: false,
    version: 1,
    createdAt: new Date(),
  };
}

export default todosMocks;