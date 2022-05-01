import React from "react";
import { Text } from "react-native";
import { Portal, Dialog, Button, Paragraph } from "react-native-paper";
import { ResponsiveStyles } from "../../hooks/useResponsiveStyles";
import { Todo } from "../../model/Todo";

export interface ConfirmDeleteDialogProps {
  todo: Todo | null;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteDialog({
  todo,
  visible,
  onConfirm,
  setVisible,
}: ConfirmDeleteDialogProps) {
  const handleHideDialog = () => setVisible(false);
  const handleConfirm = () => onConfirm();
  const styles = useSyles();

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={handleHideDialog}
      >
        <Dialog.Title>Do you want to delete this Todo?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Delete "<Text style={{ fontWeight: "bold" }}>{todo?.title}"?</Text>
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleHideDialog}>Cancel</Button>
          <Button onPress={handleConfirm}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const useSyles = ResponsiveStyles.create({
  dialog: (size) => ({
    marginHorizontal: size.width > 1000 ? "20%" : "5%",
  }),
});
