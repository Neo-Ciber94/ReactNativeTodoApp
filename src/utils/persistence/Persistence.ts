import { Reviver } from "../parseJson";

export interface Persistence<T> {
  load(reviver?: Reviver<T>): Promise<T | null>;
  save(data: T): Promise<void>;
}
