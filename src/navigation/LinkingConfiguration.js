import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    Root: {
      // used by tab navigation
      path: "root",
      screens: {
        //Home: "home",
        Links: "links",
        //Template: "template",
        User: "user",
        ModalUser: "modal-user",
        ModalTemplate: "modal-template",
        ModalTodo: "modal-todo",
      },
    },
    // Public
    Home: "home",
    Template: "template",
    // Modal screens that are protected
    ModalUser: "modal-user",
    ModalTemplate: "modal-template",
    ModalTodo: "modal-todo",
  },
};
