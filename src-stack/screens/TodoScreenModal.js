import React, { useState } from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";

import  { TodoModel } from "../models";

const blankForm = { name: "", description: "", visibility: "" };

export default function TodoScreenModal({ navigation, route }) {
  const [formState, setFormState] = useState(blankForm);

  function addTodo() {
    route.params.addTodo(formState);
    setFormState(blankForm);
    navigation.goBack();
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>Add Todo</Text>
      <Picker
        selectedValue={formState.visibility}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) =>
          setInput("visibility", itemValue)
        }
      >
        <Picker.Item label="Hidden" value={TodoModel.Visibility.HIDDEN} />
        <Picker.Item label="Draft" value={TodoModel.Visibility.DRAFT} />
        <Picker.Item label="Private" value={TodoModel.Visibility.PRIVATE} />
        <Picker.Item label="Pending Public Approval" value={TodoModel.Visibility.PENDING} />
        <Picker.Item label="Public" value={TodoModel.Visibility.PUBLIC} />
      </Picker>
      <TextInput
        onChange={(event) => setInput("name", event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <TextInput
        onChange={(event) => setInput("description", event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <View style={{ flexDirection: "row" }}>
        <Button onPress={addTodo} title="Create Todo" color="#00cc00" />
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  todo: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
});
