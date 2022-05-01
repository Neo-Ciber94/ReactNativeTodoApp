import { Reviver } from "../parseJson";

/**
 * Represents a persistence mechanism.
 */
export interface Store<T> {
  /**
   * Loads the stored data.
   * @param reviver An optional reviver for parsing specific values.
   */
  load(reviver?: Reviver<T>): Promise<T | null>;

  /**
   * Stores the given data.
   * @param data The data to store.
   */
  save(data: T): Promise<void>;
}
