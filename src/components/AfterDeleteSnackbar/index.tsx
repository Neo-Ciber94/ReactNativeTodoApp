import React, { MutableRefObject } from "react";
import { Snackbar, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { ResponsiveStyles } from "../../hooks/useResponsiveStyles";
import { Todo } from "../../model/Todo";
import { setTodo } from "../../redux/todos.slice";

export interface AfterDeleteSnackBarProps {
  durationMs?: number;
  deletedTodoRef: MutableRefObject<Todo | undefined>;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onDimiss?: () => void;
}

export default function AfterDeleteSnackBar({
  deletedTodoRef,
  durationMs,
  visible,
  setVisible,
  onDimiss,
}: AfterDeleteSnackBarProps) {
  const dispatch = useDispatch();
  const styles = useStyles();

  const handleDismiss = () => {
    setVisible?.(false);
    deletedTodoRef.current = undefined;

    if (onDimiss) {
      onDimiss();
    }
  };

  const handleUndo = () => {
    const deletedTodo = deletedTodoRef.current;
    if (deletedTodo) {
      dispatch(
        setTodo({
          todo: {
            ...deletedTodo,
            version: deletedTodo.version + 1,
          },
        })
      );
    }

    handleDismiss();
  };

  return (
    <Snackbar
      style={[styles.snackbar]}
      duration={durationMs}
      visible={visible}
      onDismiss={handleDismiss}
      action={{
        label: "Undo",
        onPress: handleUndo,
      }}
    >
      <Text style={{ color: "white" }}>The todo was deleted</Text>
    </Snackbar>
  );
}

const useStyles = ResponsiveStyles.create({
  snackbar: ({ width }) => ({
    marginHorizontal: width > 600 ? "20%" : "5%",
    backgroundColor: "#383838",
  }),
});
