import routes from ".";

/**
 * Routes definition with params used by the navigator.
 */
export type RootStackParamList = {
  [routes.list]: {};
  [routes.add]: {};
  [routes.edit]: { todoId: string };
};
