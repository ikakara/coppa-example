import { ListUtils } from "../helpers";

function forTodos(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.todos };
    case "ADD_TODO":
      return {
        ...state,
        todos: ListUtils.replaceOrPrepend(
          // arr = [], predicate, getItem
          state.todos,
          { id: action.todo.id },
          (elem) => ({
            // getItem
            ...elem,
            ...action.todo,
          })
        ),
        // [action.todo, ...state.todos]
      };
    default:
      return state;
  }
}

function forUsers(state, action) {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
    case "ADD_USER":
      return {
        ...state,
        users: ListUtils.replaceOrPrepend(
          // arr = [], predicate, getItem
          state.users,
          { owner: action.user.owner }, // owner unique key
          (elem) => ({
            // getItem
            ...elem,
            ...action.user,
          })
        ),
        //[action.user, ...state.users]
      };
    default:
      return state;
  }
}

export { forTodos, forUsers };
