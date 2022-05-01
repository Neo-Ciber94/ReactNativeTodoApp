import TodoEditor from "../components/TodoEditor";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/navigator";
import { useSelector } from "react-redux";
import { selectTodos } from "../redux/todos.slice";
import routes from "../routes";

type Props = NativeStackScreenProps<RootStackParamList, typeof routes.edit>;

// Route for editing a todo
export default function EditTodo({ route }: Props) {
  const { todoId } = route.params;
  const todo = useSelector(selectTodos).find((todo) => todo.id === todoId);
  return <TodoEditor title={"Edit todo"} todo={todo} />;
}
