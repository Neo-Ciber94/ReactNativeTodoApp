import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseJson, Reviver } from "../parseJson";
import { Store } from "./Store";

/**
 * A store using the `AsyncStorage` API.
 */
export class LocalStore<T> implements Store<T> {
  constructor(public readonly key: string) {}

  async load(reviver?: Reviver<T>): Promise<T | null> {
    const json = await AsyncStorage.getItem(this.key);

    if (json == null) {
      return null;
    }

    return parseJson<T>(json, reviver);
  }

  async save(data: T): Promise<void> {
    await AsyncStorage.setItem(this.key, JSON.stringify(data));
  }
}
