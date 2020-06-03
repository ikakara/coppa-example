import React, { useState } from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";

const blankForm = { id: "", name: "", description: "" };

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
