/**
 * Represents a todo item.
 */
export interface Todo {
  /**
   * The id of the todo.
   */
  id: string;

  /**
   * The title of the todo.
   */
  title: string;

  /**
   * Whether the todo is completed.
   */
  completed: boolean;

  /**
   * Represents the number of times the todo has been updated.
   */
  version: number;

  /**
   * The date the todo was created.
   */
  createdAt: Date;

  /**
   * The date the todo was last updated.
   */
  updatedAt?: Date;
}
