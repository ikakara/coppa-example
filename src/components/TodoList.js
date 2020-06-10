import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Item({ name, description, visibility, creator }) {
  return (
    <View style={styles.item}>
      <View style={{ width: "75%", alignItems: "flex-start" }}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{ width: "25%", alignItems: "flex-end" }}>
        <Text style={styles.visibility}>{visibility}</Text>
        <Text style={styles.creator}>by {creator.displayName}</Text>
      </View>
    </View>
  );
}

export default function TodoList({ todos }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              description={item.description}
              visibility={item.visibility}
              creator={item.creator}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 1,
    //justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
  },
  description: {
    fontSize: 12,
  },
  visibillity: {
    fontSize: 14,
  },
  creator: {
    fontSize: 12,
  },
});
