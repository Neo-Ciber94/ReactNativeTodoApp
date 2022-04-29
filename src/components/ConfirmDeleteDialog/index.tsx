import React from "react";
import { Portal, Dialog, Button, Paragraph } from "react-native-paper";
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

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleHideDialog}>
        <Dialog.Title>Do you want to delete this Todo?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Delete "<strong>{todo?.title}"?</strong>
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
