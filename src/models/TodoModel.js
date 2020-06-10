import { API, graphqlOperation } from "aws-amplify";

import { listTodos, publicTodos } from "./queries";
import { LOG, Auth } from "../helpers";

const Visibility = {
  HIDDEN: "HIDDEN", // only owner accessible
  DRAFT: "DRAFT", // owner mutable, editors readable
  PRIVATE: "PRIVATE", // editor accessible
  PENDING: "PENDING", // curators and admins
  PUBLIC: "PUBLIC", // public accessible
};
Object.freeze(Visibility);

async function queryListTodos() {
  let todos = undefined;

  if (Auth.signedIn()) {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    todos = todoData.data?.listTodos.items;
  } else {
    // https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js#custom-authorization-mode
    await API.graphql({
      query: publicTodos,
      authMode: "AWS_IAM",
    })
      .then((response) => {
        todos = response.data?.listTodos.items;
        LOG.error("found data: ", response);
      })
      .catch((e) => {
        todos = e.data?.listTodos.items;
        LOG.error("caught error: ", e);
      });
  }

  return todos;
}

export { Visibility, queryListTodos };
