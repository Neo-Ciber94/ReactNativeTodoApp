import { useSelector } from "react-redux";
import { selectTodoSorted } from "../redux/todos.slice";

export function useTodos() {
    return useSelector(selectTodoSorted);
}