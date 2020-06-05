import React, { useState } from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";

const blankForm = { id: "", name: "", description: "", privacy: "" };

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
        selectedValue={formState.privacy}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setInput("privacy", itemValue)}
      >
        <Picker.Item label="Hidden" value="0" />
        <Picker.Item label="Draft" value="1" />
        <Picker.Item label="Private" value="2" />
        <Picker.Item label="Pending Public Approval" value="3" />
        <Picker.Item label="Public" value="4" />
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
