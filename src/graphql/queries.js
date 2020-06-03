/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($owner: String!) {
    getUser(owner: $owner) {
      owner
      username
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
`;
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
        username
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
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      privacy
      createdAt
      owner
      creator {
        owner
        username
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
      name
      description
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        privacy
        createdAt
        owner
        creator {
          owner
          username
          createdAt
          updatedAt
        }
        name
        description
        updatedAt
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
        id
        privacy
        createdAt
        owner
        creator {
          owner
          username
          createdAt
          updatedAt
        }
        name
        description
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosByOwner = /* GraphQL */ `
  query TodosByOwner(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosByOwner(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        privacy
        createdAt
        owner
        creator {
          owner
          username
          createdAt
          updatedAt
        }
        name
        description
        updatedAt
      }
      nextToken
    }
  }
`;
