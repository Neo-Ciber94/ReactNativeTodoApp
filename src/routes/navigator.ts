import routes from ".";

export type RootStackParamList = {
  [routes.list]: {};
  [routes.add]: {};
  [routes.edit]: { todoId: string };
};
