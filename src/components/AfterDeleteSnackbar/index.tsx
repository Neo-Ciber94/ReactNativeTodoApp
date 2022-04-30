import { useTheme } from "@react-navigation/native";
import React, { MutableRefObject } from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
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
  const { colors } = useTheme();

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

const styles = StyleSheet.create({
  snackbar: {
    width: "50%",
    marginHorizontal: "auto",
    backgroundColor: "#383838",
  },
});
