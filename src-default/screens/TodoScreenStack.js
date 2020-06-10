import React, { useReducer, useEffect } from "react";
import { Button, View, Text } from "react-native";

import { API, graphqlOperation } from "aws-amplify";

import { createTodo } from "../../src/graphql/mutations";
import { onCreateTodo } from "../../src/graphql/subscriptions";

import TodoList from "../../src/components/TodoList";
import { TodoModel } from "../../src/models";
import { Debug, Reducer, LOG } from "../../src/helpers";

const initialState = {
  todos: [],
};

export default function TodoScreenStack({ navigation }) {
  const [state, dispatch] = useReducer(Reducer.forTodos, initialState);

  React.useLayoutEffect(() => {
    navigation?.setOptions({
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
      const todos = await TodoModel.queryListTodos();

      Debug.reportTodo(Debug.REPORT_SERIOUS, todos);

      dispatch({ type: "SET_TODOS", todos });
    } catch (err) {
      LOG.error("error: ", err);
    }
  }

  async function addTodo(formState) {
    try {
      if (!formState.name || !formState.description)
        return Debug.serious(
          "Invalid input: ",
          "Please enter a name and description"
        );
      const todo = { ...formState };
      //dispatch({ type: "ADD_TODO", todo });
      LOG.info("addTodo:", state.todos);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      LOG.error("error: ", err);
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

  if (state.todos.length > 0) {
    return <TodoList todos={state.todos} />;
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
