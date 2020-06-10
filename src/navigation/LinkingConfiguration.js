import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    Root: {
      // used by tab navigation
      path: "root",
      screens: {
        Home: "home",
        Links: "links",
        //Template: "template",
        User: "user",
        ModalUser: "modal-user",
        ModalTemplate: "modal-template",
        ModalTodo: "modal-todo",
      },
    },
    Public: {
      // used by tab navigation
      path: "pubic",
      screens: {
        Public: "public",
        Template: "template",
      },
    },
    // Public
    Public: "public",
    Template: "template",
    // Modal screens that are protected
    ModalUser: "modal-user",
    ModalTemplate: "modal-template",
    ModalTodo: "modal-todo",
  },
};
