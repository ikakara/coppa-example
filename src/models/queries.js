export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        visibility
        createdAt
        name
        description
        editors
        updatedAt
        creator {
          owner
          displayName
          avatar {
            media {
              bucket
              region
              key
            }
            property {
              size
              height
              width
              duration
            }
          }
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const publicTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        visibility
        createdAt
        name
        description
        editors
        updatedAt
        creator {
          owner
          displayName
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
