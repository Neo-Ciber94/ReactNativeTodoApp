import { parseJson } from "../../src/utils/parseJson";

interface Item {
  id: number;
  name: string;
  createdAt?: Date;
}

describe("parseJson tests", () => {
  test("parse object", () => {
    const item = parseJson<Item>('{ "id": 1, "name": "Keyboard" }');
    expect(item).toEqual({ id: 1, name: "Keyboard" });
  });

  test("parse with reviver", () => {
    const item = parseJson<Item>(
      '{ "id": 1, "name": "Keyboard", "createdAt": "2020-01-01" }',
      (key, value) => {
        if (key === "createdAt") {
          return new Date(value);
        }
        return value;
      }
    );
    expect(item).toEqual({
      id: 1,
      name: "Keyboard",
      createdAt: new Date("2020-01-01"),
    });
  });
});
