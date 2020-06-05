/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $owner: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        displayName
        createdAt
        updatedAt
        todos {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($owner: String!) {
    getUser(owner: $owner) {
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
      todos {
        items {
          owner
          privacy
          createdAt
          name
          description
          editors
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($owner: String!, $privacy: Privacy!, $createdAt: AWSDateTime!) {
    getTodo(owner: $owner, privacy: $privacy, createdAt: $createdAt) {
      owner
      privacy
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
        todos {
          nextToken
        }
      }
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $owner: String
    $privacyCreatedAt: ModelTodoPrimaryCompositeKeyConditionInput
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTodos(
      owner: $owner
      privacyCreatedAt: $privacyCreatedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        privacy
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
export const todosByPrivacy = /* GraphQL */ `
  query TodosByPrivacy(
    $privacy: Privacy
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosByPrivacy(
      privacy: $privacy
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        owner
        privacy
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
