import { Todo } from "../model/Todo";

export type RootStackParamList = {
  List: {};
  Add: {};
  Edit: { todo: Todo };
};
