import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    Root: {
      // can add another level of nesting
      path: "root",
      screens: {
        Home: "home",
        Template: "template",
        Todo: "todo",
      },
    },
    // used by DefaultNavigator
    User: "user",
    Template: "template",
    Todo: "todo",
    ModalUser: "modal-user",
    ModalTemplate: "modal-template",
    ModalTodo: "modal-todo",
  },
};
