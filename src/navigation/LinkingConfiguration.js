import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    Public: {
      // used by tab navigation
      path: "public",
      screens: {
        Home: "home",
        Template: "template",
      },
    },
    Private: {
      // used by tab navigation
      path: "private",
      screens: {
        //Home: "home",
        Links: "links",
        Template: "template",
        User: "user",
        ModalUser: "modal-user",
        ModalTemplate: "modal-template",
        ModalTodo: "modal-todo",
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
