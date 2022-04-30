import { Todo } from "../../model/Todo";

export interface TodoEditorProps {
  todo?: Todo;
}

export default function TodoEditor({ todo }: TodoEditorProps) {
  return <>Todo Editor {todo ? `: ${todo.title}` : ""}</>;
}
