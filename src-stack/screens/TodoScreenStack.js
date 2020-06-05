import React, { useReducer, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../../src/graphql/queries";
import { createTodo } from "../../src/graphql/mutations";
import { onCreateTodo } from "../../src/graphql/subscriptions";

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.todos };
    case "ADD_TODO":
      return { ...state, todos: [action.todo, ...state.todos] };
    default:
      return state;
  }
}

export default function TodoScreenStack({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() =>
              navigation.navigate("ModalTodo", {
                addTodo: addTodo,
              })
            }
            title="Add Todo"
            color="#00cc00"
          />
        </View>
      ),
      headerRightContainerStyle: {
        paddingRight: 16,
      },
    });
  }, [navigation]);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      dispatch({ type: "SET_TODOS", todos });
      //setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo(formState) {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      //dispatch({ type: "ADD_TODO", todo });
      //setTodos([...todos, todo]);
      console.log(state.todos);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  useEffect(() => {
    fetchTodos();
    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: async (todoData) => {
        const { onCreateTodo } = todoData.value.data;
        dispatch({ type: "ADD_TODO", todo: onCreateTodo });
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  function Item({ name, description }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }

  if (state.todos.length > 0) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <FlatList
            data={state.todos}
            renderItem={({ item }) => (
              <Item name={item.name} description={item.description} />
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is the todo screen!</Text>
        <Button
          onPress={() =>
            navigation.navigate("ModalTodo", {
              addTodo: addTodo,
            })
          }
          title="Add Todo"
          color="#00cc00"
        />
      </View>
    );
  }
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
  },
  title: {
    fontSize: 24,
  },
  description: {
    fontSize: 12,
  },
});
