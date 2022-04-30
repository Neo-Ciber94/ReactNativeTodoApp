import TodoEditor from "../components/TodoEditor";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Edit">;

export default function EditTodo({ route }: Props) {
  const { todo } = route.params;
  return <TodoEditor todo={todo} />;
}
