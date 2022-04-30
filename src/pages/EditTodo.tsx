import TodoEditor from "../components/TodoEditor";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/navigator";
import { useSelector } from "react-redux";
import { selectTodos } from "../redux/todos.slice";
import { useEffect } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Edit">;

export default function EditTodo({ route }: Props) {
  const { todoId } = route.params;
  const todo = useSelector(selectTodos).find((todo) => todo.id === todoId);

  useEffect(() => {
    if (todo == null) {
      console.error(`Todo with id ${todoId} not found`);
    }
  }, []);

  return <TodoEditor title={"Edit todo"} todo={todo} />;
}
