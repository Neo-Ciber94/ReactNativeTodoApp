import { Reviver } from "../parseJson";

export interface Store<T> {
  load(reviver?: Reviver<T>): Promise<T | null>;
  save(data: T): Promise<void>;
}
