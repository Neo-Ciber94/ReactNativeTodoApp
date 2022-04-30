export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  version: number;
  createdAt: Date;
  updatedAt?: Date;
}
