import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Button,
  Chip,
  Headline,
  HelperText,
  Switch,
  TextInput,
  Avatar,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { Todo } from "../../model/Todo";
import { createTodo, updateTodo } from "../../redux/todos.slice";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NavigationType } from "../../types";
import routes from "../../routes";

interface TodoInput {
  title: string;
}

export interface TodoEditorProps {
  title: string;
  todo?: Todo;
}

export default function TodoEditor({ title, todo }: TodoEditorProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationType>();
  const [showDetails, setShowDetails] = React.useState(false);
  const form = useForm<TodoInput>({
    defaultValues: { title: todo?.title || "" },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const dispatch = useDispatch();
  const onSubmit = (data: TodoInput) => {
    if (todo) {
      dispatch(updateTodo({ ...data, id: todo.id }));
    } else {
      dispatch(createTodo(data));
    }

    navigation.navigate(routes.list, {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Headline>{title}</Headline>
        {todo && (
          <Chip
            textStyle={{ color: "black" }}
            style={{ backgroundColor: colors.accent }}
          >
            <Avatar.Icon
              icon="check-bold"
              style={styles.completedIcon}
              color='black'
              size={25}
            />
            Completed
          </Chip>
        )}
      </View>

      {todo && <TextInput label={"Id"} value={todo.id} disabled />}
      <Controller
        control={control}
        rules={{
          required: true,
          validate: (s) => s.trim().length > 0,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Title"
            placeholder="Title of this todo..."
            onBlur={onBlur}
            onChangeText={onChange}
            multiline
            value={value}
          />
        )}
        name="title"
      />
      <HelperText type="error" visible={!!errors.title}>
        Title is required
      </HelperText>
      {todo && (
        <Text style={styles.centerText}>
          <Switch value={showDetails} onValueChange={setShowDetails}></Switch>
          Show details
        </Text>
      )}
      {todo && showDetails && (
        <>
          <TextInput label={"Version"} value={String(todo.version)} disabled />
          <TextInput
            label={"Created At"}
            value={todo.createdAt?.toLocaleString() || "N/A"}
            disabled
          />
          <TextInput
            label={"Updated At"}
            value={todo.updatedAt?.toLocaleString() || "N/A"}
            disabled
          />
        </>
      )}
      <View style={styles.actions}>
        <Button
          icon="content-save"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  centerText: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  completedIcon: {
    backgroundColor: "#0000",
  },
});
